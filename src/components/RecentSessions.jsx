import Session from "./Session";

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

export default function RecentSessions({ studySessions, deleteSession }) {
  const totalDuration = studySessions.reduce((total, session) => {
    return total + session.duration;
  }, 0);

  return (
    <section className="recent-session-section">
      <div className="header-section">
        <h1>Recent sessions</h1>
        <span>{studySessions.length} recorded</span>
      </div>

      <div className="sessions">
        {studySessions.length > 0 ? (
          studySessions.map((session) => (
            <Session
              key={session.id}
              session={session}
              deleteSession={deleteSession}
            />
          ))
        ) : (
          <p className="sessions-empty">
            No completed sessions yet. Your finished sessions will appear here.
          </p>
        )}
      </div>

      <div className="footer-section">
        <div className="right-footer-section">
          <span>
            {formatDuration(totalDuration)} total recorded ·{" "}
            {studySessions.length} sessions completed
          </span>
        </div>
      </div>
    </section>
  );
}
