import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, onMovieClick, onToggleFavorite }) => {
  const handleFavoriteClick = () => {
    // Call the onToggleFavorite function and pass the movie as an argument
    onToggleFavorite(movie);
  };

  return (
    <Card style={{ cursor: "pointer" }}>
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Img src={movie.image} />
        <Card.Text>{movie.description}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button variant="link">Details</Button>
        </Link>
        
        <Button onClick={handleFavoriteClick}>Favorite</Button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
};

