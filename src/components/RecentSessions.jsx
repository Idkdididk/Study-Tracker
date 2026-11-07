import Session from "./Session";

export default function RecentSessions({ studySessions }) {
  console.log(studySessions);
  return (
    <section className="recent-session-section">
      <div className="header-section">
        <h1>Recent sessions</h1>
        <span>4 recorded</span>
      </div>

      {/* components goes here of added sessions */}
      <div className="sessions">
        <Session />
        <Session />
        <Session />
        <Session />
        <Session />
        <Session />
        <Session />
        <Session />
        <Session />
        <Session />
        <Session />
        <Session />
        <Session />
        <Session />
        <Session />
        <Session />
        <Session />
        <Session />
        <Session />
        <Session />
        <Session />
        <Session />
      </div>

      {/* footer goes here */}
      <div className="footer-section">
        <div className="right-footer-section">
          <span>3h 20m total recorded · 4 sessions completed</span>
        </div>
        <div className="left-footer-section">
          <span>cargo bench && cargo clippy ok</span>
        </div>
      </div>
    </section>
  );
}
