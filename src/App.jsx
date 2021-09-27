import React, { useEffect, useState } from 'react';
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
import { highlightCapturingMoves } from './helpers';
import { COMPUTER } from './constants';

class RandomPlayer {};
class MiniMaxPlayer {};
class ABPruningPlayer {};

const getAIFromName = (name) => {
  switch (name) {
    case 'random':
      return new RandomPlayer();
  
    default:
      break;
  }
}

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const ai = useRef(null);
  
  const dispatch = useDispatch();
  const board = useSelector(selectBoard);
  const moveList = useSelector(selectMoveList);
  const loading = useSelector(selectLoading);
  const currentPlayer = useSelector(selectWhoseTurn);

  const [highlightedBoard, setHighlightedBoard] = useState(board);

  const initialize = () => {
    dispatch(initializeGame());
    if (gameStarted) {
      setGameStarted(false);
    } else {
      setGameStarted(true);
    }
    ai 
    // dispatch(setLoading(true));
    // dispatch(changeWhoseTurn(1));
    // dispatch(setLoading(false));
  };

  // useEffect(() => {
  //   initialize();
  // }, []);

  useEffect(() => {
    if (board) {
      const boardWithCapureHighligted = highlightCapturingMoves(board, currentPlayer);
      setHighlightedBoard(boardWithCapureHighligted);
    }
  }, [board]);

  useEffect(() => {
    if (currentPlayer == COMPUTER) {
      // call method
      // use handle click
    }
  }, [currentPlayer]);

  return (
    <div className="container">
      {loading && <div>App is loading right now</div>}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1>Checkers</h1>
        <div>
          <select
            style={{
              padding: '0.3rem',
              marginRight: '1rem',
              fontSize: '1rem',
              borderRadius: '0.25rem',
            }}
            disabled={gameStarted}
          >
            <option value="random">Random</option>
            <option value="minimax">MiniMax</option>
            <option value="abpruning">αβ Pruning</option>
          </select>
          <button className="btn-primary mt-4" onClick={initialize}>
            {gameStarted ? 'Reset' : 'Start'}
          </button>
        </div>
      </div>
      <GameState />
      <div className="board-and-moves-container">
        <Board boardData={highlightedBoard} />
        <MoveList moveList={moveList} />
      </div>
    </div>
  );
}

export default App;
