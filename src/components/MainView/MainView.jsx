import React, { useState, useEffect } from "react";
import { Container, Row, Col, Navbar, Nav } from "react-bootstrap";
import { MovieCard } from "../MovieCard/MovieCard";
import { MovieView } from "../MovieView/MovieView";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";

export const MainView = () => {
  // Retrieving the token from localStorage and initializing the token state
  const storedToken = localStorage.getItem("token");
  const [token, setToken] = useState(storedToken || null);

  // Adjusted state initialization for user using localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [movies, setMovies] = useState([]);

  // useEffect to fetch movies if token is present
  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://austins-movies-98c87d76c471.herokuapp.com/movies", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error("Error fetching movies:", error));
  }, [token]);

  
  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  const handleDeregister = () => {
    setUser(null);
    setToken(null);
  };

  const handleToggleFavorite = (selectedMovie) => {
    console.log(`Toggling favorite for movie: ${selectedMovie.title}`);
  };

  return (
    <Router>
      <Container fluid>
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
          <Route path="/login" element={
            <>
              {user ? <Navigate to="/" /> : <LoginView onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
              }}/>}
            </>
          }/>
          <Route path="/signup" element={<SignupView />} />
          <Route path="/logout" element={<Navigate to="/" replace />} />
          <Route path="/profile" element={<ProfileView movies={movies} onUpdateUser={handleUpdateUser} onDeregister={handleDeregister} onToggleFavorite={handleToggleFavorite} />} />
          <Route path="/movies/:movieId" element={<MovieView movies={movies} onToggleFavorite={handleToggleFavorite} />} />
          <Route path="/" element={
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
                    <MovieCard movie={movie} onToggleFavorite={handleToggleFavorite} />
                  </Col>
                ))}
              </Row>
            )
          }/>
        </Routes>
      </Container>
    </Router>
  );
};

