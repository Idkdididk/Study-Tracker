import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAward, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function PromptSession({
  toggleSessionPrompt,
  startRecordingSession,
}) {
  // Handle form submission here.
  function handleSubmission(formData) {
    const data = Object.fromEntries(formData);

    startRecordingSession(data);
    toggleSessionPrompt();
  }

  return (
    <div className="prompt-session-overlay">
      <section className="prompt-session">
        <header className="prompt-header">
          <div className="header-info">
            <div className="header-icon">
              <FontAwesomeIcon icon={faAward} />
            </div>

            <div className="header-text">
              <h2>New Session</h2>
              <p>Create a study session</p>
            </div>
          </div>

          <button
            onClick={toggleSessionPrompt}
            className="close-btn"
            type="button"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </header>

        <form
          id="session-form"
          action={handleSubmission}
          className="prompt-fields"
        >
          <div className="field">
            <label htmlFor="topic">Session Title</label>
            <input
              name="topic"
              id="topic"
              type="text"
              placeholder="What are you studying?"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="duration">Duration (minutes)</label>
            <input
              name="duration"
              id="duration"
              type="number"
              min="1"
              defaultValue="45"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              rows="3"
              placeholder="What do you plan to cover?"
            />
          </div>
        </form>

        <footer className="prompt-footer">
          <button
            onClick={toggleSessionPrompt}
            className="discard-btn"
            type="button"
          >
            Discard
          </button>
          <button className="save-btn" type="submit" form="session-form">
            Create Session
          </button>
        </footer>
      </section>
    </div>
  );
}
