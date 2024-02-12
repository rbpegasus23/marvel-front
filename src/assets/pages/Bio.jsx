import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Carousel from "../../components/Carousel";
import bouclier from "../images/png/bouclierCaptain.png";

const Bio = ({ setBckgroundMain, setSearchBarMode }) => {
  const { id, name, description } = useParams();
  console.log(id);
  const userToken = Cookies.get("token");

  const [isLoading, setIsLoading] = useState(true);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [mydata, setMyData] = useState([]);
  const [arrImages, setArrImages] = useState([]);

  useEffect(() => {
    setBckgroundMain("bkgroundMain-Bio");
  }, []);

  useEffect(() => {
    setSearchBarMode("");
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const responseRegardingComicsIncludedCharacterData = await axios.get(
          `https://site--marvel-back--mn6tp6dgdm5w.code.run/bio?id=${id}`
        );

        console.log(responseRegardingComicsIncludedCharacterData.data);

        const newData = [
          ...responseRegardingComicsIncludedCharacterData.data.comics,
        ];
        setMyData(newData);
        setThumbnailUrl(
          `${responseRegardingComicsIncludedCharacterData.data.thumbnail.path}.${responseRegardingComicsIncludedCharacterData.data.thumbnail.extension}`
        );
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const newArrImagesForCarousel = [];
    for (let element of mydata) {
      const myObj = {
        image: `${element.thumbnail.path}.${element.thumbnail.extension}`,
        id: element._id,
      };
      newArrImagesForCarousel.push(myObj);
    }
    setArrImages(newArrImagesForCarousel);
  }, [mydata]);

  return isLoading ? (
    <div className="waiting">
      <img src={bouclier} alt="bouclier Captain America" />
    </div>
  ) : (
    <>
      <div className="container-bio">
        <img src={thumbnailUrl} alt={"name"} />
        <div className="recapitulatif">
          <p>
            <span>Nom: </span>
            {name}
          </p>
          <p>
            <span>Description: </span>
            {description}
          </p>
        </div>
      </div>
      {arrImages.length != 0 ? (
        <h2 className="title-bio">{name} joue un rôle dans ces comics :</h2>
      ) : (
        <h2 className="title-bio">
          Zut pas de comic correspondant pour {name} :
        </h2>
      )}

      {arrImages.length != 0 && (
        //Certains characters n'ont pas de comics associés donc je met cette condition
        <div className="container-carrousel">
          <Carousel arrImages={arrImages} />
        </div>
      )}
    </>
  );
};

export default Bio;
