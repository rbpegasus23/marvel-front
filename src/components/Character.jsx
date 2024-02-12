import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
  Navigate,
} from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
const Character = (props) => {
  const navigate = useNavigate();
  const [classFavIco, setClassFavIco] = useState(false);

  const handleChangeColorOfFavIco = () => {
    setClassFavIco(!classFavIco);
    console.log(props.id);

    const postFavorite = async () => {
      const userToken = Cookies.get("token");
      if (userToken) {
        try {
          const information = {
            id: props.id,
            imageUrl: props.imageUrl,
            description: props.description,
            name: props.name,
            userToken: userToken,
          };
          const response = await axios.post(
            `https://site--marvel-back--mn6tp6dgdm5w.code.run/postFavorisCharacters`,
            information
          );
          if (response.data.message) {
            console.log(response.data.message);
          } else {
            console.log("response Fav : ", response.data);
            const newArrOfFavoriteCharac = [
              ...response.data.favoritesCharacters,
            ];
            console.log("newArrOfFavoriteCharac : ", newArrOfFavoriteCharac);
            props.setFavoriteCharac(newArrOfFavoriteCharac);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        navigate("/login");
      }
    };

    postFavorite();
  };

  return (
    <div className="marvelElements">
      <div>
        <p>{props.name}</p>
      </div>
      <Link
        to={`/bio/${props.id}/${props.name}/${
          props.description || "Pas de description"
        }`}
      >
        <img src={props.imageUrl} alt={props.id} />
      </Link>
      <i
        className={
          classFavIco ? "fa-solid fa-heart active" : "fa-regular fa-heart"
        }
        onClick={handleChangeColorOfFavIco}
      ></i>
    </div>
  );
};

export default Character;
