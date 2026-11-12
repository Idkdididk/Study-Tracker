import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

function formatDuration(seconds) {
  const totalMinutes = Math.floor(seconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0) {
    return `${hours}h ${String(minutes).padStart(2, "0")}m`;
  }

  if (minutes > 0) {
    return `${minutes}m`;
  }

  return `${seconds}s`;
}

export default function Session({ session, deleteSession }) {
  const sessionDate = new Date(session.date);
  const today = new Date();

  const dateLabel =
    sessionDate.toDateString() === today.toDateString()
      ? "Today"
      : sessionDate.toLocaleDateString([], {
          month: "short",
          day: "numeric",
        });

  const timeLabel = sessionDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <section className="session-bar">
      <div className="session-wrapper">
        <div className="give-flex">
          <span className="duration">{formatDuration(session.duration)}</span>

          <div className="info">
            <p>{session.topic}</p>
            <small>{session.description || "No description provided."}</small>
          </div>
        </div>

        <div className="deletion">
          <span>
            {dateLabel}, {timeLabel}
          </span>
          <button
            className="delete-btn"
            onClick={() => deleteSession(session.id)}
            aria-label={`Delete ${session.topic}`}
            type="button"
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </div>
      </div>
    </section>
  );
}
