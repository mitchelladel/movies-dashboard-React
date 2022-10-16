import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { IMovie } from "../Stores/moviesStore";
import { useStores } from "../Stores/RootStore";
import MovieCard from "./MovieCard";
import MovieSearchInput from "./MovieSearchInput";
import { useCallback } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { searchMovie } from "../Services/MoviesService";
import { Empty_SEARCH_URL } from "../Utils/constants";

const MoviesDashboard = observer(() => {
  const { moviesStore } = useStores();

  const [movies, setMovies] = useState<IMovie[] | undefined>([]);
  const [genres, setGenres] = useState<string[] | undefined>([]);

  const [searchValue, setSearchValue] = useState<string>("");

  const [selectedGenre, setSelectedGenre] = useState<string | undefined>(
    "Select Genre"
  );

  // Get the input field

  const searchForMovie = async (event: any) => {
    if (event.key === "Enter") {
      const response = await searchMovie(searchValue);
      try {
        if (response.id && response.url) {
          window.open(response.url, "_blank");
        }
      } catch {
        window.open(Empty_SEARCH_URL, "_blank");
      }
    }
  };

  useEffect(() => {
    setMovies(moviesStore.movies);
    const genres: any = ["All"];
    moviesStore.movies?.forEach((element: any, index, array) => {
      element?.genres.forEach((genre: string, index: any, array: any) => {
        if (genres.includes(genre)) return;
        genres.push(genre);
      });
    });
    setGenres(genres);
  }, [moviesStore.movies]);

  const onMovieSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value.toLowerCase());

      const filtered = moviesStore.movies?.filter((movie: any) => {
        return movie?.name
          .toLowerCase()
          .includes(event.target.value.toLowerCase());
      });
      setMovies(filtered);
    },
    [moviesStore.movies]
  );

  const handleMovieOnClick = (movie: IMovie) => {
    window.open(movie.url);
  };
  const handleOnSelect = (event: any) => {
    setSelectedGenre(event);
    if (event === "All") {
      setMovies(moviesStore.movies);
      return;
    }
    const filtered = moviesStore.movies?.filter((movie: any) => {
      return movie?.genres.includes(event);
    });
    setMovies(filtered);
  };

  return (
    <div className="box">
      <Container>
        <MovieSearchInput
          id="searchInput"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onMovieSearch(e)
          }
          searchForMovie={(event: React.ChangeEvent<HTMLInputElement>) =>
            searchForMovie(event)
          }
        />
        <DropdownButton
          title={selectedGenre}
          id="dropdown-menu-align-right"
          onSelect={handleOnSelect}
        >
          {" "}
          <Dropdown.Menu>
            {genres?.map((genre) => (
              <Dropdown.Item eventKey={genre}>{genre}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </DropdownButton>{" "}
        <Row>
          <div className="movie-dashboard-row">
            {movies?.map((movie) => (
              <Col key={movie.id} className="d-grid gap-3">
                <MovieCard
                  name={movie.name}
                  image={movie?.image?.medium}
                  key={movie.id}
                  onClick={() => handleMovieOnClick(movie)}
                  rating={movie?.rating?.average}
                  genres={movie?.genres}
                />
              </Col>
            ))}
          </div>
        </Row>
      </Container>
    </div>
  );
});

export default MoviesDashboard;
