import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Board from './components/Board';
import MoveList from './components/MoveList';
import { initializeGame, selectBoard, selectMoveList } from './features/game/gameSlice';
import GameState from './components/GameState';

function App() {
  const dispatch = useDispatch();
  const board = useSelector(selectBoard);
  const moveList = useSelector(selectMoveList);

  const initialize = () => {
    dispatch(initializeGame());
  };

  useEffect(() => {
    dispatch(initializeGame());
  }, []);

  return (
    <div className="container">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1>Checkers</h1>
        <button className="btn-primary mt-4" onClick={initialize}>
          Reset
        </button>
      </div>
      <GameState />
      <div className="board-and-moves-container">
        <Board boardData={board} />
        <MoveList moveList={moveList} />
      </div>
    </div>
  );
}

export default App;
