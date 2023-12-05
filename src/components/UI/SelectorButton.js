import classes from "./SelectorButton.module.css";

const SelectorButton = (props) => {
  const clickHandler = () => {
    props.onClick();
  };

  return (
    <div
      onClick={clickHandler}
      className={`${classes["selector-button"]} ${
        props.selected ? classes["selected"] : null
      }`}
    >
      {props.children}
    </div>
  );
};

export default SelectorButton;
