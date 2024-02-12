import Characters from "../../components/Character";
import { useState, useEffect } from "react";
import ButtonsPagging from "../../components/ButtonsPaging";
import ButtonPagingPrev from "../../components/ButtonPagingPrev";
import ButtonPagingNext from "../../components/ButtonPagingNext";
import bouclier from "../images/png/bouclierCaptain.png";

import axios from "axios";

const Character = ({
  setBckgroundMain,
  setSearchBarMode,
  filterOfCharacters,
  researchChanged,
  skipValueCharac,
  setSkipValueCharac,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [mydata, setMyData] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [limitvalue, setLimitvalue] = useState("50");
  const [currentIdButtonOfPaging, setCurrentIdButtonOfPaging] = useState(1);
  const [arrOfClassForButtonOfPaging, setArrOfClassForButtonOfPaging] =
    useState([]);

  const [countOfElements, setCountOfElements] = useState(0);

  useEffect(() => {
    setBckgroundMain("bkgroundMain-Character");
  }, []);

  useEffect(() => {
    setSearchBarMode("characters");
  }, []);

  useEffect(() => {
    console.log("skipCharacter : ", skipValueCharac);
  });

  useEffect(() => {
    if (filterOfCharacters) {
      const getNumberOfPages = async () => {
        try {
          const responseRegardingMarvelData = await axios.get(
            `https://site--marvel-back--mn6tp6dgdm5w.code.run/filterCharacter?name=${filterOfCharacters}&skipvalue=${skipValueCharac}&limitvalue=${limitvalue}`
          );
          setCountOfElements(responseRegardingMarvelData.data.count);

          setNumberOfPages(
            Math.ceil(responseRegardingMarvelData.data.count / limitvalue)
          );
        } catch (error) {
          console.log(error);
        }
      };

      getNumberOfPages();
    } else {
      //Je rajoute ce useEffect pour récupérer le count nombres d'éléments à jour de l'API au cas où des Characterss/comics etc...sont ajoutés à l'API entre temps.
      const getNumberOfPages = async () => {
        try {
          const responseRegardingMarvelData = await axios.get(
            `https://site--marvel-back--mn6tp6dgdm5w.code.run/allcharacters?skipvalue=${skipValueCharac}&limitvalue=${limitvalue}`
          );
          setCountOfElements(responseRegardingMarvelData.data.count);
          setNumberOfPages(
            Math.ceil(responseRegardingMarvelData.data.count / limitvalue)
          );
        } catch (error) {
          console.log(error);
        }
      };

      getNumberOfPages();
    }
  }, [researchChanged]);

  useEffect(() => {
    //Fait suite au précédent useEffect
    setArrOfClassForButtonOfPaging((prevArr) => {
      const arr = [true];
      for (let i = 1; i < numberOfPages; i++) {
        arr.push(false);
      }
      return arr;
    });
  }, [numberOfPages]);

  useEffect(() => {
    const newArrOfClassForButtonOfPaging = arrOfClassForButtonOfPaging.map(
      (element, index) => (index == currentIdButtonOfPaging - 1 ? true : false)
    );
    setArrOfClassForButtonOfPaging(newArrOfClassForButtonOfPaging);
  }, [currentIdButtonOfPaging]);

  useEffect(() => {
    if (filterOfCharacters) {
      const getData = async () => {
        try {
          const responseRegardingMarvelData = await axios.get(
            `https://site--marvel-back--mn6tp6dgdm5w.code.run/filterCharacter?name=${filterOfCharacters}&skipvalue=${skipValueCharac}&limitvalue=${limitvalue}`
          );

          console.log(responseRegardingMarvelData.data);
          setCountOfElements(responseRegardingMarvelData.data.count);

          const newData = [...responseRegardingMarvelData.data.results];
          setMyData(newData);
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      };
      getData();
    } else {
      const getData = async () => {
        try {
          const responseRegardingMarvelData = await axios.get(
            `https://site--marvel-back--mn6tp6dgdm5w.code.run/allcharacters?skipvalue=${skipValueCharac}&limitvalue=${limitvalue}`
          );

          console.log(responseRegardingMarvelData.data);
          setCountOfElements(responseRegardingMarvelData.data.count);

          const newData = [...responseRegardingMarvelData.data.results];
          setMyData(newData);
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      };
      getData();
    }
  }, [skipValueCharac, researchChanged]);

  const displayProducts = () => {
    return mydata.map((element) => (
      <Characters
        id={element._id}
        key={element._id}
        description={element.description}
        name={element.name.split(" (")[0]} // Quelques fois name contient un (element en plus) inutile vu que l'on veut que le nom
        imageUrl={`${element.thumbnail?.path ?? ""}.${
          element.thumbnail?.extension
        }`}
      />
    ));
  };
  return isLoading ? (
    <div className="waiting">
      <img src={bouclier} alt="bouclier Captain America" />
    </div>
  ) : (
    <>
      <div className="buttonOfPaging">
        <div>
          <div>
            <ButtonPagingPrev
              className={
                skipValueCharac !== "0"
                  ? "buttonPagingActivated rightToleft"
                  : "buttonPagingDesactivated"
              }
              skipValue={skipValueCharac}
              setSkipValue={setSkipValueCharac}
              limitvalue={limitvalue}
            />
          </div>
          <div>
            <ButtonPagingNext
              className={
                countOfElements >
                parseInt(skipValueCharac) + parseInt(limitvalue)
                  ? "buttonPagingActivated"
                  : "buttonPagingDesactivated"
              }
              skipValue={skipValueCharac}
              setSkipValue={setSkipValueCharac}
              limitvalue={limitvalue}
            />
          </div>
        </div>
      </div>

      <div className="container-products">{displayProducts()}</div>
      <div className="buttonOfPaging">
        <div>
          <div>
            <ButtonPagingPrev
              className={
                skipValueCharac !== "0"
                  ? "buttonPagingActivated rightToleft"
                  : "buttonPagingDesactivated"
              }
              skipValue={skipValueCharac}
              setSkipValue={setSkipValueCharac}
              limitvalue={limitvalue}
            />
          </div>
          <div>
            <ButtonPagingNext
              className={
                countOfElements >
                parseInt(skipValueCharac) + parseInt(limitvalue)
                  ? "buttonPagingActivated"
                  : "buttonPagingDesactivated"
              }
              skipValue={skipValueCharac}
              setSkipValue={setSkipValueCharac}
              limitvalue={limitvalue}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Character;
