import Character from "../../components/Character";
import { useState, useEffect } from "react";
import ButtonsPagging from "../../components/ButtonsPaging";
import { Link } from "react-router-dom";
import bannerCharacters from "../images/wallpaper/characters.jpg";
import bannerComics from "../images/wallpaper/comics.jpg";
import Cookies from "js-cookie";

const Home = ({ setBckgroundMain, setSearchBarMode }) => {
  const userToken = Cookies.get("token");
  const [isLoading, setIsLoading] = useState(true);
  const [mydata, setMyData] = useState([]);
  const [skipValue, setSkipValue] = useState("0");
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [limitvalue, setLimitvalue] = useState("90");
  const [currentIdButtonOfPaging, setCurrentIdButtonOfPaging] = useState(1);
  const [arrOfClassForButtonOfPaging, setArrOfClassForButtonOfPaging] =
    useState([]);

  useEffect(() => {
    setBckgroundMain("bkgroundMain-Home");
  }, []);

  useEffect(() => {
    setSearchBarMode("");
  }, []);

  return (
    <>
      <nav>
        <div>
          <a href="#characters">Characters</a>
        </div>
        <div>
          <a href="#comics">Comics</a>
        </div>
      </nav>
      <Link to={userToken ? "/character" : "/login"}>
        <h2 className="h2Section">
          Explorez les personnages de l'univers Marvel
        </h2>
        <section id="characters">
          <div>
            <div className="maskCharacters">
              <img src={bannerCharacters} alt="charactersBanner" />
            </div>
          </div>
        </section>
      </Link>
      <h2 className="h2Section">Explorez les comics de l'univers Marvel</h2>
      <Link to={userToken ? "/comics" : "/login"}>
        <section id="comics">
          <div>
            <div className="maskComics">
              <img src={bannerComics} alt="comicsBanner" />
            </div>
          </div>
        </section>
      </Link>
    </>
  );
};

export default Home;
