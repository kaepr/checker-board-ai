import { cloneDeep, create } from 'lodash';
import { EMPTY, BOARD_SIZE } from '../constants';
import { findMoves, getCaptureMoves } from './findHelpers';
import { executeMove } from './executeMove';

const createResponse = (boardData, isSuccessful, wasExecuted = false) => {
  return {
    boardData,
    isSuccessful,
    wasExecuted,
  };
};

export const handleClick = (rowIndex, columnIndex, boardData, currentPlayer) => {
  const board = cloneDeep(boardData);

  // If the user clicks on empty space, or enemy's move, then ignore click

  const cellData = board[rowIndex][columnIndex];
  // Cell is not a valid next move position
  // Either they clicked empty cell
  if (cellData.owner === EMPTY && !cellData.isValidNextMove) {
    // This handles user click on an empty cell, and specifically on that empty cell who is confirmed to be not a valid next move
    return createResponse(board, false);
  }

  // Or they clicked enemy cell
  if (cellData.owner != currentPlayer && cellData.owner != EMPTY) {
    return createResponse(board, false);
  }

  // For call of current Player, of all capturables moves possible
  let allCapturablesMoves = [];
  for (let i = 0; i < BOARD_SIZE; i += 1) {
    for (let j = 0; j < BOARD_SIZE; j += 1) {
      const 
      const curCapturablesMoves = getCaptureMoves(i, j, board, currentPlayer);
    }
  }

  // Clicked on a cell whose is-valid-next-move is true
  // Now execute that move
  if (cellData.isValidNextMove) {
    const newBoard = executeMove(rowIndex, columnIndex, board, currentPlayer);

    return createResponse(newBoard, true, true);
  }

  // Now, user clicked on its own cell, this makes the cell active
  // This will show all the next possible valid positions from this cell
  // modify board adding cells which can be the next possible move

  // 1. make all previous is valid next move to false
  for (let i = 0; i < BOARD_SIZE; i += 1) {
    for (let j = 0; j < BOARD_SIZE; j += 1) {
      board[i][j].isValidNextMove = false;
      board[i][j].isActive = false;
    }
  }

  // 2. Set provided cell to be is active
  board[rowIndex][columnIndex].isActive = true;

  // 3. Find all the next valid moves for this cell
  const nextMoves = findMoves(rowIndex, columnIndex, board, currentPlayer);

  nextMoves.forEach((move) => {
    board[move[0]][move[1]].isValidNextMove = true;
  });

  return createResponse(board, true);
};
