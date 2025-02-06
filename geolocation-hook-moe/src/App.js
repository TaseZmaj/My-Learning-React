import { useState } from "react";
import { useGeolocation } from "./useGeolocation";

export default function App() {
  const {
    isLoading,
    error,
    getPosition,
    position: { lat, lng }, //NESTED DESTRUCTURING
  } = useGeolocation();

  const [countClicks, setCountClicks] = useState(0);
  //const {lat, lng} = position;

  function handleClick() {
    setCountClicks((c) => c + 1);
    getPosition();
  }

  return (
    <div>
      <button onClick={() => handleClick()} disabled={isLoading}>
        Get my position
      </button>

      {isLoading && <p>Loading position...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && lat && lng && (
        <p>
          Your GPS position:{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.openstreetmap.org/#map=16/${lat}/${lng}`}
          >
            {lat}, {lng}
          </a>
        </p>
      )}

      <p>You requested position {countClicks} times</p>
    </div>
  );
}
