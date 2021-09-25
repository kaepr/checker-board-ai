import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectWhoseTurn, selectTurnCount } from '../features/game/gameSlice';

const GameState = () => {
  const whoseTurn = useSelector(selectWhoseTurn);
  const turnCount = useSelector(selectTurnCount);
  const dispatch = useDispatch();

  return (
    <div>
      <p>Game State : </p> 
      Whose Turn = {whoseTurn}, Turn Count = {turnCount}
    </div>
  );
};

export default GameState;
