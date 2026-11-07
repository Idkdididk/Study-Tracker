import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function Session() {
  return (
    <section className="session-bar">
      <div className="session-wrapper">
        <div className="give-flex">
          <span className="duration">1h 15m</span>
          <div className="info">
            <p>Ownership and Borrowing</p>
            <small>
              Understanding borrow checker, lifetime &mut refs vs shared refs
            </small>
          </div>
        </div>

        <div className="deletion">
          <span>Today, 14:30</span>
          <button className="delete-btn">
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </div>
      </div>
    </section>
  );
}
