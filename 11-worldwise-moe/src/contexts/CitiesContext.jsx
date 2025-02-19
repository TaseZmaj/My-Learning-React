/* eslint-disable react-refresh/only-export-components */
import { useEffect, createContext, useContext, useReducer } from "react";

const BASE_URL = "http://localhost:9000";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        //namesto vaka da gi pravis mozes da go izostavis ova i samo
        //da go azuriras API-to.  Ke praat sho si praat async funkciite
        //i ti posle samo fetch()-ni pak
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        //isto i tuka kako gore, namesto ova mozes da go izostavish i vo async
        //funkciite da udris eden fetchCities() pak
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error("Unknown action type");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  async function fetchCities() {
    dispatch({ type: "loading" });

    try {
      const res = await fetch(`${BASE_URL}/cities`);
      const data = await res.json();
      dispatch({ type: "cities/loaded", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error loading cities...",
      });
    }
    //finally blokot koj shto settira isLoading state na false e izostaven
    //bidejki reducerot go sreduva toa
  }

  useEffect(() => {
    fetchCities();
  }, []);

  //Definirash funkcija za fetchanje odreden getCity(id), koja
  //ja sodrzi vo ovoj file - CitiesContext.jsx, pri shto ja prakjash
  //istata preku CitiesContext.Provier value={getCity}/> za da
  //mozat site children elementi pod <CitiesContext.Provider> da
  //ja koristat.  Sega bilo kade vo aplikacijata mozes da ja koristis
  //ovaa definirana funkcija.

  //Istovo mozeshe da go pishesh i vo <App />, no tuka e mnogu po
  //pregledno i mozebi ke imas potreba od razlicni Context-i vo
  //pogolema aplikacija
  async function getCity(id) {
    //Mora da konvertirano vo Number(id) bidejki od URL-to e zemeno, a URL e string
    if (Number(id) === currentCity.id) return;
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error loading the city...",
      });
    }
  }

  async function createCity(newCity) {
    dispatch({ type: "loading" });

    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error creating the city...",
      });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });

    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting the city...",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
}

//samo ovie 2 treba da gi exportnesh, SHABLON e
//ostanatoto se shto ti treba ke go prakjas preku
//context-ot
export { CitiesProvider, useCities };
