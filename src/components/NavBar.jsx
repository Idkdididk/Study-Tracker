import { faMicrochip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

export default function NavBar() {
  // calculate here the real time data, take the day and put it inside the date span

  const date = new Date();

  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <nav>
      <div className="right-section">
        <FontAwesomeIcon className="cpu-icon" icon={faMicrochip} />
        <div className="text-wrapper1">
          <p>Rustlog</p>
          <small>My personal leaning tracker</small>
        </div>
      </div>

      <div className="left-section">
        <span className="date-span">Today, {formattedDate}</span>
        <button className="settings-btn">
          <FontAwesomeIcon icon={faGear} />
        </button>
      </div>
    </nav>
  );
}
