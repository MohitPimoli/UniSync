import React, { useState, useContext } from "react";
import "./GenerateQuere.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const QueryPage = ({ closeQuery }) => {
  const [queryText, setQueryText] = useState("");
  const [visibility, setVisibility] = useState("Public");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useContext(AuthContext);
  console.log("TokenQuery:", token); // Add this to check if the token is null
  const handleQueryChange = (e) => {
    setQueryText(e.target.value);
  };

  const handleVisibilityChange = (e) => {
    setVisibility(e.target.value);
  };

  const handleQuerySubmit = async () => {
    if (!queryText) {
      setError("Please write a query.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:5001/create-query",
        {
          content: queryText,
          visibility: visibility,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Query submitted successfully:", response.data);
      closeQuery();
    } catch (err) {
      console.error("Error submitting query:", err);
      setError(
        err.response?.data?.message ||
          "An error occurred while submitting the query."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="query-page-overlay">
      <div className="query-page-modal">
        <div className="query-page-header">
          <h2>Create a Query</h2>
          <button onClick={closeQuery} className="close-btn">
            ✕
          </button>
        </div>
        <div className="query-page-content">
          <textarea
            className="query-textarea"
            placeholder="Describe your issue or ask a question..."
            value={queryText}
            onChange={handleQueryChange}
          ></textarea>

          <div className="query-options">
            <label htmlFor="visibility-select">Visibility: </label>
            <select
              id="visibility-select"
              value={visibility}
              onChange={handleVisibilityChange}
            >
              <option value="Public">Public</option>
              <option value="Connections">Connections</option>
            </select>
          </div>

          {error && <p className="error-message">{error}</p>}
        </div>
        <div className="query-page-footer">
          <button
            className="submit-query-btn"
            onClick={handleQuerySubmit}
            disabled={isSubmitting || !queryText}
          >
            {isSubmitting ? "Submitting..." : "Submit Query"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QueryPage;
