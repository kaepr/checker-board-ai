import _ from 'lodash';
import { BOARD_SIZE, EMPTY, PLAYER_1 } from '../constants';
import { isValidDirection, isValidIndex, getInitialCellState } from './utils';

export const executeMove = (rowIndex, columnIndex, boardData, currentPlayer) => {
  // Find that one cell which has isActive flag set to true
  const board = _.cloneDeep(boardData);

  let i;
  let j;
  let found = false;
  for (i = 0; i < BOARD_SIZE; i++) {
    for (j = 0; j < BOARD_SIZE; j++) {
      if (board[i][j].isActive) {
        found = true;
        break;
      }
    }
    if (found) {
      break;
    }
  }

  // Go from (i,j) to (rowIndex, columnIndex)
  // Delete the enemy cell in the way

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

  console.log('di');

  let dir;
  directions.forEach((direction) => {
    if (isValidDirection(i, j, rowIndex, columnIndex, direction)) {
      dir = direction;
    }
  });

  // dir holds the direction we moved our piece to
  // delete the enemy cell in this direction

  // (i,j) = (i+1,j+1) = (i+2,j+2) = (rowIndex, columnIndex)

  const enemyX = i + dir[0];
  const enemyY = j + dir[1];

  // Original cell should now become empty
  // Original Cell is active should be false

  // board[rowIndex][columnIndex].owner = board[i][j].owner;
  // board[rowIndex][columnIndex].isKing = board[i][j].isKing;

  // TODO Something, while doing forceful check
  board[rowIndex][columnIndex] = {
    owner: board[i][j].owner,
    isKing: board[i][j].isKing,
    isValidNextMove: false,
    isActive: false,
  };

  // board[i][j].owner = EMPTY
  // board[i][j].isKing = false;

  if (enemyX == rowIndex && columnIndex == enemyY) {
    // this implies adjacent moved
  } else {
    board[enemyX][enemyY] = getInitialCellState();
  }

  board[i][j] = getInitialCellState();

  for (let i = 0; i < BOARD_SIZE; i += 1) {
    for (let j = 0; j < BOARD_SIZE; j += 1) {
      board[i][j].isValidNextMove = false;
      board[i][j].isActive = false;
    }
  }

  return board;
};
