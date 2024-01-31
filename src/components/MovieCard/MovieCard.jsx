import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card
      style={{ cursor: "pointer" }}
      onClick={onMovieClick}
    >
      <Link to={`/movies/${movie.id}`}>
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Img src={movie.image} />
          <Card.Text>{movie.description}</Card.Text>
          <Card.Text>{movie.genre.name}</Card.Text>
          <Card.Text>{movie.director.name}</Card.Text>
        </Card.Body>
      </Link>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};

