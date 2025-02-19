import { useSearchParams } from "react-router-dom";

//Custom hook - funkcija shto vrakja Latitude i Longtitude,
//koi gi zema od URL-to
export function useUrlPosition() {
  //useSearchParams() updates everytimes the Params change,
  //and gets the params on the initial render of the component
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return [lat, lng];
}
