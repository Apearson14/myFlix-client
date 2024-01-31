import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { MovieCard } from "../MovieCard/MovieCard";
import { MovieView } from "../MovieView/MovieView";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";

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

  return (
    <Router>
      <Container>
        <Row>
          <Col>
            {user ? (
              <Link to="/logout">Logout</Link>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <span> or </span>
                <Link to="/signup">Signup</Link>
              </>
            )}
          </Col>
        </Row>

        <Routes>
          <Route
            path="/login"
            element={<LoginView onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }} />}
          />
          <Route
            path="/signup"
            element={<SignupView />}
          />
          <Route
            path="/logout"
            element={<Navigate to="/" replace />}
          />
          <Route
            path="/movies/:movieId"
            element={
              <MovieView
                movies={movies}
                onBackClick={() => setSelectedMovie(null)}
              />
            }
          />
          <Route
            path="/"
            element={
              selectedMovie ? (
                <Navigate to={`/movies/${selectedMovie.id}`} />
              ) : movies.length === 0 ? (
                <Row>
                  <Col>
                    <div>The list is empty!</div>
                  </Col>
                </Row>
              ) : (
                <Row>
                  {movies.map((movie) => (
                    <Col key={movie.id} xs={12} sm={6} md={4} lg={3}>
                      <MovieCard
                        movie={movie}
                        onMovieClick={() => {
                          setSelectedMovie(movie);
                        }}
                      />
                    </Col>
                  ))}
                </Row>
              )
            }
          />
        </Routes>
      </Container>
    </Router>
  );
};

