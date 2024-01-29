import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
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
    if (!token) {
      return;
    }

    // Fetch data from the provided link
    fetch("https://austins-movies-98c87d76c471.herokuapp.com/movies", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error("Error fetching movies:", error));
  }, [token]);

  if (!user) {
    return (
      <Container>
        <Row>
          <Col>
            <LoginView onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }} />
          </Col>
          <Col>
            or
          </Col>
          <Col>
            <SignupView />
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container>
      <Row>
        <Col>
          {user && (
            <button
              onClick={() => {
                setUser(null);
              }}
            >
              Logout
            </button>
          )}
        </Col>
      </Row>

      {selectedMovie ? (
        <MovieView
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
        />
      ) : movies.length === 0 ? (
        <Row>
          <Col>
            <div>The list is empty!</div>
          </Col>
        </Row>
      ) : (
        <Row>
          {movies.map((movie) => (
            <Col key={movie.id} md={4}>
              <MovieCard
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};
