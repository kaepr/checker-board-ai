import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Board from './components/Board';
import MoveList from './components/MoveList';
import {
  changeTurnCountByAmount,
  changeWhoseTurn,
  initializeGame,
  selectBoard,
  selectCaptureMadeAt,
  selectKingMadeAt,
  selectLoading,
  selectMoveList,
  selectTurnCount,
  selectWhoseTurn,
  setBoard,
  setCaptureMadeAt,
  setKingMadeAt,
  setLoading,
} from './features/game/gameSlice';
import GameState from './components/GameState';
import { getGameState, highlightCapturingMoves } from './helpers';
import { CELLS_AMOUNT, COMPUTER, DEPTH, PLAYER_1, PLAYER_2 } from './constants';
import { RandomPlayer, MiniMaxPlayer } from './gameAgents';

const getAIFromName = (name) => {
  switch (name) {
    case RandomPlayer.name:
      return new RandomPlayer();
    case MiniMaxPlayer.name:
      return new MiniMaxPlayer(DEPTH);
    case ABPruningPlayer.name:
      return new ABPruningPlayer();
    default:
      return null;
  }
};

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [agentType, setAgentType] = useState('minimax');
  const agent = useRef(null);

  const dispatch = useDispatch();
  const board = useSelector(selectBoard);
  const moveList = useSelector(selectMoveList);
  const loading = useSelector(selectLoading);
  const currentPlayer = useSelector(selectWhoseTurn);
  const turnCount = useSelector(selectTurnCount);
  const lastKingMadeAt = useSelector(selectKingMadeAt);
  const lastCaptureMadeAt = useSelector(selectCaptureMadeAt);

  const [highlightedBoard, setHighlightedBoard] = useState(board);

  const initialize = () => {
    agent.current = getAIFromName(agentType);
    dispatch(
      initializeGame({
        againstWhom: COMPUTER,
      })
    );
    if (gameStarted) {
      setGameStarted(false);
    } else {
      setGameStarted(true);
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    if (board) {
      const boardWithCapureHighligted = highlightCapturingMoves(board, currentPlayer);
      setHighlightedBoard(boardWithCapureHighligted);
    }
  }, [board]);

  useEffect(() => {
    // console.log(agent.current);
    if (currentPlayer == COMPUTER) {
      let data;
      if (agent.current.name === MiniMaxPlayer.name) {
        data = agent.current.findNextMove(board, {
          turnCount,
          lkmat: lastKingMadeAt,
          lcat: lastCaptureMadeAt,
          player: currentPlayer,
        });
      } else {
        agent.current.updateInfo(board);
        data = agent.current.findNextMove();
      }

      // agent.current.makeNextMove();
      // const randPlayer = new RandomPlayer(board, CELLS_AMOUNT, 12);
      // randPlayer.updateInfo(board);

      if (data.kingMade) {
        dispatch(setKingMadeAt(turnCount));
      }

      if (data.captureMade) {
        dispatch(setCaptureMadeAt(turnCount));
      }

      dispatch(setBoard(data.board));
      dispatch(changeTurnCountByAmount(1));
      dispatch(changeWhoseTurn(PLAYER_1));
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
            value={agentType}
            onChange={(e) => setAgentType(e.target.value)}
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
