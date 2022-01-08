import { useState } from "react";
import "./Autocomplete.css";
function Autocomplete({ suggestions }) {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [input, setInput] = useState("");
  const handleChange = (e) => {
    const userInput = e.target.value;
    const unlinked = suggestions
      .sort()
      .filter(
        (suggestion) =>
          suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
      );
    setInput(e.target.value);
    setFilteredSuggestions(unlinked);
    setShowSuggestions(true);
  };
  const handleClick = (e) => {
    setInput(e.target.innerText);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    setActiveSuggestionIndex(0);
  };
  const SuggestionsListComponent = () => {
    return filteredSuggestions.length ? (
      <ul class="suggestions">
        {filteredSuggestions.map((suggestion, index) => {
          let className;
          // Flag the active suggestion with a class
          if (index === activeSuggestionIndex) {
            className = "suggestion-active";
          }
          return (
            <li className={className} key={suggestion} onClick={handleClick}>
              {suggestion}
            </li>
          );
        })}
      </ul>
    ) : (
      <div class="no-suggestions">
        <em>No suggestions, you're on your own!</em>
      </div>
    );
  };
  const handleNavigation = (e) => {
    const key = e.keyCode;
    if (key === 13) {
      setInput(filteredSuggestions[activeSuggestionIndex]);
      setActiveSuggestionIndex(0);
      setShowSuggestions(false);
      setFilteredSuggestions([]);
    } else if (key === 40) {
      if (activeSuggestionIndex === filteredSuggestions.length - 1) {
        setActiveSuggestionIndex(0);
      } else {
        setActiveSuggestionIndex(activeSuggestionIndex + 1);
      }
    } else if (key === 38) {
      if (activeSuggestionIndex === 0) {
        setActiveSuggestionIndex(filteredSuggestions.length - 1);
      } else {
        setActiveSuggestionIndex(activeSuggestionIndex - 1);
      }
    }
  };
  return (
    <>
      <input
        type="text"
        onChange={handleChange}
        onClick={handleClick}
        value={input}
        onKeyDown={handleNavigation}
        placeholder="Search.."
      />
      {showSuggestions && input && <SuggestionsListComponent />}
    </>
  );
}

export default Autocomplete;
