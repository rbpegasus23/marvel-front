const handleChangePage = (skipValue, setSkipValue, limitvalue) => {
  console.log(skipValue);
  setSkipValue((skipValue) =>
    (parseInt(skipValue) - parseInt(limitvalue)).toString()
  );
};

const ButtonPagingPrev = (props) => {
  // console.log("classPrev : ", props.className);
  return (
    <button
      className={props.className}
      onClick={() =>
        handleChangePage(props.skipValue, props.setSkipValue, props.limitvalue)
      }
    >
      PREV
    </button>
  );
};

export default ButtonPagingPrev;
