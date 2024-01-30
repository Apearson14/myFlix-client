import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

export const MovieView = ({ movie, onBackClick }) => {
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
        </Col>
      </Row>
    </Container>
  );
};