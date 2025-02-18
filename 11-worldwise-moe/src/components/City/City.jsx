/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCities } from "../../contexts/CitiesContext";
import styles from "./City.module.css";
import Spinner from "../Spinner/Spinner";
import BackButton from "../BackButton/BackButton";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

const flagemojiToPNG = (flag) => {
  if (flag === undefined) return <p></p>;
  var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
    .map((char) => String.fromCharCode(char - 127397).toLowerCase())
    .join("");
  return (
    <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
  );
};

function City() {
  const { id } = useParams();
  //useCities go vrakja contextot koj e definiran vo CitiesContext.jsx.
  // Od contextot gi extractnuvash potrebnite funkcii, statovi i/ili setteri
  const { getCity, currentCity, isLoading } = useCities();

  useEffect(() => {
    getCity(id);
  }, [id]);

  // const [searchParams] = useSearchParams();
  // //od query-to vo URL-to gi vari lat i lng -> igraat uloga na
  // //GLOBAL STATE definiran od React Router
  // const lat = searchParams.get("lat");
  // const lng = searchParams.get("lng");
  // // console.log("Params", x); //ke se console.log-ne paramsot vo objekt -> {id:23423523}

  const { cityName, emoji, date, notes } = currentCity;

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{flagemojiToPNG(emoji)}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default City;
