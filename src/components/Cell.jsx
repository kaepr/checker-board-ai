import React from "react";
import { useDispatch } from "react-redux";
import { handlePlayerInput } from "../features/game/gameSlice";

const Cell = ({ data, xPosition, yPosition }) => {
  let cellColor;
  if ((xPosition + yPosition) % 2 == 0) {
    cellColor = "cell__dark";
  } else {
    cellColor = "cell__grey";
  }

  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.stopPropagation();
    console.log(xPosition, yPosition);
    dispatch(
      handlePlayerInput({
        moveCoordinates: [xPosition, yPosition],
      })
    );
  };

  return (
    <div className={"game__cell " + cellColor} onClick={(e) => handleClick(e)}>
      <div className="checker__piece" />
    </div>
  );
};

export default Cell;
