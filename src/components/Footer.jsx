export default function Footer({ hourGoal, sessionsCount }) {
  return (
    <footer className="footer">
      <div className="left-footer-section">
        <span className="span-1">WEEKLY FOCUS:</span>
        <span className="span-2">{hourGoal}</span>
        <p>
          <span>{sessionsCount}</span>
          Sessions studied
        </p>
      </div>
      <div className="right-footer-section">
        <p>"Fearless concurrency awaits. Keep compiler errors friendly."</p>
      </div>
    </footer>
  );
}
