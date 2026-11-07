import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Goal({
  title,
  hourGoal,
  goalCap,
  reminaingGoal,
  completionPrecentage,
  togglePrompt,
}) {
  return (
    <section className="goal-section">
      <div className="title">
        <div className="left-title-section">
          <small>TARGET TRACK</small>
          <p>{title}</p>
        </div>
        <div className="right-title-section">
          <button
            onClick={() => {
              togglePrompt(title);
            }}
            className="edit-btn"
          >
            <FontAwesomeIcon icon={faPencil} />
          </button>
        </div>
      </div>

      <div className="wrapper-fix-div">
        <div className="target-comp">
          <div className="hourly-comp">
            <p>{hourGoal}</p>
            <span>/ {goalCap}</span>
          </div>
          <div className="remianing-comp">
            <span>{reminaingGoal}</span>
          </div>
        </div>

        <div className="percentage-comp">
          <p>{completionPrecentage}%</p>
          <small>COMPLETION</small>
        </div>
      </div>

      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${completionPrecentage}%` }}
        ></div>
      </div>
    </section>
  );
}
