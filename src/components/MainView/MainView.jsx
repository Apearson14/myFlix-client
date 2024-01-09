import { useState } from "react";
import { MovieCard } from "../MovieCard/MovieCard";
import { MovieView } from "../MovieView/MovieView";


    export const MainView = () => {
        const [ movie, setMovie] = useState([
            {
                id: 1,
                title: "Step Brothers",
                image:
                "m.media-amazon.com/images/M/MV5BODViZDg3ZjYtMzhiYS00YTVkLTk4MzktYWUxMTlkYjc1NjdlXkEyXkFqcGdeQXVyMTMxODk2OTU@.V1_FMjpg_UX1079.jpg",
                director: "Adam McKay"
            },
            {
                id: 2,
                title: "300",
                image:
                "https://m.media-amazon.com/images/I/811XNNbIaML._AC_SX679_.jpg",
                director: "Zack Snyder"
            },
            {
                id: 3,
                title: "Grown ups",
                image: 
                "https://m.media-amazon.com/images/I/71LYatfiX-L._AC_SX679_.jpg",
                director: "Dennis Dungan"
            },
        ]);
        const [selectedMovie, setSelectedMovie] = useState(null);

        if (selectedMovie) {
          return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
          );
        }
      
        if (movie.length === 0) {
          return <div>The list is empty!</div>;
        }
      
        return (
          <div>
            {movie.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            ))}
          </div>
        );
      };
      