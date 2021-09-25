import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PLAYER_1, PLAYER_2, COMPUTER, EMPTY } from '../constants';
import { handleClick } from '../helpers';
import {
  changeTurnCountByAmount,
  changeWhoseTurn,
  selectBoard,
  selectWhoseTurn,
  setBoard,
} from '../features/game/gameSlice';

const getCheckerPieceClass = (data) => {
  const classList = ['checker__piece'];

  if (data.owner === PLAYER_1) {
    classList.push('checker__piece--first');
  }

  if (data.owner === PLAYER_2) {
    classList.push('checker__piece--second');
  }

  if (data.owner === COMPUTER) {
    classList.push('checker__piece--second');
  }

  if (data.isKing && data.owner != EMPTY) {
    classList.push('checker__piece--king');
  }

  if (data.isActive) {
    classList.push('checker__piece--active');
  }

  if (data.isValidNextMove) {
    classList.push('checker__piece--valid_move');
  }

  return classList.join(' ');
};

const Cell = ({ data, xPosition, yPosition }) => {
  const checkerClassNames = useMemo(
    () => getCheckerPieceClass(data),
    [data.owner, data.isKing, data.isActive, data.isValidNextMove]
  );

  const dispatch = useDispatch();
  const board = useSelector(selectBoard);
  const whoseTurn = useSelector(selectWhoseTurn);

  const handlePlayerClick = (e) => {
    e.stopPropagation();

    console.log('data, positions', data, xPosition, yPosition);

    // if it fails, result will be falsy
    // else it will be the new game board

    const result = handleClick(xPosition, yPosition, board, whoseTurn);

    if (!result.isSuccessful) {
      return;
    }

    dispatch(setBoard(result.boardData));

    if (result.wasExecuted) {
      if (whoseTurn == PLAYER_1) {
        dispatch(changeWhoseTurn(PLAYER_2));
      } else if (whoseTurn == PLAYER_2) {
        dispatch(changeWhoseTurn(PLAYER_1));
      }

      dispatch(changeTurnCountByAmount(1));
    }

    // dispatch(
    //   handlePlayerInput({
    //     moveCoordinates: [xPosition, yPosition],
    //   })
    // );
  };

  return (
    <div
      className={`game__cell ${(xPosition + yPosition) % 2 == 0 ? 'cell__dark' : 'cell__grey'}`}
      onClick={handlePlayerClick}
    >
      <div className={checkerClassNames} />
    </div>
  );
};

export default Cell;
