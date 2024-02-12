import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Cookies from "js-cookie";

import Home from "./assets/pages/Home";
import Character from "./assets/pages/Characters";
import Comics from "./assets/pages/Comics";
import Bio from "./assets/pages/Bio";
import Comic from "./assets/pages/Comic";
import Signup from "./assets/pages/Signup";
import Login from "./assets/pages/Login";
import Header from "./components/Header";
import Favorite from "./assets/pages/Favorite";

import "./App.css";

function App() {
  const [token, setToken] = useState(Cookies.get("token") || "");
  const [bckgroundMain, setBckgroundMain] = useState("bkgroundMain-Home");
  const [numberOfResults, setNumberOfResults] = useState(0);
  const [searchBarMode, setSearchBarMode] = useState("");
  const [filterOfCharacters, setFilterOfCharacters] = useState("");
  const [filterOfComics, setFilterOfComics] = useState("");
  const [researchChanged, setresearchChanged] = useState(false);
  const [skipValueCharac, setSkipValueCharac] = useState("0");
  const [skipValueComics, setSkipValueComics] = useState("0");

  return (
    <Router>
      <Header
        searchBarMode={searchBarMode}
        setToken={setToken}
        researchChanged={researchChanged}
        setresearchChanged={setresearchChanged}
        setFilterOfCharacters={setFilterOfCharacters}
        setFilterOfComics={setFilterOfComics}
        setSkipValueComics={setSkipValueComics}
        setSkipValueCharac={setSkipValueCharac}
      ></Header>

      <main
        id={
          bckgroundMain == "bkgroundMain-Home"
            ? "bkgroundMain-Home"
            : bckgroundMain == "bkgroundMain-Login"
            ? "bkgroundMain-Login"
            : bckgroundMain == "bkgroundMain-Signup"
            ? "bkgroundMain-Signup"
            : bckgroundMain == "bkgroundMain-Bio"
            ? "bkgroundMain-Bio"
            : bckgroundMain == "bkgroundMain-Character"
            ? "bkgroundMain-Character"
            : bckgroundMain == "bkgroundMain-Comic"
            ? "bkgroundMain-Comic"
            : bckgroundMain == "bkgroundMain-Favorite"
            ? "bkgroundMain-Favorite"
            : ""
        }
      >
        <Routes>
          <Route
            path="/signup"
            element={
              <Signup setToken={setToken} setBckgroundMain={setBckgroundMain} />
            }
          />
          <Route
            path="/login"
            element={
              <Login setToken={setToken} setBckgroundMain={setBckgroundMain} />
            }
          />

          <Route
            path="/character"
            element={
              <Character
                setBckgroundMain={setBckgroundMain}
                numberOfResults={numberOfResults}
                setNumberOfResults={setNumberOfResults}
                setSearchBarMode={setSearchBarMode}
                filterOfCharacters={filterOfCharacters}
                researchChanged={researchChanged}
                setresearchChanged={setresearchChanged}
                skipValueCharac={skipValueCharac}
                setSkipValueCharac={setSkipValueCharac}
              />
            }
          />
          <Route
            path="/comics"
            element={
              <Comics
                setBckgroundMain={setBckgroundMain}
                setSearchBarMode={setSearchBarMode}
                filterOfComics={filterOfComics}
                researchChanged={researchChanged}
                setresearchChanged={setresearchChanged}
                skipValueComics={skipValueComics}
                setSkipValueComics={setSkipValueComics}
              />
            }
          />

          <Route
            path="/"
            element={
              <Home
                setBckgroundMain={setBckgroundMain}
                numberOfResults={numberOfResults}
                setNumberOfResults={setNumberOfResults}
                setSearchBarMode={setSearchBarMode}
              />
            }
          />

          <Route
            path="/bio/:id/:name/:description"
            element={
              <Bio
                setBckgroundMain={setBckgroundMain}
                setSearchBarMode={setSearchBarMode}
              />
            }
          />
          <Route
            path="/comic/:id"
            element={
              <Comic
                setBckgroundMain={setBckgroundMain}
                setSearchBarMode={setSearchBarMode}
              />
            }
          />

          <Route
            path="/favorite"
            element={
              <Favorite
                setBckgroundMain={setBckgroundMain}
                setSearchBarMode={setSearchBarMode}
              />
            }
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
