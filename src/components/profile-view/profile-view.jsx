import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";

export const ProfileView = ({ movies, onUpdateUser, onDeregister }) => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    username: "",
    password: "",
    email: "",
    birthday: "",
  });

  useEffect(() => {
    // Fetch user information based on the logged-in username
    fetch(`https://austins-movies-98c87d76c471.herokuapp.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error("Error fetching user:", error));
  }, [username]);

  const handleUpdate = () => {
    // Perform update user API call with updatedUser data
    fetch(`https://austins-movies-98c87d76c471.herokuapp.com/users/${username}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(updatedUser),
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setEditMode(false);
        onUpdateUser(data);
      })
      .catch((error) => console.error("Error updating user:", error));
  };

  const handleDeregister = () => {
    // Perform deregister API call
    fetch(`https://austins-movies-98c87d76c471.herokuapp.com/users/${username}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(() => {
        onDeregister();
      })
      .catch((error) => console.error("Error deregistering user:", error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  const favoriteMovies = movies.filter((m) => user?.FavoriteMovies.includes(m._id));

  return (
    <Container>
      <Row>
        <Col>
          <h1>Profile</h1>
          {user && (
            <Card>
              <Card.Body>
                <Card.Title>{user.Username}</Card.Title>
                {editMode ? (
                  <Form>
                    <Form.Group controlId="formUsername">
                      <Form.Label>Username:</Form.Label>
                      <Form.Control
                        type="text"
                        name="username"
                        value={updatedUser.username || user.Username}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                      <Form.Label>Password:</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        value={updatedUser.password}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                      <Form.Label>Email:</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={updatedUser.email || user.Email}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="formBirthday">
                      <Form.Label>Birthday:</Form.Label>
                      <Form.Control
                        type="date"
                        name="birthday"
                        value={updatedUser.birthday || user.Birthday}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Button variant="primary" onClick={handleUpdate}>
                      Update
                    </Button>{" "}
                    <Button variant="secondary" onClick={() => setEditMode(false)}>
                      Cancel
                    </Button>
                  </Form>
                ) : (
                  <>
                    <Card.Text>Email: {user.Email}</Card.Text>
                    <Card.Text>Birthday: {user.Birthday}</Card.Text>
                    <Button variant="primary" onClick={() => setEditMode(true)}>
                      Edit
                    </Button>{" "}
                    <Button variant="danger" onClick={handleDeregister}>
                      Deregister
                    </Button>
                  </>
                )}
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>

      {favoriteMovies.length > 0 && (
        <Row>
          <Col>
            <h2>Favorite Movies</h2>
            <Row>
              {favoriteMovies.map((movie) => (
                <Col key={movie._id} xs={12} sm={6} md={4} lg={3}>
                  <Card>
                    <Card.Img variant="top" src={movie.ImagePath} />
                    <Card.Body>
                      <Card.Title>{movie.Title}</Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      )}
    </Container>
  );
};
