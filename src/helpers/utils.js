import { EMPTY, BOARD_SIZE, PLAYER_1 } from '../constants';

export const getInitialCellState = () => {
  return {
    owner: EMPTY,
    isActive: false,
    isValidNextMove: false,
    isKing: false,
    hasPossibleCapture: false,
  };
};

/*
Get all directions for provided cell
*/
export const getDirections = (rowIndex, columnIndex, board, currentPlayer) => {
  let directions = [];
  if (currentPlayer == PLAYER_1) {
    directions.push([-1, -1]);
    directions.push([-1, 1]);
    if (board[rowIndex][columnIndex].isKing) {
      // Also check for backward position
      directions.push([1, -1]);
      directions.push([1, 1]);
    }
  } else {
    directions.push([1, -1]);
    directions.push([1, 1]);
    if (board[rowIndex][columnIndex].isKing) {
      // Also check for backward position
      directions.push([-1, -1]);
      directions.push([-1, 1]);
    }
  }
  return directions;
};

/*
Returns if it is possible to reach (destX,destY) from (srcX, srcY) using provided direction 
*/
export const isValidDirection = (initialX, initialY, destinationX, destinationY, direction) => {
  for (let i = 0; i < 2; i += 1) {
    initialX += direction[0];
    initialY += direction[1];

    if (!isValidIndex(initialX, initialY)) {
      return false;
    }

    if (initialX === destinationX && initialY === destinationY) {
      return true;
    }
  }

  return false;
};

export const isValidIndex = (row, col) => {
  if (row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE) {
    return true;
  }
  return false;
};
