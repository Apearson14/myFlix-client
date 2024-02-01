import React, { useState, useEffect } from "react";
import { Container, Row, Col, Navbar, Nav } from "react-bootstrap";
import { MovieCard } from "../MovieCard/MovieCard";
import { MovieView } from "../MovieView/MovieView";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";

export const MainView = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [movies, setMovies] = useState([]);

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
        <Navbar bg="light" expand="lg">
          <Navbar.Brand as={Link} to="/">MyFlix</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {!user ? (
                <>
                  <Nav.Link as={Link} to="/login">Login</Nav.Link>
                  <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/">Home</Nav.Link>
                  <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                  <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>

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
            path="/profile"
            element={<div>Profile View (create your ProfileView component)</div>}
          />
          <Route
            path="/movies/:movieId"
            element={<MovieView movies={movies} />}
          />
          <Route
            path="/"
            element={
              movies.length === 0 ? (
                <Row>
                  <Col>
                    <div>The list is empty!</div>
                  </Col>
                </Row>
              ) : (
                <Row>
                  {movies.map((movie) => (
                    <Col key={movie.id} xs={12} sm={6} md={4} lg={3}>
                      <MovieCard movie={movie} />
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
