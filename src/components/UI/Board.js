import { LABELED_SAMPLES_ALLOWED } from "../../util/constraints";
import classes from "./Board.module.css";

const Board = (props) => {
  const { array } = props;

  if (array.length <= LABELED_SAMPLES_ALLOWED) {
    let fontSizeClass = "sample__bigger__font";
    if (array.length > 35) {
      fontSizeClass = "sample__small__font";
    } else if (array.length > 20) {
      fontSizeClass = "sample__medium__font";
    } else if (array.length > 10) {
      fontSizeClass = "sample__big__font";
    }

    return (
      <div className={classes.board}>
        {array.map((sample, index) => {
          return (
            <div
              key={index}
              style={{
                height: `${sample.height}%`,
                width: `${100 / array.length}%`,
              }}
              className={`${classes.sample} ${classes[sample.style]} ${
                classes[fontSizeClass]
              }`}
            >
              {sample.height}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={classes.board}>
      {array.map((sample, index) => {
        return (
          <div
            key={index}
            style={{
              height: `${sample.height}%`,
              width: `${100 / array.length}%`,
            }}
            className={`${classes.sample} ${classes[sample.style]}`}
          />
        );
      })}
    </div>
  );
};

export default Board;
