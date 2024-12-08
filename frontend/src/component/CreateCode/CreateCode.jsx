import React, { useState } from "react";
import "./CreateCode.css"; // CSS file for styling

const CodeArea = ({ closeCodeArea }) => {
  // Ensure prop name matches
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [language, setLanguage] = useState("JavaScript"); // default language

  const handleQuerySubmit = () => {
    setIsSubmitting(true);
    // Simulate a delay for submitting
    setTimeout(() => {
      setIsSubmitting(false);
      console.log("Query submitted:", { description, code, language });
    }, 1000);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="code-area-overlay">
      <div className="code-area-container">
        <div className="code-area-header">
          <h2>Code Area</h2>
          {/* Ensure closeCodeArea is invoked correctly */}
          <button onClick={closeCodeArea} className="close-btn-code">
            X
          </button>
        </div>

        {/* Description Section */}
        <div className="description-section">
          <h3>Description</h3>
          <textarea
            className="description-textarea"
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Describe your code here..."
            spellCheck="false"
          />
        </div>

        {/* Code Editor Section */}
        <div className="code-editor-section">
          <div className="set">
            <div className="language-selector">
              <label htmlFor="language">Language:</label>
              <select
                id="language"
                value={language}
                onChange={handleLanguageChange}
                className="language-dropdown"
              >
                <option value="JavaScript">JavaScript</option>
                <option value="Python">Python</option>
                <option value="C++">C++</option>
                <option value="Java">Java</option>
              </select>
            </div>
            <h3>Code Editor</h3>
          </div>
          <textarea
            className="code-textarea"
            value={code}
            onChange={handleCodeChange}
            placeholder="Write your code here..."
            spellCheck="false"
          />
        </div>

        <div className="query-page-footer">
          <button className="submit-query-btn" onClick={handleQuerySubmit}>
            {isSubmitting ? "Submitting..." : "Submit Query"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeArea;
