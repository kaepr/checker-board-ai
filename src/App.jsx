import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Board from './components/Board';
import MoveList from './components/MoveList';
import {
  changeWhoseTurn,
  initializeGame,
  selectBoard,
  selectLoading,
  selectMoveList,
  selectWhoseTurn,
  setLoading,
} from './features/game/gameSlice';
import GameState from './components/GameState';

function App() {
  const dispatch = useDispatch();
  const board = useSelector(selectBoard);
  const moveList = useSelector(selectMoveList);
  const loading = useSelector(selectLoading);

  const initialize = () => {
    // dispatch(setLoading(true));
    dispatch(initializeGame());
    // dispatch(changeWhoseTurn(1));
    // dispatch(setLoading(false));
  };

  useEffect(() => {
    initialize();
    // dispatch(setLoading(true));
  }, []);

  return (
    <div className="container">
      {loading && <div>App is loading right now</div>}
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
