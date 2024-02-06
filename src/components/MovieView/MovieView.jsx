import React from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieView = ({ movies, onBackClick, onToggleFavorite }) => {
  const { movieId } = useParams(); 
  const movie = movies.find((m) => m._id === movieId); 

  
  if (!movie) return null; 

  const handleFavoriteClick = () => {
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
          <Link to={"/"}>
            <Button variant="primary">Back</Button>
          </Link>
          <Button onClick={handleFavoriteClick}>Favorite</Button>
        </Col>
      </Row>
    </Container>
  );
};
