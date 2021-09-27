import { cloneDeep } from 'lodash';
import { getCleanBoard } from './utils';
import { findMoves } from './findHelpers';

/*
Highlights the next possible moves for the given cell
*/
export const highlightMoves = (boardData, rowIndex, columnIndex, currentPlayer) => {
  const board = cloneDeep(boardData);

  // 1. Clean up the board
  const cleanedBoard = getCleanBoard(board);

  // 2. Set provided cell to be is active
  cleanedBoard[rowIndex][columnIndex].isActive = true;

  // 3. Find all the next valid moves for this cell
  const nextMoves = findMoves(rowIndex, columnIndex, cleanedBoard, currentPlayer);

  nextMoves.forEach((move) => {
    cleanedBoard[move[0]][move[1]].isValidNextMove = true;
  });

  return cleanedBoard;
};
