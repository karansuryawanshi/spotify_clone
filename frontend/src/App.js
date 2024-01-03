// import "./App.css";
import "./output.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginComponent from "./routes/login";
import SignUp from "./routes/Signup";

function App() {
  return (
    <div className="App  font-poppins">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div>Hello Buddy</div>} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
