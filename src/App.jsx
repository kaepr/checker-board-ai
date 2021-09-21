import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCount,
  increment,
  decrement,
} from "./features/counter/counterSlice";

import Board from "./components/Board";
import {
  initializeBoard,
  selectBoard,
  selectMoveList,
} from "./features/game/gameSlice";
import MoveList from "./components/MoveList";

function App() {
  const dispatch = useDispatch();
  const board = useSelector(selectBoard);
  const moveList = useSelector(selectMoveList);

  const initialize = () => {
    dispatch(initializeBoard());
  };

  useEffect(() => {
    dispatch(initializeBoard());
  }, []);

  return (
    <div className="container">
      <h1>Checkers</h1>
      <button className="btn-primary mt-4" onClick={initialize}>
        Reset
      </button>
      <div className="board-and-moves-container">
        <Board boardData={board} />
        <MoveList moveList={moveList} />
      </div>
    </div>
  );
}

export default App;
