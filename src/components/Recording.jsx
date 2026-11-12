export default function Recording({
  activeSession,
  isRunning,
  stopRecordingSession,
}) {
  if (!activeSession) {
    return (
      <section className="session-status">
        <div className="recording-status">
          <span className="status-span">NO SESSION</span>
          <span className="seperator">|</span>
          <span className="title-span">Create a session to get started</span>
        </div>
      </section>
    );
  }

  const status = isRunning
    ? "RECORDING"
    : activeSession.hasStarted
      ? "PAUSED"
      : "READY";

  const statusClass = isRunning
    ? "on"
    : activeSession.hasStarted
      ? "paused"
      : "status-span";

  return (
    <section className="session-status">
      <div className="recording-status">
        <span className={`status-span ${statusClass}`}>{status}</span>
        <span className="seperator">|</span>
        <span className="title-span">{activeSession.topic}</span>
      </div>

      <button
        onClick={stopRecordingSession}
        className="stop-session-btn"
        type="button"
      >
        Stop Session
      </button>
    </section>
  );
}
