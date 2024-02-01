import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

export const MovieView = ({ movie, onBackClick, onToggleFavorite }) => {
  const handleFavoriteClick = () => {
    // Call the onToggleFavorite function and pass the movie as an argument
    onToggleFavorite(movie);
  };

  return (
    <Container>
      <Row>
        <Col xs={12} md={6}>
          <img src={movie.image} alt={movie.title} className="img-fluid" />
        </Col>
        <Col xs={12} md={6}>
          <div>
            <h3>Title:</h3>
            <p>{movie.title}</p>
          </div>
          <div>
            <h3>Director:</h3>
            <p>{movie.director}</p>
          </div>
          <div>
            <h3>Description:</h3>
            <p>{movie.description}</p>
          </div>
          <Button onClick={onBackClick}>Back</Button>

          <Button onClick={handleFavoriteClick}>Favorite</Button>
        </Col>
      </Row>
    </Container>
  );
};