import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import CarouselFavoriteComic from "../../components/CarouselFavoriteComic";
import CarouselFavoriteCharacter from "../../components/CarouselFavoriteCharacter";
import bouclier from "../images/png/bouclierCaptain.png";

const Favorite = ({ setBckgroundMain, setSearchBarMode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [mydata, setMyData] = useState({});

  useEffect(() => {
    setBckgroundMain("bkgroundMain-Favorite");
  }, []);

  useEffect(() => {
    setSearchBarMode("");
  }, []);

  useEffect(() => {
    const userToken = Cookies.get("token");
    console.log(userToken);
    const getFavorite = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-back--mn6tp6dgdm5w.code.run/getFavorite?userToken=${userToken}`
        );
        console.log(response.data);
        const newData = { ...response.data };
        console.log("voici newData : ", newData);
        setMyData(newData);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getFavorite();
  }, []);
  const displayFavorite = () => {
    return (
      <>
        {mydata.favoritesCharacters.length !== 0 ? (
          <div className="container-favorite">
            <h2>Vos personnages favoris :</h2>
            <div className="container-carrousel">
              <CarouselFavoriteCharacter
                arrImages={mydata.favoritesCharacters}
              />
            </div>
          </div>
        ) : (
          <div className="container-favorite">
            <h2>Vous n'avez toujours pas ajouté de personnage à vos favoris</h2>
          </div>
        )}

        {mydata.favoritesComics.length !== 0 ? (
          <div className="container-favorite">
            <h2>Vos comics favoris :</h2>
            <div className="container-carrousel">
              <CarouselFavoriteComic arrImages={mydata.favoritesComics} />
            </div>
          </div>
        ) : (
          <div className="container-favorite">
            <h2>Vous n'avez toujours pas ajouté de comics à vos favoris</h2>
          </div>
        )}
      </>
    );
  };
  return isLoading ? (
    <div className="waiting">
      <img src={bouclier} alt="bouclier Captain America" />
    </div>
  ) : (
    displayFavorite()
  );
};

export default Favorite;
