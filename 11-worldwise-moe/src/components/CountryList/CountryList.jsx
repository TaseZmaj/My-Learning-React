import Spinner from "../Spinner/Spinner.jsx";
import CountryItem from "../CountryItem/CountryItem.jsx";
import Message from "../Message/Message.jsx";
import styles from "./CountryList.module.css";

function CountryList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clickind a city on the map" />
    );

  //neshto se deshava tuka so reduce -> gi vadi site countries
  // i kreira nov ovjekt {country: imeNaDrzava, emoji: emojiNaDrzava}i
  //istovremeno gi filtrira taka shto nema da ima duplikati
  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.country} country={country} />
      ))}
    </ul>
  );
}

export default CountryList;
