import { useState, useEffect, createContext, useContext } from "react";

const BASE_URL = "http://localhost:9000";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
        // console.log(data);
      } catch {
        alert("There was an error loading data...");
      } finally {
        setIsLoading(false);
      }
    }

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
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
      // console.log("Current city: ", data);
    } catch {
      alert("There was an error loading data...");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity }}>
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
