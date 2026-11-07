import "./App.css";
import NavBar from "./components/NavBar";
import Timer from "./components/Timer";
import Goal from "./components/Goal";
import RecentSessions from "./components/RecentSessions";
import Footer from "./components/Footer";
import PromptGoal from "./components/PromptGoal";
import { useState, useEffect } from "react";

const initialSession = {
  date: new Date().toISOString(),
  duration: 0,
};

function App() {
  const [duration, setDuration] = useState(0.5 * 60);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const [dailyGoal, setDailyGoal] = useState(0);
  const [weeklyGoal, setWeeklyGoal] = useState(0);
  const [prompt, setPrompt] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [studySessions, setStudySessions] = useState([]);
  const [currentSession, setCurrentSession] = useState(initialSession);

  // Formats minutes into hours and minutes
  function formatDuration(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = Math.floor(minutes % 60);

    return `${hours}h ${String(remainingMinutes).padStart(2, "0")}m`;
  }

  // Timer logic
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          setIsRunning(false);
          return 0;
        }

        return prevTime - 1;
      });

      setCurrentSession((prevSession) => ({
        ...prevSession,
        duration: prevSession.duration + 1,
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  // Finish session when timer reaches zero
  useEffect(() => {
    if (timeLeft === 0 && currentSession.duration > 0) {
      finishedSession();
    }
  }, [timeLeft]);

  // Adds the finished session to studySessions
  function finishedSession() {
    setStudySessions((prevSessions) => [...prevSessions, currentSession]);

    setCurrentSession({
      ...initialSession,
      date: new Date().toISOString(),
    });

    setTimeLeft(duration);
  }

  // Toggles the goal prompt
  function togglePrompt(selectedTitle) {
    setPrompt((prev) => !prev);
    setSelectedTitle(selectedTitle);
  }

  // Updates the selected goal
  function updateGoal(value, title) {
    if (title === "Daily Goal") {
      setDailyGoal(value);
    } else if (title === "Weekly Goal") {
      setWeeklyGoal(value);
    }
  }

  // Calculates today's completed study time in seconds
  function calculateStudytime() {
    const today = new Date();

    const sameDaySessions = studySessions.filter((session) => {
      const sessionDate = new Date(session.date);

      return (
        sessionDate.getFullYear() === today.getFullYear() &&
        sessionDate.getMonth() === today.getMonth() &&
        sessionDate.getDate() === today.getDate()
      );
    });

    return sameDaySessions.reduce((total, session) => {
      return total + session.duration;
    }, 0);
  }

  // Calculates this week's completed study time in seconds
  function calculateWeeklyStudytime() {
    const today = new Date();
    const sunday = new Date(today);

    const daysSinceSunday = today.getDay();

    sunday.setDate(today.getDate() - daysSinceSunday);
    sunday.setHours(0, 0, 0, 0);

    const sameWeekSessions = studySessions.filter((session) => {
      const sessionDate = new Date(session.date);

      return sessionDate >= sunday && sessionDate <= today;
    });

    return sameWeekSessions.reduce((total, session) => {
      return total + session.duration;
    }, 0);
  }

  // Include the currently running session in goal calculations
  const todayStudytime = calculateStudytime() + currentSession.duration;

  const weeklyStudytime = calculateWeeklyStudytime() + currentSession.duration;

  // Remaining goal time in seconds
  const remainingGoal = Math.max(0, dailyGoal * 60 - todayStudytime);

  const remainingWeeklyGoal = Math.max(0, weeklyGoal * 60 - weeklyStudytime);

  // Goal completion percentages
  const dailyProgress =
    dailyGoal > 0
      ? Math.min(100, (todayStudytime / (dailyGoal * 60)) * 100)
      : 0;

  const weeklyProgress =
    weeklyGoal > 0
      ? Math.min(100, (weeklyStudytime / (weeklyGoal * 60)) * 100)
      : 0;

  return (
    <>
      {prompt && (
        <PromptGoal
          title={selectedTitle}
          updateGoal={updateGoal}
          togglePrompt={togglePrompt}
        />
      )}

      <NavBar />

      <main className="app-width">
        <Timer
          setTimeLeft={setTimeLeft}
          timeLeft={timeLeft}
          duration={duration}
          setDuration={setDuration}
          isRunning={isRunning}
          setIsRunning={setIsRunning}
        />

        <section className="goal-container">
          <Goal
            title="Daily Goal"
            hourGoal={formatDuration(todayStudytime / 60)}
            goalCap={formatDuration(dailyGoal)}
            reminaingGoal={`${formatDuration(remainingGoal / 60)} remaining today`}
            completionPrecentage={Math.round(dailyProgress)}
            setGoal={setDailyGoal}
            togglePrompt={togglePrompt}
          />

          <Goal
            title="Weekly Goal"
            hourGoal={formatDuration(weeklyStudytime / 60)}
            goalCap={formatDuration(weeklyGoal)}
            reminaingGoal={`${formatDuration(remainingWeeklyGoal / 60)} remaining this week`}
            completionPrecentage={Math.round(weeklyProgress)}
            goal={weeklyGoal}
            setGoal={setWeeklyGoal}
            togglePrompt={togglePrompt}
          />
        </section>

        <RecentSessions studySessions={studySessions} />
      </main>

      <Footer />
    </>
  );
}

export default App;
