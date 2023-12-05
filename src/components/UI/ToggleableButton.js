import { useState } from "react";
import classes from "./ToggleableButton.module.css";

const ToggleButton = (props) => {

  const handleClick = () => {
    props.onClick();
  };

  return (
    <button
      className={`${classes["button"]} ${
        props.isToggled ? classes["button__toggled"] : null
      }`}
      onClick={handleClick}
    >
      {props.children}
    </button>
  );
};

export default ToggleButton;
