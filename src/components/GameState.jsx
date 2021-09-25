import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectWhoseTurn } from '../features/game/gameSlice';

const GameState = () => {
  const whoseTurn = useSelector(selectWhoseTurn);
  const dispatch = useDispatch();

  return (
    <div>
      <p>Game State</p>
      Whose Turn = {whoseTurn}
    </div>
  );
};

export default GameState;
