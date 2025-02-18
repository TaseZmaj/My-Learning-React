/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
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

function Map() {
  const navigate = useNavigate();
  const [mapPosition, setMapPsition] = useState([40, 0]);

  // const [searchParams, setSearchParams] = useSearchParams();
  // const lat = searchParams.get("lat");
  // const lng = searchParams.get("lng");

  //TODO: MAKE THE MAP WORK
  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={mapPosition}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map;
