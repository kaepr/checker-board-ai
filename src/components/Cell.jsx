import React from "react";
import { useDispatch } from "react-redux";
import { handlePlayerInput } from "../features/game/gameSlice";
import { PLAYER_1, PLAYER_2, COMPUTER } from "../constants";

const getCheckerPiece = (owner) => {
  switch (owner) {
    case PLAYER_1:
      return <div className="checker__piece checker__piece--first" />;
    case PLAYER_2:
      return <div className="checker__piece checker__piece--second" />;
    case COMPUTER:
      return <div className="checker__piece checker__piece--computer" />;
    default:
      return null;
  }
};

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
    dispatch(
      handlePlayerInput({
        moveCoordinates: [xPosition, yPosition],
      })
    );
  };

  return (
    <div className={"game__cell " + cellColor} onClick={handleClick}>
      {getCheckerPiece(data.owner)}
    </div>
  );
};

export default Cell;
