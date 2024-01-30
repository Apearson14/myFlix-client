import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card
      style={{ cursor: "pointer" }}
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Img src={movie.image} />
        <Card.Text>{movie.description}</Card.Text>
        <Card.Text>{movie.genre.name}</Card.Text>
        <Card.Text>{movie.director.name}</Card.Text>
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
};
