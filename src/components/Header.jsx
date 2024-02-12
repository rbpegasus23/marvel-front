import marvelLogo from "../assets/images/logo/marvel-logo.png";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import ironman from "../assets/images/png/ironman.png";
import { useState } from "react";
const Header = (props) => {
  const userToken = Cookies.get("token");
  const [characterTypedOnInput, setCharacterTypedOnInput] = useState("");
  const [comicTypedOnInput, setComicTypedOnInput] = useState("");

  const handleChangeValueOfCharacterTypedOnInput = (e) => {
    console.log(e.target.value);
    setCharacterTypedOnInput(e.target.value);
  };

  const handleChangeValueOfComicTypedOnInput = (e) => {
    console.log(e.target.value);
    setComicTypedOnInput(e.target.value);
  };

  const handleDisconnect = () => {
    Cookies.remove("token");
    props.setToken(null);
  };

  const filterCharacters = () => {
    props.setSkipValueCharac("0");
    props.setresearchChanged(!props.researchChanged);
    props.setFilterOfCharacters(characterTypedOnInput);
  };

  const filterComics = () => {
    props.setSkipValueComics("0");
    props.setresearchChanged(!props.researchChanged);
    props.setFilterOfComics(comicTypedOnInput);
  };

  const handleKeyDownForFilterCharac = (e) => {
    if (e.key === "Enter") {
      filterCharacters();
    }

    // console.log("touche entrée");
  };

  const handleKeyDownForFilterComics = (e) => {
    if (e.key === "Enter") {
      filterComics();
    }
  };
  const displaySeConnecter = () => {
    return (
      <header>
        <Link to={"/"}>
          <img src={marvelLogo} alt="Marvel Logo" />
        </Link>
        {props.searchBarMode == "comics" ? (
          <div className="searchBar">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              onChange={handleChangeValueOfComicTypedOnInput}
              type="text"
              value={comicTypedOnInput}
              placeholder="Rechercher des comics"
            />
          </div>
        ) : props.searchBarMode == "characters" ? (
          <div className="searchBar">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              onChange={handleChangeValueOfCharacterTypedOnInput}
              type="text"
              value={characterTypedOnInput}
              placeholder="Rechercher des personnages"
            />
          </div>
        ) : (
          ""
        )}

        <div className="divButtonsOfHeader">
          <img src={ironman} alt="ironman" />
          <Link to={"/signup"}>
            <button>S'inscrire</button>
          </Link>
          <Link to={"/login"}>
            <button>Se connecter</button>
          </Link>
        </div>
      </header>
    );
  };
  const displaySeDeconnecter = () => {
    return (
      <header>
        <Link to={"/"}>
          <img src={marvelLogo} alt="Marvel Logo" />
        </Link>
        {props.searchBarMode == "comics" ? (
          <div className="searchBar">
            <i
              onClick={filterComics}
              className="fa-solid fa-magnifying-glass"
            ></i>
            <input
              onChange={handleChangeValueOfComicTypedOnInput}
              onKeyDown={handleKeyDownForFilterComics}
              type="text"
              value={comicTypedOnInput}
              placeholder="Rechercher des comics"
            />
          </div>
        ) : props.searchBarMode == "characters" ? (
          <div className="searchBar">
            <i
              onClick={filterCharacters}
              className="fa-solid fa-magnifying-glass"
            ></i>
            <input
              onChange={handleChangeValueOfCharacterTypedOnInput}
              onKeyDown={handleKeyDownForFilterCharac}
              type="text"
              value={characterTypedOnInput}
              placeholder="Rechercher des personnages"
            />
          </div>
        ) : (
          ""
        )}
        <div className="divButtonsOfHeader">
          <Link to={"/"}>
            <button onClick={handleDisconnect}>Se déconnecter</button>
          </Link>
          <Link to={"/favorite"}>
            <button>Voir mes favoris</button>
          </Link>
        </div>
      </header>
    );
  };
  return userToken ? displaySeDeconnecter() : displaySeConnecter();
};

export default Header;
