import "./App.css";
import Autocomplete from "./Autocomplete";

function App() {
  const suggestions = [
    "Javascript",
    "react",
    "NodeJs",
    "ExpressJs",
    "Firebase",
    "MongoDB",
  ];
  return (
    <div className="App">
      <h1>React Autocomplete Demo</h1>
      <h2>Start typing and experience React autocomplete!</h2>
      <Autocomplete suggestions={suggestions} />
    </div>
  );
}

export default App;
