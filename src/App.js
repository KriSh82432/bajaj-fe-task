import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";
import "./index.css"; // Import the CSS

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [error, setError] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [dropdownOptions, setDropdownOptions] = useState([]);

  const options = [
    { value: "alphabets", label: "Alphabets" },
    { value: "numbers", label: "Numbers" },
    { value: "highest_lowercase_alphabet", label: "Highest Lowercase Alphabet" }
  ];

  const handleSubmit = async () => {
    setError("");

    try {
      const parsedInput = JSON.parse(jsonInput);
      if (!parsedInput.data) {
        setError("Invalid JSON: Missing 'data' field");
        return;
      }

      const response = await axios.post("https://bajaj-backend-task.onrender.com/bfhl", parsedInput);
      setResponseData(response.data);
    } catch (e) {
      setError("Invalid JSON format");
    }
  };

  const handleDropdownChange = (selectedOptions) => {
    setDropdownOptions(selectedOptions || []);
  };

  const renderFilteredResponse = () => {
    if (!responseData || dropdownOptions.length === 0) return null;

    return (
        <div className="response-output">
          <h3>Filtered Response:</h3>
          <ul>
            {dropdownOptions.map((option) => {
              switch (option.value) {
                case "alphabets":
                  return (
                      <li key="alphabets">
                        <strong>Alphabets: </strong>{responseData.alphabets.join(", ")}
                      </li>
                  );
                case "numbers":
                  return (
                      <li key="numbers">
                        <strong>Numbers: </strong>{responseData.numbers.join(", ")}
                      </li>
                  );
                case "highest_lowercase_alphabet":
                  return (
                      <li key="highest_lowercase_alphabet">
                        <strong>Highest Lowercase Alphabet: </strong>{responseData.highest_lowercase_alphabet.join(", ")}
                      </li>
                  );
                default:
                  return null;
              }
            })}
          </ul>
        </div>
    );
  };

  return (
      <div className="App">
        <title>RA2111043010028</title>
        <h1>Frontend App for Processing JSON</h1>

        <div className="input-section">
          <label>Enter your JSON:</label>
          <textarea
              rows="6"
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
          />
          {error && <div className="error-message">{error}</div>}
          <button onClick={handleSubmit}>Submit</button>
        </div>

        {responseData && (
            <div className="dropdown-section">
              <h2>Select Options to Display</h2>
              <Select
                  isMulti
                  options={options}
                  onChange={handleDropdownChange}
              />
            </div>
        )}

        {renderFilteredResponse()}
      </div>
  );
}

export default App;
