// import "./App.css";
import "./output.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginComponent from "./routes/login";
import SignUp from "./routes/Signup";
import Home from "./routes/Home";
import { useCookies } from "react-cookie";
import LogginHome from "./routes/LogginHome";
import UploadSong from "./routes/UploadSong";
import MyMusic from "./routes/MyMusic";
import { useState } from "react";
import songContext from "./context/songContext";
import SearchPage from "./routes/SearchPage";

function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [soundPlayed, setSoundPlayed] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  const [cookies, setCookies] = useCookies(["token"]);

  console.log(cookies);
  return (
    <div className="App  font-poppins">
      <BrowserRouter>
        {cookies.token ? (
          // login
          <songContext.Provider
            value={{
              currentSong,
              setCurrentSong,
              soundPlayed,
              setSoundPlayed,
              isPaused,
              setIsPaused,
            }}
          >
            <Routes>
              <Route path="/" element={<div>Hello Buddy</div>} />
              <Route path="/home" element={<LogginHome />} />
              <Route path="/upload song" element={<UploadSong />} />
              <Route path="/mymusic" element={<MyMusic />} />
              <Route path="/search" element={<SearchPage />}></Route>
              <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
          </songContext.Provider>
        ) : (
          <Routes>
            <Route path="*" element={<Navigate to="/login" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
