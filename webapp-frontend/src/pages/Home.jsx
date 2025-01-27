import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/posts") // Backend su porta 3000
      .then(response => {
        setMovies(response.data);
      })
      .catch(error => {
        console.error("Errore durante il recupero dei film:", error);
      });
  }, []);

  return (
    <div>
      <h1>Lista dei Film</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <h3>{movie.title}</h3>
            <p>{movie.content}</p>
            <img src={movie.image} alt={movie.title} style={{ width: "200px" }} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
