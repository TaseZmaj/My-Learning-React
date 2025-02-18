import Spinner from "../Spinner/Spinner.jsx";
import CityItem from "../CityItem/CityItem.jsx";
import Message from "../Message/Message.jsx";
import styles from "./CityList.module.css";
import { useCities } from "../../contexts/CitiesContext.jsx";

function CityList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  //Ako nema cities -> "cities": []
  if (!cities.length)
    return (
      <Message message="Add your first city by clickind a city on the map" />
    );

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}

export default CityList;
