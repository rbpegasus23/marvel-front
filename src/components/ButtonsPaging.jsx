import ButtonPaging from "./ButtonPaging";

const ButtonsPagging = ({
  setSkipValue,
  setCurrentIdButtonOfPaging,
  arrOfClassForButtonOfPaging,
  numberOfPages,
  limitvalue,
}) => {
  const arrIdButtons = [];

  for (let i = 0; i < numberOfPages; i++) {
    arrIdButtons.push(i);
  }
  return arrIdButtons.map((element) => {
    return (
      <ButtonPaging
        key={element}
        id={element}
        setSkipValue={setSkipValue}
        setCurrentIdButtonOfPaging={setCurrentIdButtonOfPaging}
        arrOfClassForButtonOfPaging={arrOfClassForButtonOfPaging}
        limitvalue={limitvalue}
      />
    );
  });
};

export default ButtonsPagging;
