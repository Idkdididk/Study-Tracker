import "./App.css";
import NavBar from "./components/NavBar";
import Timer from "./components/Timer";
import Goal from "./components/Goal";
import RecentSessions from "./components/RecentSessions";
import Footer from "./components/Footer";
import PromptGoal from "./components/PromptGoal";
import PromptSession from "./components/PromptSession.jsx";
import { useState, useEffect } from "react";

function App() {
  // Timer
  const [duration, setDuration] = useState(() => {
    return JSON.parse(localStorage.getItem("duration")) ?? 25 * 60;
  });
  const [timeLeft, setTimeLeft] = useState(() => {
    return JSON.parse(localStorage.getItem("timeLeft")) ?? 25 * 60;
  });
  const [isRunning, setIsRunning] = useState(false);
  // Goals
  const [dailyGoal, setDailyGoal] = useState(() => {
    return JSON.parse(localStorage.getItem("dailyGoal")) ?? 120;
  });
  const [weeklyGoal, setWeeklyGoal] = useState(() => {
    return JSON.parse(localStorage.getItem("weeklyGoal")) ?? 600;
  });
  // Temporary UI state
  const [sessionPrompt, setSessionPrompt] = useState(false);
  const [prompt, setPrompt] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState("");
  // Session history
  const [studySessions, setStudySessions] = useState(() => {
    return JSON.parse(localStorage.getItem("studySessions")) ?? [];
  });
  // Active session
  const [activeSession, setActiveSession] = useState(() => {
    return JSON.parse(localStorage.getItem("activeSession")) ?? null;
  });

  // loading states values from local storage.

  // Save timer states
  useEffect(() => {
    localStorage.setItem("duration", JSON.stringify(duration));
  }, [duration]);

  useEffect(() => {
    localStorage.setItem("timeLeft", JSON.stringify(timeLeft));
  }, [timeLeft]);

  // Save goals
  useEffect(() => {
    localStorage.setItem("dailyGoal", JSON.stringify(dailyGoal));
  }, [dailyGoal]);

  useEffect(() => {
    localStorage.setItem("weeklyGoal", JSON.stringify(weeklyGoal));
  }, [weeklyGoal]);

  // Save session history
  useEffect(() => {
    localStorage.setItem("studySessions", JSON.stringify(studySessions));
  }, [studySessions]);

  // Save active session
  useEffect(() => {
    localStorage.setItem("activeSession", JSON.stringify(activeSession));
  }, [activeSession]);

  // Formats minutes into hours and minutes
  function formatDuration(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = Math.floor(minutes % 60);

    return `${hours}h ${String(remainingMinutes).padStart(2, "0")}m`;
  }

  // Timer logic: only the active session accumulates study time.
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => Math.max(0, prevTime - 1));

      setActiveSession((prevSession) => {
        if (!prevSession) return prevSession;

        return {
          ...prevSession,
          studyTime: prevSession.studyTime + 1,
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  // Stop the countdown when it reaches zero, but keep the active session.
  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
    }
  }, [timeLeft, isRunning]);

  // Create an active session from the form data.
  function startRecordingSession(sessionData) {
    const plannedDuration = Number(sessionData.duration);

    if (!sessionData.topic.trim() || plannedDuration < 1) return;

    const newSession = {
      id: crypto.randomUUID(),
      topic: sessionData.topic.trim(),
      description: sessionData.description.trim(),
      plannedDuration,
      date: new Date().toISOString(),
      studyTime: 0,
      hasStarted: false,
    };

    setActiveSession(newSession);
    setDuration(plannedDuration * 60);
    setTimeLeft(plannedDuration * 60);
    setIsRunning(false);
  }

  // Explicitly stop and complete the active session.
  function stopRecordingSession() {
    if (!activeSession) return;

    setIsRunning(false);

    // Sessions with no actual study time are not added to history.
    if (activeSession.studyTime > 0) {
      const completed = {
        ...activeSession,
        duration: activeSession.studyTime,
        completedAt: new Date().toISOString(),
      };

      setStudySessions((prevSessions) => [completed, ...prevSessions]);
    }

    setActiveSession(null);
    setTimeLeft(duration);
  }

  // Delete a completed session from history.
  function deleteSession(sessionId) {
    setStudySessions((prevSessions) =>
      prevSessions.filter((session) => session.id !== sessionId),
    );
  }

  // Toggle the new-session prompt.
  function toggleSessionPrompt() {
    setSessionPrompt((prev) => !prev);
  }

  // Toggles the goal prompt.
  function togglePrompt(selectedTitle) {
    setPrompt((prev) => !prev);
    setSelectedTitle(selectedTitle);
  }

  // Updates the selected goal.
  function updateGoal(value, title) {
    if (title === "Daily Goal") {
      setDailyGoal(value);
    } else if (title === "Weekly Goal") {
      setWeeklyGoal(value);
    }
  }

  // Calculates today's completed study time in seconds.
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

  // Calculates this week's completed study time in seconds.
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

  // Include the active session's accumulated time in goal calculations.
  const activeStudyTime = activeSession?.studyTime ?? 0;
  const todayStudytime = calculateStudytime() + activeStudyTime;
  const weeklyStudytime = calculateWeeklyStudytime() + activeStudyTime;

  // Remaining goal time in seconds.
  const remainingGoal = Math.max(0, dailyGoal * 60 - todayStudytime);
  const remainingWeeklyGoal = Math.max(0, weeklyGoal * 60 - weeklyStudytime);

  // Goal completion percentages.
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

      {sessionPrompt && (
        <PromptSession
          startRecordingSession={startRecordingSession}
          toggleSessionPrompt={toggleSessionPrompt}
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
          toggleSessionPrompt={toggleSessionPrompt}
          activeSession={activeSession}
          setActiveSession={setActiveSession}
          stopRecordingSession={stopRecordingSession}
        />

        <section className="goal-container">
          <Goal
            title="Daily Goal"
            hourGoal={formatDuration(todayStudytime / 60)}
            goalCap={formatDuration(dailyGoal)}
            reminaingGoal={`${formatDuration(remainingGoal / 60)} remaining today`}
            completionPrecentage={Math.round(dailyProgress)}
            togglePrompt={togglePrompt}
          />

          <Goal
            title="Weekly Goal"
            hourGoal={formatDuration(weeklyStudytime / 60)}
            goalCap={formatDuration(weeklyGoal)}
            reminaingGoal={`${formatDuration(remainingWeeklyGoal / 60)} remaining this week`}
            completionPrecentage={Math.round(weeklyProgress)}
            togglePrompt={togglePrompt}
          />
        </section>

        <RecentSessions
          studySessions={studySessions}
          deleteSession={deleteSession}
        />
      </main>

      <Footer />
    </>
  );
}

export default App;
