import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/posts/${id}`)
      .then(response => {
        setMovie(response.data);
      })
      .catch(error => {
        console.error("Errore durante il recupero dei dettagli del film:", error);
      });
  }, [id]);

  if (!movie) return <p>Caricamento...</p>;

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.content}</p>
      <img src={movie.image} alt={movie.title} style={{ width: "300px" }} />
      <h2>Recensioni:</h2>
      <ul>
        {movie.reviews.map(review => (
          <li key={review.id}>
            <strong>{review.name}:</strong> {review.text} (Voto: {review.vote})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieDetails;
