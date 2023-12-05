import Board from "./components/UI/Board.js";
import Selector from "./components/UI/Selector.js";
import Slider from "./components/UI/Slider.js";
import Button from "./components/UI/Button.js";
import { FaGithub } from "react-icons/fa";

import classes from "./App.module.css";
import { useEffect, useState } from "react";
import { getRandomArray } from "./util/util.js";

import {
  ALGORITHMS,
  ONE_ALGORITHM_MODE,
  MODES,
  INITIAL_NUMBER_OF_SAMPLES,
  MIN_NUMBER_OF_SAMPLES,
  MAX_NUMBER_OF_SAMPLES,
  MIN_SORTING_SPEED,
  MAX_SORTING_SPEED,
} from "./util/constraints.js";
import { getAlgorithmSteps } from "./util/SortingAlgorithms.js";
import ToggleableButton from "./components/UI/ToggleableButton.js";

function App() {
  const [selectedMode, setSelectedMode] = useState(0);
  const [algorithmStepsOfAlgorithmOne, setAlgorithmStepsOfAlgorithmOne] =
    useState([]);
  const [algorithmStepsOfAlgorithmTwo, setAlgorithmStepsOfAlgorithmTwo] =
    useState([]);
  const [animationIsRunning, setAnimationIsRunning] = useState(false);
  const [currentOfStepAlgorithmOne, setCurrentOfStepAlgorithmOne] = useState(0);
  const [currentOfStepAlgorithmTwo, setCurrentOfStepAlgorithmTwo] = useState(0);
  const [animationSpeed, setAnimationSpeed] = useState(200);

  const [arrayOne, setArrayOne] = useState([
    ...getRandomArray(INITIAL_NUMBER_OF_SAMPLES),
  ]);

  const [arrayTwo, setArrayTwo] = useState([
    ...getRandomArray(INITIAL_NUMBER_OF_SAMPLES),
  ]);

  const [selectedAlgorithms, setSelectedAlgorithms] = useState({
    first: 0,
    second: 0,
  });

  const changeNumberOfSamples = (numberOfSamples) => {
    const newArray = [...getRandomArray(numberOfSamples)];
    setArrayOne([...newArray]);
    setArrayTwo([...newArray]);
  };

  const changeAnimationSpeed = (selectedSpeed) => {
    setAnimationSpeed(MAX_SORTING_SPEED + MIN_SORTING_SPEED - selectedSpeed);
  };

  const handleModeChange = (newMode) => {
    if (animationIsRunning) return;
    setSelectedMode(newMode);
    if (newMode !== ONE_ALGORITHM_MODE) {
      setArrayTwo([
        ...arrayOne.map((sample) => {
          return {
            ...sample,
          };
        }),
      ]);
    }
  };

  const changeFirstAlgorithmHandler = (newAlgorithm) => {
    if (animationIsRunning) return;
    setSelectedAlgorithms((prevState) => {
      return {
        first: newAlgorithm,
        second: prevState.second,
      };
    });
  };

  const changeSecondAlgorithmHandler = (newAlgorithm) => {
    if (animationIsRunning) return;
    setSelectedAlgorithms((prevState) => {
      return {
        first: prevState.first,
        second: newAlgorithm,
      };
    });
  };

  const shuffleArray = () => {
    const newArray = [...getRandomArray(arrayOne.length)];
    setArrayOne([...newArray]);
    setArrayTwo([...newArray]);
  };

  const toggleAnimation = () => {
    setCurrentOfStepAlgorithmOne(0);
    setCurrentOfStepAlgorithmTwo(0);
    if (animationIsRunning) {
      setAnimationIsRunning(false);
      return;
    }

    setAnimationIsRunning(true);
    setAlgorithmStepsOfAlgorithmOne(
      getAlgorithmSteps[selectedAlgorithms.first]([...arrayOne])
    );

    if (selectedMode !== ONE_ALGORITHM_MODE) {
      setAlgorithmStepsOfAlgorithmTwo(
        getAlgorithmSteps[selectedAlgorithms.second]([...arrayTwo])
      );
    }
  };

  useEffect(() => {
    if (!animationIsRunning) return () => {};
    const timer = setInterval(() => {
      if (selectedMode === ONE_ALGORITHM_MODE) {
        if (currentOfStepAlgorithmOne < algorithmStepsOfAlgorithmOne.length) {
          setCurrentOfStepAlgorithmOne((prevStep) => {
            return Math.min(
              prevStep + 1,
              algorithmStepsOfAlgorithmOne.length - 1
            );
          });
        }

        if (
          currentOfStepAlgorithmOne ===
          algorithmStepsOfAlgorithmOne.length - 1
        ) {
          setAnimationIsRunning(false);
          setArrayOne(algorithmStepsOfAlgorithmOne[currentOfStepAlgorithmOne]);
        }
      } else {
        if (currentOfStepAlgorithmOne < algorithmStepsOfAlgorithmOne.length) {
          setCurrentOfStepAlgorithmOne((prevStep) => {
            return Math.min(
              prevStep + 1,
              algorithmStepsOfAlgorithmOne.length - 1
            );
          });
        }

        if (currentOfStepAlgorithmTwo < algorithmStepsOfAlgorithmTwo.length) {
          setCurrentOfStepAlgorithmTwo((prevStep) => {
            return Math.min(
              prevStep + 1,
              algorithmStepsOfAlgorithmTwo.length - 1
            );
          });
        }

        if (
          currentOfStepAlgorithmOne ===
            algorithmStepsOfAlgorithmOne.length - 1 &&
          currentOfStepAlgorithmTwo === algorithmStepsOfAlgorithmTwo.length - 1
        ) {
          setAnimationIsRunning(false);
          setArrayOne(algorithmStepsOfAlgorithmOne[currentOfStepAlgorithmOne]);
          setArrayTwo(algorithmStepsOfAlgorithmTwo[currentOfStepAlgorithmTwo]);
        }
      }
    }, animationSpeed);

    return () => {
      clearInterval(timer);
    };
  }, [
    animationIsRunning,
    animationSpeed,
    currentOfStepAlgorithmOne,
    algorithmStepsOfAlgorithmOne,
    currentOfStepAlgorithmTwo,
    algorithmStepsOfAlgorithmTwo,
    selectedMode,
  ]);

  return (
    <>
      <nav className={classes["tool-box"]}>
        <ul>
          <li>
            <a
              href="https://github.com/diegoZarateFer/Sorting-Algorithms-Visualizer"
              target="_blank"
            >
              <FaGithub color="white" size={30}/>
              {/* <img src={gitIcon} alt="Project´s Repository" width="30px" /> */}
            </a>
          </li>

          <li>
            <Selector
              options={MODES}
              selectedIndex={selectedMode}
              onChange={handleModeChange}
            />
          </li>

          <li>
            <Slider
              legend={`Speed: ${animationSpeed} ms`}
              value={MIN_SORTING_SPEED + MAX_SORTING_SPEED - animationSpeed}
              min={MIN_SORTING_SPEED}
              max={MAX_SORTING_SPEED}
              onChange={changeAnimationSpeed}
            />
          </li>

          <li>
            <Slider
              legend={`Samples: ${arrayOne.length}`}
              value={arrayOne.length}
              disabled={animationIsRunning}
              min={MIN_NUMBER_OF_SAMPLES}
              max={MAX_NUMBER_OF_SAMPLES}
              onChange={changeNumberOfSamples}
            />
          </li>

          <li>
            <Button disabled={animationIsRunning} onClick={shuffleArray}>
              Shuffle
            </Button>
          </li>

          <li>
            <ToggleableButton
              onClick={toggleAnimation}
              isToggled={animationIsRunning}
            >
              {animationIsRunning ? "Stop" : "Sort"}
            </ToggleableButton>
          </li>
        </ul>
      </nav>

      <div className={classes["algortihm-selector-container"]}>
        <Selector
          options={ALGORITHMS}
          selectedIndex={selectedAlgorithms.first}
          onChange={changeFirstAlgorithmHandler}
        />
        {selectedMode !== ONE_ALGORITHM_MODE && (
          <Selector
            options={ALGORITHMS}
            selectedIndex={selectedAlgorithms.second}
            onChange={changeSecondAlgorithmHandler}
          />
        )}
      </div>

      <div className={classes["board-container"]}>
        <Board
          array={
            animationIsRunning
              ? algorithmStepsOfAlgorithmOne[currentOfStepAlgorithmOne]
              : arrayOne
          }
        />
        {selectedMode !== ONE_ALGORITHM_MODE && (
          <Board
            array={
              animationIsRunning
                ? algorithmStepsOfAlgorithmTwo[currentOfStepAlgorithmTwo]
                : arrayTwo
            }
          />
        )}
      </div>
    </>
  );
}

export default App;
