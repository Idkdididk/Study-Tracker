import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function PromptGoal({ togglePrompt, title, updateGoal }) {
  const [liveCalc, setLiveCalc] = useState(1);

  const liveMinutes = liveCalc % 60;
  const liveHours = Math.floor(liveCalc / 60);
  const paddedLiveMinutes = String(liveMinutes).padStart(2, "0");
  const paddedLiveHours = String(liveHours).padStart(2, "0");

  function handleSubmission(formData) {
    const data = Object.fromEntries(formData);
    updateGoal(Number(data.target), title);
    togglePrompt();
  }

  return (
    <section className="goal-overlay">
      <div className="prompt-goal">
        <div className="header-prompt">
          <h3>Update Study Target</h3>
          <button onClick={togglePrompt} className="close">
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <form action={handleSubmission} id="goal-form">
          <label htmlFor="target">{title.toUpperCase()} (MINUTES)</label>
          <input
            name="target"
            value={liveCalc}
            type="number"
            min={1}
            placeholder="1"
            onChange={(e) => setLiveCalc(e.target.value)}
          />
        </form>
        <small>
          {liveCalc}mins = {paddedLiveHours}h {paddedLiveMinutes}m
        </small>

        <div className="form-btn-wrapper">
          <button onClick={togglePrompt} className="cancel-btn">
            Cancel
          </button>
          <button className="save-btn" type="submit" form="goal-form">
            Save
          </button>
        </div>
      </div>
    </section>
  );
}
