import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { COMPUTER, PLAYER_2 } from '../constants';
import {
  selectTurnCount,
  selectWhoseTurn,
  selectBoard,
  selectLoading,
  selectKingMadeAt,
  selectCaptureMadeAt,
  selectOpponent,
} from '../features/game/gameSlice';
import { getGameState } from '../helpers';

const GameState = ({ gameStarted, gameFinished }) => {
  const whoseTurn = useSelector(selectWhoseTurn);
  const board = useSelector(selectBoard);
  const loading = useSelector(selectLoading);
  const currentPlayer = useSelector(selectWhoseTurn);
  const turnCount = useSelector(selectTurnCount);
  const lastKingMadeAt = useSelector(selectKingMadeAt);
  const lastCaptureMadeAt = useSelector(selectCaptureMadeAt);
  const opponent = useSelector(selectOpponent);

  const [cellCountOne, setCellCountOne] = useState(0);
  const [cellCountTwo, setCellCountTwo] = useState(0);
  const [opponentName, setOpponentName] = useState('Opponent');

  useEffect(() => {
    if (gameStarted) {
      console.log('opponent whom', opponent);
      const gameState = getGameState(board, turnCount, lastKingMadeAt, lastCaptureMadeAt, opponent);

      if (opponent === PLAYER_2) {
        setOpponentName('Player 2');
      }

      if (opponent === COMPUTER) {
        setOpponentName('Computer');
      }

      setCellCountOne(gameState.playerOneCount);

      if (opponent === PLAYER_2) {
        setCellCountTwo(gameState.playerTwoCount);
      }

      if (opponent === COMPUTER) {
        setCellCountTwo(gameState.computerCount);
      }
    }
  }, [board]);

  return (
    <div>
      <p>Game State : </p>
      <p>
        Whose Turn = {whoseTurn}, Turn Count = {turnCount}
      </p>
      <p>Player 1 Cells : {cellCountOne}</p>
      <p>
        {opponentName} Cells : {cellCountTwo}
      </p>

      {gameFinished && <div> Winner is {}</div>}
    </div>
  );
};

export default GameState;
