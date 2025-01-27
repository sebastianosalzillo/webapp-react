// Movies.jsx
import { useEffect, useState } from "react";
import axios from "axios";

function Movies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/posts")
      .then((response) => setMovies(response.data))
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  return (
    <div className="row">
      {movies.map((movie) => (
        <div key={movie.id} className="col-md-4">
          <div className="card mb-4 shadow-sm">
            <img
              src={movie.image}
              className="card-img-top"
              alt={movie.title}
              style={{ height: "200px", objectFit: "cover" }}
            />
            <div className="card-body">
              <h5 className="card-title">{movie.title}</h5>
              <p className="card-text">{movie.content}</p>
              <a href={`/movies/${movie.id}`} className="btn btn-primary">
                View Details
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Movies;
