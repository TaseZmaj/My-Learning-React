/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCities } from "../../contexts/CitiesContext.jsx";
import { useGeolocation } from "../../hooks/useGeolocation.js";
import { useUrlPosition } from "../../hooks/useUrlPosition.js";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import Button from "../Button/Button.jsx";
import flagemojiToPNG from "../../utils/flagToEmoji.jsx";
import styles from "./Map.module.css";

//MAP V-1
// function Map() {
//   // Se koristi za da ne odnese do bilo koj URL
//   //Programatic navigacija - imperative way
//   //NavLink - declarative way
//   const navigate = useNavigate();

//   const [searchParams, setSearchParams] = useSearchParams();
//   //od query-to vo URL-to gi vari lat i lng -> igraat uloga na
//   //GLOBAL STATE definiran od React Router
//   const lat = searchParams.get("lat");
//   const lng = searchParams.get("lng");

//   return (
//     // Koga ke kliknes na mapata se otvara Formata
//     <div className={styles.mapContainer} onClick={() => navigate("form")}>
//       <h1>Map</h1>
//       <h1>
//         Position: {lat} {lng}
//       </h1>
//       {/* So set search params -> SEKADE vo Aplikacijata kade se upotrebeni
//       lat i lng ke bidat azurirani */}
//       <button onClick={() => setSearchParams({ lat: 23, lng: 50 })}>
//         Change pos
//       </button>
//     </div>
//   );
// }

//TODO: fix the markers on the map, prestanaa da rabotat otkoga se
//sluci nenamerniot reset na uncommited kodot

function Map() {
  const { cities } = useCities();

  const [mapPosition, setMapPosition] = useState([40, 0]);
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  const [mapLat, mapLng] = useUrlPosition();

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  //koristejki custom Hook useGeolocation(), go zemas tvojot momentalen
  //lat i lng, i od tamu go setnuvash state-ot na mapPosition - predizvikuva
  //re-render
  useEffect(() => {
    if (geolocationPosition)
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
  }, [geolocationPosition]);

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </Button>
      )}
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={10}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{flagemojiToPNG(city.emoji)}</span>
              <span>{city.name}</span>
            </Popup>
          </Marker>
        ))}

        {/* CAKA: mapLat ako ne postoi zatoa pishuvash || 40 */}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

//najverojatno React leaflet bara komponent koj se vika detectClick
//i zatoa mora da se vika vaka i ima logika shto raboti vaka
function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => {
      //Vo event objektot imas dopolnitelni properties kako
      //lat i lng na mestoto kadeshto posledno bil kliknat
      //mouse-ot - ova doagja od React-leaflet.

      //So pomosh na navigate() se dvizis do formata i search
      //query-to go obnovuvas (vid na state update) pri shto
      //useSearchParams() se retriggernuva, A KOGA toa ke se sluci
      //se obnovuvaat mapLat i mapLng, A KOGA toa ke se sluci,
      //se execute-nuva efektot gore koj go menuva mapPosition
      //state-ot.

      // KAKO REZULTAT: se dvizi mapata do toj lat i lng
      //i se pomestuva React routerot na <Form> komponentot
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;
