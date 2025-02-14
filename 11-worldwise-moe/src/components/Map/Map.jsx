import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
  // Se koristi za da ne odnese do bilo koj URL
  //Programatic navigacija - imperative way
  //NavLink - declarative way
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  //od query-to vo URL-to gi vari lat i lng -> igraat uloga na
  //GLOBAL STATE definiran od React Router
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    // Koga ke kliknes na mapata se otvara Formata
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <h1>Map</h1>
      <h1>
        Position: {lat} {lng}
      </h1>
      {/* So set search params -> SEKADE vo Aplikacijata kade se upotrebeni
      lat i lng ke bidat azurirani */}
      <button onClick={() => setSearchParams({ lat: 23, lng: 50 })}>
        Change pos
      </button>
    </div>
  );
}

export default Map;
