const ButtonPaging = (props) => {
  const handleChangePage = (setSkipValue) => {
    console.log(props.id + 1);
    const newValueOfElementSkiped = props.id * parseInt(props.limitvalue);
    props.setCurrentIdButtonOfPaging(props.id + 1);
    setSkipValue(newValueOfElementSkiped.toString());
  };
  return (
    <button
      className={
        props.arrOfClassForButtonOfPaging[props.id]
          ? "buttonOfPagingSelected"
          : "buttonOfPagingDeSelected"
      }
      onClick={() => handleChangePage(props.setSkipValue)}
    >
      {props.id + 1}
    </button>
  );
};

export default ButtonPaging;
