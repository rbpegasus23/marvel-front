import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import bouclier from "../images/png/bouclierCaptain.png";

const Comic = ({ setBckgroundMain, setSearchBarMode }) => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [mydata, setMyData] = useState({});

  useEffect(() => {
    setBckgroundMain("bkgroundMain-Comic");
  }, []);

  useEffect(() => {
    setSearchBarMode("");
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const responseRegardingSelectedComicData = await axios.get(
          `https://site--marvel-back--mn6tp6dgdm5w.code.run/comic?id=${id}`
        );

        console.log(responseRegardingSelectedComicData.data);

        const newData = {};
        newData.title = responseRegardingSelectedComicData.data.title;
        newData.description =
          responseRegardingSelectedComicData.data.description;

        setMyData(newData);
        setThumbnailUrl(
          `${responseRegardingSelectedComicData.data.thumbnail.path}.${responseRegardingSelectedComicData.data.thumbnail.extension}`
        );
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return isLoading ? (
    <div className="waiting">
      <img src={bouclier} alt="bouclier Captain America" />
    </div>
  ) : (
    <>
      <div className="container-comic">
        <img src={thumbnailUrl} alt={"name"} />
        <div className="recapitulatif">
          <p>
            <span>Titre: </span>
            {mydata.title}
          </p>
          <p>
            <span>Description: </span>
            {mydata.description}
          </p>
        </div>
      </div>
      {/* <div className="container-carrousel">
        <Carousel arrImages={arrImages} />
      </div> */}
    </>
  );
};

export default Comic;
