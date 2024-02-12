const handleChangePage = (skipValue, setSkipValue, limitvalue) => {
  console.log(parseInt(skipValue) + parseInt(limitvalue));
  setSkipValue((skipValue) =>
    (parseInt(skipValue) + parseInt(limitvalue)).toString()
  );
};

const ButtonPagingNext = (props) => {
  // console.log("classNext : ", props.className);
  return (
    <button
      className={props.className}
      onClick={() =>
        handleChangePage(props.skipValue, props.setSkipValue, props.limitvalue)
      }
    >
      NEXT
    </button>
  );
};

export default ButtonPagingNext;
