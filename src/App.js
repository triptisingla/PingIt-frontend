import { Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage";
import SignIn from "./Components/Register/SignIn";
import SignUp from "./Components/Register/SignUp";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} ></Route>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
