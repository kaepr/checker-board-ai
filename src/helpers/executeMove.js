import { cloneDeep } from 'lodash';
import { BOARD_SIZE, COMPUTER, PLAYER_1, PLAYER_2 } from '../constants';
import { getCleanBoard, getDirections, getInitialCellState, isValidDirection } from './utils';

const findCorrectDirection = (initX, initY, rowIndex, columnIndex, boardData, currentPlayer) => {
  const directions = getDirections(initX, initY, boardData, currentPlayer);

  // Find the correct direction of isActive Cell towards current cell

  let dir = [];
  directions.forEach((direction) => {
    if (isValidDirection(initX, initY, rowIndex, columnIndex, direction)) {
      dir = direction;
    }
  });

  return dir;
};

const createResponse = (boardData, hasAnotherJump) => {
  return {
    boardData,
    hasAnotherJump,
  };
};

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
  // Delete the enemy cell in the way ( if existing )

  const dir = findCorrectDirection(i, j, rowIndex, columnIndex, board, currentPlayer);

  const nextX = i + dir[0];
  const nextY = j + dir[1];

  // Original cell should now become empty
  // Original Cell is active should be false

  // TODO Maybe change this later when implementing forceful captures
  // Change position of cell to new index
  board[rowIndex][columnIndex] = {
    owner: board[i][j].owner,
    isKing: board[i][j].isKing,
    isValidNextMove: false,
    isActive: false,
  };

  if (nextX == rowIndex && columnIndex == nextY) {
    // this implies adjacent moved
  } else {
    // Capture is successful, make middle position empty
    board[nextX][nextY] = getInitialCellState();
  }

  // Reset the cell from which execution started
  board[i][j] = getInitialCellState();

  // Resets any remaining isValids, possible captures etc
  const cleanedBoard = getCleanBoard(board);

  // Check to see if any cell has become king or not
  // For Player 1 Cells
  // Check inside the 0'th row
  for (let i = 0; i < BOARD_SIZE; i += 1) {
    if (cleanedBoard[0][i].owner == PLAYER_1) {
      // Player 1 cells reached last position, make it king cell
      cleanedBoard[0][i].isKing = true;
    }
  }

  // For Player 2 / Computer Cells
  // Check inside the BOARD_SIZE -  1'th row
  for (let i = 0; i < BOARD_SIZE; i += 1) {
    if (cleanedBoard[BOARD_SIZE - 1][i].owner == (PLAYER_2 || COMPUTER)) {
      // Player 2 or comuters cells reached last position, make it king cell
      cleanedBoard[BOARD_SIZE - 1][i].isKing = true;
    }
  }

  return cleanedBoard;
};
