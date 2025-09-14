import { Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} ></Route>
      </Routes>
    </div>
  );
}

export default App;
