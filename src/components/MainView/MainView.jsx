import { useState } from "react";
import { MovieCard } from "../MovieCard/MovieCard";
import { MovieView } from "../MovieView/MovieView";


    export const MainView = () => {
        const [ movie, setMovie] = useState([
            {
                id: 1,
                title: "Step Brothers",
                image:
                "https://www.imdb.com/title/tt0838283/mediaviewer/rm3433645824/?ref_=ext_shr_lnk",
                director: "Adam McKay"
            },
            {
                id: 2,
                title: "300",
                image:
                "https://www.imdb.com/title/tt0416449/mediaviewer/rm1847235072/?ref_=ext_shr_lnk",
                director: "Zack Snyder"
            },
            {
                id: 3,
                title: "Grown ups",
                image: 
                "https://www.imdb.com/title/tt1375670/mediaviewer/rm3949694720/?ref_=ext_shr_lnk",
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
      