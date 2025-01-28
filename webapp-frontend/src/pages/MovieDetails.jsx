import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ReviewForm from "../components/ReviewForm";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  // Funzione per recuperare i dettagli del film
  const fetchMovieDetails = () => {
    axios
      .get(`http://localhost:3000/posts/${id}`)
      .then((response) => {
        setMovie(response.data);
      })
      .catch((error) => {
        console.error("Errore durante il recupero dei dettagli del film:", error);
      });
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  if (!movie) return <p>Caricamento...</p>;

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.content}</p>
      <img src={movie.image} alt={movie.title} style={{ width: "300px", marginBottom: "20px" }} />

      {/* Sezione Recensioni */}
      <h2>Recensioni:</h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {movie.reviews.length > 0 ? (
          movie.reviews.map((review) => (
            <li
              key={review.id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "5px",
              }}
            >
              <strong>{review.name}:</strong> {review.text} <br />
              <span style={{ fontWeight: "bold" }}>Voto:</span> {review.vote}/5
            </li>
          ))
        ) : (
          <p>Nessuna recensione disponibile. Sii il primo a lasciare una recensione!</p>
        )}
      </ul>

      {/* Form per aggiungere una nuova recensione */}
      <ReviewForm movieId={movie.id} onReviewAdded={fetchMovieDetails} />
    </div>
  );
}

export default MovieDetails;
