import React from 'react';
import { useSelector } from 'react-redux';
import { selectTurnCount, selectWhoseTurn } from '../features/game/gameSlice';

const GameState = () => {
  const whoseTurn = useSelector(selectWhoseTurn);
  const turnCount = useSelector(selectTurnCount);

  return (
    <div>
      <p>Game State : </p>
      Whose Turn = {whoseTurn}, Turn Count = {turnCount}
    </div>
  );
};

export default GameState;
