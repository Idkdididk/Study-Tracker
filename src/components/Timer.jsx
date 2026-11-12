import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Recording from "./Recording.jsx";
import {
  faPlay,
  faPause,
  faRotateLeft,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";

const times = [
  {
    value: 25,
    title: "Pomo",
  },
  {
    value: 45,
    title: "Deep",
  },
  {
    value: 60,
    title: "Std",
  },
  {
    value: 90,
    title: "Ext",
  },
];

export default function Timer({
  duration,
  setDuration,
  setTimeLeft,
  timeLeft,
  isRunning,
  setIsRunning,
  toggleSessionPrompt,
  activeSession,
  setActiveSession,
  stopRecordingSession,
}) {
  // Timer text formatting.
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const paddedMinutes = String(minutes).padStart(2, "0");
  const paddedSeconds = String(seconds).padStart(2, "0");
  const remainingTime =
    duration > 0 ? Math.round((timeLeft / duration) * 100) : 0;

  function toggleTimer() {
    if (!activeSession) return;

    if (isRunning) {
      setIsRunning(false);
      return;
    }

    if (timeLeft > 0) {
      setActiveSession((prevSession) =>
        prevSession ? { ...prevSession, hasStarted: true } : prevSession,
      );
      setIsRunning(true);
    }
  }

  return (
    <section className="timer">
      <Recording
        activeSession={activeSession}
        isRunning={isRunning}
        stopRecordingSession={stopRecordingSession}
      />

      <div
        className="timer-circle"
        style={{ "--progress": `${remainingTime}%` }}
      >
        <div className="timer-content">
          <h1>{`${paddedMinutes}:${paddedSeconds}`}</h1>
          <p>{remainingTime}% remaining</p>

          <div className="btns-section">
            <button
              onClick={() => {
                const newDuration = duration + 300;
                setDuration(newDuration);
                setTimeLeft(newDuration);
              }}
              className="timer-btns"
              disabled={isRunning || !activeSession}
            >
              +5m
            </button>

            <button
              onClick={() => {
                const newDuration = Math.max(0, duration - 300);
                setDuration(newDuration);
                setTimeLeft(newDuration);
              }}
              className="timer-btns"
              disabled={isRunning || !activeSession}
            >
              -5m
            </button>
          </div>
        </div>
      </div>

      <div className="presets-time">
        {times.map(({ value, title }) => (
          <button
            onClick={() => {
              const presetNewDuration = value * 60;
              setDuration(presetNewDuration);
              setTimeLeft(presetNewDuration);
            }}
            className={`${value === duration / 60 ? "selected" : ""} mins-btn`}
            key={value}
            disabled={isRunning || !activeSession}
          >
            {value}m<span className="timer-spans">{title}</span>
          </button>
        ))}
      </div>

      <div className="control-btns">
        <button
          onClick={toggleTimer}
          className="start-btn"
          disabled={!activeSession || (!isRunning && timeLeft === 0)}
        >
          {isRunning ? (
            <>
              <FontAwesomeIcon icon={faPause} />
              <p>Pause Timer</p>
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faPlay} />
              <p>Start Timer</p>
            </>
          )}
        </button>

        <button
          onClick={() => {
            setIsRunning(false);
            setTimeLeft(duration);
          }}
          className="reset-btn"
          disabled={!activeSession}
        >
          <FontAwesomeIcon icon={faRotateLeft} />
          <p>Reset</p>
        </button>

        <button
          onClick={toggleSessionPrompt}
          className="start-session-btn"
          disabled={Boolean(activeSession)}
        >
          <FontAwesomeIcon icon={faCalendarDays} />
          {activeSession ? "Session Active" : "Start Session"}
        </button>
      </div>
    </section>
  );
}
