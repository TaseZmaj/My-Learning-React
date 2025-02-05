import { useState, useEffect } from "react";

const KEY = "9e721866";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    //funkcijata shto ja primash kako argument ja povikuvash tuka
    //Isto taka mozes optional chaining ?. i na funkcii
    // callback?.();

    const controller = new AbortController();
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError(""); //resetiranje na error bidejki ke fetch-ash sekoj pat koga ke se smeni query

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal } //abort controller
        );

        //Ako korisnikot mu snema network
        if (!res.ok) {
          throw new Error("Something went wrong with fetching movies!");
        }

        const data = await res.json();

        //Ako responceot e greshen, primer ako vneses losh query
        if (data.Response === "False") {
          throw new Error("Movie not found!");
        }

        setMovies(data.Search);
        setError("");
      } catch (err) {
        if (err.name !== "AbortError") {
          console.log(err.message);
          setError(err.message);
        }
      } finally {
        setIsLoading(false); //za da ne se pokazuvaat "Loading..." i errorot istovremeno
      }
    }

    //Ako e pomalo od 3 bukvi, nemoj ni da barash
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    fetchMovies();

    return function () {
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, error }; //bidejki App.jsx gi bara ovie, bidejki gi cutnav od nejze
}
