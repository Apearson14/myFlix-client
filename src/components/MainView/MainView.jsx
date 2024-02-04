<Routes>
  <Route
    path="/login"
    element={
      user ? (
        <Navigate to="/" replace />
      ) : (
        <LoginView onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }} />
      )
    }
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
    element={<ProfileView movies={movies} onUpdateUser={handleUpdateUser} onDeregister={handleDeregister} onToggleFavorite={handleToggleFavorite} />}
  />
  <Route
    path="/movies/:movieId"
    element={<MovieView movies={movies} onToggleFavorite={handleToggleFavorite} />}
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
              
              <MovieCard movie={movie} onToggleFavorite={handleToggleFavorite} />
            </Col>
          ))}
        </Row>
      )
    }
  />
</Routes>
