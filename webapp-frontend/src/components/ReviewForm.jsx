import { useState } from "react";
import axios from "axios";

function ReviewForm({ movieId, onReviewAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    vote: "",
    text: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/reviews", { movieId, ...formData })
      .then((response) => {
        onReviewAdded(); // Notifica al genitore che una recensione è stata aggiunta
        setFormData({ name: "", vote: "", text: "" }); // Resetta il form
      })
      .catch((error) => {
        console.error("Errore durante l'invio della recensione:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Aggiungi una Recensione</h3>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Nome:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="vote" className="form-label">Voto (1-5):</label>
        <input
          type="number"
          id="vote"
          name="vote"
          value={formData.vote}
          onChange={handleChange}
          className="form-control"
          min="1"
          max="5"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="text" className="form-label">Recensione:</label>
        <textarea
          id="text"
          name="text"
          value={formData.text}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Invia</button>
    </form>
  );
}

export default ReviewForm;
