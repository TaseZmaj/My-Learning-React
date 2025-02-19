import { Link } from "react-router-dom";
import { useCities } from "../../contexts/CitiesContext";

import flagemojiToPNG from "../../utils/flagToEmoji.jsx";

import styles from "./CityItem.module.css";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }) {
  const { currentCity, deleteCity } = useCities();
  const { cityName, emoji, date, id, position } = city;

  function handleClick(e) {
    e.preventDefault();
    deleteCity(id);
  }

  return (
    <li>
      {/* Linkot nosi do cities/id - dinamicki ja generira stranata
      Nemoras da go pises celoto cities/id bidejki Router vekje znae
      deka si vo cities path momentalno bidejki tamu se naogja ovoj 
      komponent */}
      <Link
        className={`${styles.cityItem} ${
          currentCity.id === id && styles["cityItem--active"]
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span>{flagemojiToPNG(emoji)}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
