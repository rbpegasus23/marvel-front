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
const Comic = (props) => {
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
            title: props.title,
            description: props.description,
            userToken: userToken,
          };
          const response = await axios.post(
            `https://site--marvel-back--mn6tp6dgdm5w.code.run/postFavorisComics`,
            information
          );
          if (response.data.message) {
            console.log(response.data.message);
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
    // je vais limiter le title à 15 caractères car souvent trop long.
    <div className="marvelElements">
      <div>
        <p>{props.title.substring(0, 15)}</p>
      </div>
      <Link to={`/comic/${props.id}`}>
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

export default Comic;
