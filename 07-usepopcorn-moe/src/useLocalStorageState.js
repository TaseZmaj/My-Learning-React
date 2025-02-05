import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, keyName) {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(keyName);

    //Mu vikash: ako POSTOI vo localStorage item so "keyName", togas taa
    //vrednost dodeli mu ja na value stateful var.  Ako NE POSTOI, togas
    //napravi go prazen array [].  Ova go pravis za da izbegnesh errori
    //vo programata bidejki nekogas ke proba da povika na pr. map() metoda
    //na prazna niza - error
    return storedValue ? JSON.parse(storedValue) : initialState;
  });
  useEffect(() => {
    localStorage.setItem(keyName, JSON.stringify(value));
  }, [value, keyName]);

  return [value, setValue];
}
