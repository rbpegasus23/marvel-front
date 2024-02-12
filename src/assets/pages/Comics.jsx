import Comic from "../../components/Comic";
import { useState, useEffect } from "react";
import ButtonPagingNext from "../../components/ButtonPagingNext";
import ButtonPagingPrev from "../../components/ButtonPagingPrev";
import bouclier from "../images/png/bouclierCaptain.png";

import axios from "axios";

const Comics = ({
  setBckgroundMain,
  setSearchBarMode,
  researchChanged,
  filterOfComics,
  skipValueComics,
  setSkipValueComics,
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
    setBckgroundMain("bkgroundMain-Comic");
  }, []);

  useEffect(() => {
    console.log("skipComics : ", skipValueComics);
  });

  useEffect(() => {
    setSearchBarMode("comics");
  }, []);

  useEffect(() => {
    if (filterOfComics) {
      const getNumberOfPages = async () => {
        try {
          const responseRegardingMarvelData = await axios.get(
            `https://site--marvel-back--mn6tp6dgdm5w.code.run/filterComic?title=${filterOfComics}&skipvalue=${skipValueComics}&limitvalue=${limitvalue}`
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
      const getNumberOfPages = async () => {
        try {
          const responseRegardingMarvelData = await axios.get(
            `https://site--marvel-back--mn6tp6dgdm5w.code.run/allcomics?skipvalue=${skipValueComics}&limitvalue=${limitvalue}`
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
    if (filterOfComics) {
      const getData = async () => {
        try {
          const responseRegardingMarvelData = await axios.get(
            `https://site--marvel-back--mn6tp6dgdm5w.code.run/filterComic?title=${filterOfComics}&skipvalue=${skipValueComics}&limitvalue=${limitvalue}`
          );

          console.log("comics: ", responseRegardingMarvelData.data);
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
            `https://site--marvel-back--mn6tp6dgdm5w.code.run/allcomics?skipvalue=${skipValueComics}&limitvalue=${limitvalue}`
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
  }, [skipValueComics, researchChanged]);

  const displayProducts = () => {
    return mydata.map((element) => (
      <Comic
        id={element._id}
        key={element._id}
        description={element.description}
        title={
          element.title.includes(":")
            ? element.title.split(":")[0]
            : element.title.includes("(")
            ? element.title.split(" (")[0]
            : element.title
        } // Quelques fois title contient un (element en plus) inutile vu que l'on veut que le nom
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
                skipValueComics !== "0"
                  ? "buttonPagingActivated rightToleft"
                  : "buttonPagingDesactivated"
              }
              skipValue={skipValueComics}
              setSkipValue={setSkipValueComics}
              limitvalue={limitvalue}
            />
          </div>
          <div>
            <ButtonPagingNext
              className={
                countOfElements >
                parseInt(skipValueComics) + parseInt(limitvalue)
                  ? "buttonPagingActivated"
                  : "buttonPagingDesactivated"
              }
              skipValue={skipValueComics}
              setSkipValue={setSkipValueComics}
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
                skipValueComics !== "0"
                  ? "buttonPagingActivated rightToleft"
                  : "buttonPagingDesactivated"
              }
              skipValue={skipValueComics}
              setSkipValue={setSkipValueComics}
              limitvalue={limitvalue}
            />
          </div>
          <div>
            <ButtonPagingNext
              className={
                countOfElements >
                parseInt(skipValueComics) + parseInt(limitvalue)
                  ? "buttonPagingActivated"
                  : "buttonPagingDesactivated"
              }
              skipValue={skipValueComics}
              setSkipValue={setSkipValueComics}
              limitvalue={limitvalue}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Comics;
