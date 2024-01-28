import React, { useState, useEffect } from "react";
import { MovieCard } from "../MovieCard/MovieCard";
import { MovieView } from "../MovieView/MovieView";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);

      // Fetch data from the authenticated endpoint
      fetch("https://austins-movies-98c87d76c471.herokuapp.com/movies", {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setMovies(data))
        .catch((error) => console.error("Error fetching movies:", error));
    }
  }, []);

  const handleMovieClick = (newSelectedMovie) => {
    setSelectedMovie(newSelectedMovie);
  };

  return (
    <>
      {user && (
        <button
          onClick={() => {
            setUser(null);
          }}
        >
          Logout
        </button>
      )}

      {selectedMovie ? (
        <MovieView
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
        />
      ) : movies.length === 0 ? (
        <div>The list is empty!</div>
      ) : (
        <div>
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onMovieClick={handleMovieClick}
            />
          ))}
        </div>
      )}
    </>
  );
};
