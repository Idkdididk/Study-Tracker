import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faRotateLeft,
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
}) {
  // timer text formatting here
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const paddedMinutes = String(minutes).padStart(2, "0");
  const paddedSeconds = String(seconds).padStart(2, "0");
  const remainingTime = Math.round((timeLeft / duration) * 100);

  return (
    <section className="timer">
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
                setDuration((prevDuration) => prevDuration + 300);
                const newDuration = duration + 300;
                setTimeLeft(newDuration);
              }}
              className="timer-btns"
              disabled={isRunning}
            >
              +5m
            </button>
            <button
              onClick={() => {
                setDuration((prevDuration) => Math.max(0, prevDuration - 300));
                const newDuration = Math.max(0, duration - 300);
                setTimeLeft(newDuration);
              }}
              className="timer-btns"
              disabled={isRunning}
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
              setDuration(value * 60);
              const presetNewDuration = value * 60;
              setTimeLeft(presetNewDuration);
            }}
            className={`${value === duration / 60 ? "selected" : ""} mins-btn`}
            key={value}
            disabled={isRunning}
          >
            {value}m<span className="timer-spans">{title}</span>
          </button>
        ))}
      </div>

      <div className="control-btns">
        <button
          onClick={() => {
            setIsRunning((prev) => !prev);
          }}
          className="start-btn"
        >
          {isRunning ? (
            <>
              <FontAwesomeIcon icon={faPause} />
              <p>Pause Session</p>
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faPlay} />
              <p>Start Session</p>
            </>
          )}
        </button>
        <button
          onClick={() => {
            setIsRunning(false);
            setTimeLeft(duration);
          }}
          className="reset-btn"
        >
          <FontAwesomeIcon icon={faRotateLeft} />
          <p>Reset</p>
        </button>
      </div>
    </section>
  );
}
