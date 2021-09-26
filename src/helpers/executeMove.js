import { cloneDeep } from 'lodash';
import { BOARD_SIZE, EMPTY, PLAYER_1, COMPUTER, PLAYER_2 } from '../constants';
import { isValidDirection, isValidIndex, getInitialCellState, getDirections } from './utils';

export const executeMove = (rowIndex, columnIndex, boardData, currentPlayer) => {
  // Find that one cell which has isActive flag set to true
  const board = cloneDeep(boardData);

  let i, j;
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

  const directions = getDirections(i, j, board, currentPlayer);

  let dir;
  directions.forEach((direction) => {
    if (isValidDirection(i, j, rowIndex, columnIndex, direction)) {
      dir = direction;
    }
  });

  console.log('final correct direction', dir);

  // dir holds the direction we moved our piece to
  // delete the enemy cell in this direction

  // (i,j) = (i+1,j+1) = (i+2,j+2) = (rowIndex, columnIndex)

  const enemyX = i + dir[0];
  const enemyY = j + dir[1];

  // Original cell should now become empty
  // Original Cell is active should be false

  // board[rowIndex][columnIndex].owner = board[i][j].owner;
  // board[rowIndex][columnIndex].isKing = board[i][j].isKing;

  // TODO Maybe change this later when implementing forceful captures
  board[rowIndex][columnIndex] = {
    owner: board[i][j].owner,
    isKing: board[i][j].isKing,
    isValidNextMove: false,
    isActive: false,
  };

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
      board[i][j].hasPossibleCapture = false;
    }
  }

  // Check to see if any cell has become king or not
  // For Player 1 Cells
  // Check inside the 0'th row
  for (let i = 0; i < BOARD_SIZE; i += 1) {
    if (board[0][i].owner == PLAYER_1) {
      // Player 1 cells reached last position, make it king cell
      board[0][i].isKing = true;
    }
  }

  // For Player 2 / Computer Cells
  // Check inside the BOARD_SIZE -  1'th row
  for (let i = 0; i < BOARD_SIZE; i += 1) {
    if (board[BOARD_SIZE - 1][i].owner == (PLAYER_2 || COMPUTER)) {
      // Player 2 or comuters cells reached last position, make it king cell
      board[BOARD_SIZE - 1][i].isKing = true;
    }
  }

  return board;
};
