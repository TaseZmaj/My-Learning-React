import { useState, useEffect, useRef } from "react";
import { useMovies } from "./useMovies.js";
import { useLocalStorageState } from "./useLocalStorageState.js";
import { useKey } from "./useKey.js";
import StarRating from "./StarRating";

function Navbar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}
function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}
function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies?.length}</strong> results
    </p>
  );
}
function Search({ query, setQuery }) {
  const inputEl = useRef(null);

  useKey("Enter", () => {
    if (document.activeElement === inputEl.current) {
      return;
    }
    inputEl.current.focus();
    setQuery("");
  });

  //ISKOMENTIRANO BIDEJKI GO PRAVAM KORISTEJKI CUSTOM HOOKS
  // useEffect(() => {
  //   function callback(e) {
  //     if (document.activeElement === inputEl.current) {
  //       return;
  //     }

  //     if (e.code === "Enter") {
  //       inputEl.current.focus();
  //       setQuery("");
  //     }
  //   }

  //   document.addEventListener("keydown", callback);
  //   return () => document.removeEventListener("keydown", callback);
  // }, [setQuery]); //set query e kako dependency posho react ke pishti vo sprotivno

  //However this is NOT the REACT WAY
  //na load na application da se focusne inputot
  // useEffect(() => {
  //   const el = document.querySelector(".search");
  //   console.log(el);
  //   el.focus();
  // }, []);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}
function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
      {/* isOpen1 && {children} NEMA da raboti bidejki mu vikas
      deka kreiras {} so children vo nego, a ti sakas samo children, 
      ne da kreiras nov objekt */}
    </div>
  );
}
function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}
function Movie({ movie, onSelectMovie }) {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
function WatchedMoviesList({ watched, onDeleteWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}
function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime.toFixed(2)} min</span>
        </p>
      </div>
    </div>
  );
}
function WatchedMovie({ movie, onDeleteWatched }) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>

        <button
          className="btn-delete"
          onClick={() => onDeleteWatched(movie.imdbID)}
        ></button>
      </div>
    </li>
  );
}
// function WatchedBox() {
//
//   const [isOpen2, setIsOpen2] = useState(true);

//   return (
//     <div className="box">
//       <button
//         className="btn-toggle"
//         onClick={() => setIsOpen2((open) => !open)}
//       >
//         {isOpen2 ? "–" : "+"}
//       </button>
//       {isOpen2 && (
//         <>
//           <WatchedSummary watched={watched} />
//           <WatchedMoviesList watched={watched} />
//         </>
//       )}
//     </div>
//   );
// }
function Main({ children }) {
  return <main className="main">{children}</main>;
}
function Loader() {
  return <p className="loader">Loading...</p>;
}
function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const countRef = useRef(0);

  //otkota userRating ke se updateira, triggernuva efektot za da go inkrementira countRef.current
  useEffect(() => {
    if (userRating) {
      countRef.current++;
    }
  }, [userRating]);

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);

  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  //Kreirame nash objekt i rabotime so nego
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Directior: director,
    Genre: genre,
  } = movie;

  //KE JAVI ERROR - bidejki state declaration nemoze da bide vo conditional
  // if (imdbRating > 8) [isTop, setIsTop] = useState(true);

  //Rendered fewer hooks - bidejki return-ash pred da se executenat site hooks
  // if (imdbRating > 8) return <p>Greatest ever!</p>;

  //iako vo nekoi slucai imdbRating e pogolemo od 8 -> sepak ke vrakja false bidejki
  //REACT go gleda SAMO INITIAL RENDEROT.  Bidejki na initial renderot (mount) imdbRating e
  //undefined, on fakticki gleda undefined > 8, shto e false.  Ako se smeni imdbRatingot sepak
  //ke ostane stateot, mozesh vo efekt da go stavis za da se sluci toa shto go barash...
  // const [isTop, setIsTop] = useState(imdbRating > 8);
  // console.log(isTop);

  //...toa bi izgledalo vaka:
  // useEffect(() => {
  //   setIsTop(imdbRating > 8);
  // }, [imdbRating]);
  //...no i ova e losha praktika, podobro e da iskorisis Derived state:
  //varijablata e regenerated sekoj pat koga funkcijata e executed
  const isTop = imdbRating > 8;

  const [avgRating, setAvgRating] = useState(0);

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      countRatingDecisions: countRef.current,
    };

    //Koga ke probas da addnesh film vo Watched koj vekje prethodno go imas staveno,
    //Jhonas stateman go napravi na drug nacin, moevo namerno go iskomentirav
    // watched.find((movie) => movie.imdbID === selectedId)
    //   ? console.error("Error: Cannot add the same movie twice!")
    //   : onAddWatched(newWatchedMovie);

    onAddWatched(newWatchedMovie); //ova treba da go iskomentirash ako go od-komentirash tvojot kod dole
    // onCloseMovie();

    //Za da go izbegnesh problemot so asynchronous state namesto vaka:
    // setAvgRating(Number(imdbRating));
    // setAvgRating((avgRating + userRating) / 2);

    //pishuvash vaka, so callback:
    setAvgRating(Number(imdbRating));
    setAvgRating((avgRating) => (avgRating + userRating) / 2);
  }

  useKey("Escape", onCloseMovie);

  //ISKOMENTIRANO BIDEJKI GO STAVIV VO CUSTOM HOOKS
  // useEffect(() => {
  //   function callback(e) {
  //     if (e.code === "Escape") {
  //       //ako keypressot na tastaturata e ESC
  //       onCloseMovie();
  //       // console.log("CLOSING");
  //     }
  //   }

  //   //mora addEventListener i removeEventListener da primaat ista funkcija - "callback(e)",
  //   //ako ja copy-pastenesh 2 pati, nema da ja poznava Javascript kako ista funkcija
  //   document.addEventListener("keydown", callback);

  //   return function () {
  //     //za da ne apply-nuva nov event listener skoj pat koga e mount-nat komponentot
  //     document.removeEventListener("keydown", callback);
  //   };
  // }, [onCloseMovie]);

  //i tuka mozes da handlenuvash errori isto kako prethodno, samo vo vezbata ne e handlenato

  useEffect(() => {
    async function getMovieDetails() {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
      );
      const data = await res.json();
      setMovie(data);
      // console.log(data);

      setIsLoading(false);
    }
    getMovieDetails();
  }, [selectedId]);

  useEffect(() => {
    if (!title) return; //Za da ne e na pola sekunda "undefined" vo title-ot
    document.title = `MOVIE: ${title}`;

    //cleanup function
    return function () {
      document.title = "usePopcorn";
      // console.log(`Clean up effect for movie ${title}`);
    };
  }, [title]);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <p>{avgRating}</p>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button
                      className="btn-add"
                      onClick={() => handleAdd(selectedId)}
                    >
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>You rated this movie with {watchedUserRating} stars</p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>⛔</span>
      {message}
    </p>
  );
}

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = "9e721866";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  //pogledni App-v2 i pravi razlika so ova. Vo app-v2 imash standardno,
  //a tuka imash istiot kod samo so customHook
  const { movies, isLoading, error } = useMovies(query);

  const [watched, setWatched] = useLocalStorageState([], "watched");

  //ISKOMENTIRAN KOD BIDEJKI SO CUSTOM HOOK E NAPRAVENO ISTOTO
  // const [watched, setWatched] = useState([]);
  //localStorage shablon
  // const [watched, setWatched] = useState(function () {
  //   const storedValue = JSON.parse(localStorage.getItem("watched"));
  //   return storedValue;
  // });

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);

    // localStorage.setItem("watched", watched); //vaka nema da raboti poradi ASYNCHRONOS STATE,
    //ke go koristi stariot watched array

    //Vaka se pravi pravilno:
    //JSON.stringify bidejki local storage moze da cuva samo stringovi kako values
    // localStorage.setItem("watched", JSON.stringify([...watched, movie])); //za da go zeme noviot film vo predvid
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  //ISKOMENTIRAN KOD BIDEJKI SO CUSTOM HOOK E NAPRAVENO ISTOTO
  //Poradi ovoj effect, LOCAL STORAGE i watched se sinhronizirani
  // useEffect(() => {
  //   //pogledni gi komentarite vo handleAddWatched -> nemoras da go pravis vaka localStograge
  //   //updateing-ot kako gore:
  //   // localStorage.setItem("watched", JSON.stringify([...watched, movie]));

  //   //tuku mozes vaka:
  //   localStorage.setItem("watched", JSON.stringify(watched)); //bidejki efekti se slucuvaat POSLE
  //   //state updates
  // }, [watched]);

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        {/* Explicit props - Element prop */}
        {/* <Box element={<MovieList movies={movies} />} />
        <Box
          element={
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} />
            </>
          }
        ></Box> */}

        {/* <Box>{isLoading ? <Loader /> : <MovieList movies={movies} />}</Box> */}
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          <>
            {selectedId ? (
              <MovieDetails
                watched={watched}
                selectedId={selectedId}
                onCloseMovie={handleCloseMovie}
                onAddWatched={handleAddWatched}
              />
            ) : (
              <>
                <WatchedSummary watched={watched} />
                <WatchedMoviesList
                  watched={watched}
                  onDeleteWatched={handleDeleteWatched}
                />
              </>
            )}
          </>
        </Box>
      </Main>
    </>
  );
}
