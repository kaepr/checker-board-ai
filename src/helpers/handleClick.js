import { cloneDeep } from 'lodash';
import { getCapturablePositions } from '.';
import { EMPTY } from '../constants';
import { executeMove } from './executeMove';
import { highlightMoves } from './highlightMoves';

const createResponse = (boardData, isSuccessful, wasExecuted = false) => {
  return {
    boardData,
    isSuccessful,
    wasExecuted,
  };
};

export const handleClick = (rowIndex, columnIndex, boardData, currentPlayer) => {
  const board = cloneDeep(boardData);
  const cellData = board[rowIndex][columnIndex];

  // This handles user click on an empty cell, and specifically on that empty cell who is confirmed to be not a valid next move
  if (cellData.owner === EMPTY && !cellData.isValidNextMove) {
    return createResponse(board, false, false);
  }

  // Or they clicked on a cell not their own, (and the cell was not empty)
  if (cellData.owner != currentPlayer && cellData.owner != EMPTY) {
    return createResponse(board, false, false);
  }

  // Get all capturables moves possible for current player
  const { allCapturablesMoves, startPositions } = getCapturablePositions(board, currentPlayer);

  // Mark's all the capturing moves available
  // ? Wasn't used anywhere ?
  // startPositions.forEach((move) => {
  //   board[move[0]][move[1]].hasPossibleCapture = true;
  // });

  // If capturing positions are available, force the user to only play on those positions
  // If a capturing move has another capturing move available, user must play that to completion

  if (allCapturablesMoves.length > 0) {
    // There is some capturable move available

    // Check if any of those has 

    if (allCapturablesMoves.some((move) => move[0] === rowIndex && move[1] === columnIndex)) {
      // User played a capturable move

      const newBoard = executeMove(rowIndex, columnIndex, board, currentPlayer);
      return createResponse(newBoard, true, true);
    }

    if (startPositions.some((move) => move[0] === rowIndex && move[1] === columnIndex)) {
      // User played a move which is a valid start position for a capturable move
      // So make it active, and show all capturable moves it has available

      const highlighedBoard = highlightMoves(board, rowIndex, columnIndex, currentPlayer);
      return createResponse(highlighedBoard, true, false);
    }

    // User did not play on a cell who can be captured, or on a cell which was a start position
    // for some cell which could be captured
    // So basically ignore his click
    return createResponse(board, false, false);
  }

  // Clicked on a cell whose is-valid-next-move is true
  // This functions only runs when there is no capturing move available
  // Now execute that move
  if (cellData.isValidNextMove) {
    const newBoard = executeMove(rowIndex, columnIndex, board, currentPlayer);
    return createResponse(newBoard, true, true);
  }

  // If nothing above, user just clicked on his own cell
  // This will show all the next possible valid positions from this cell
  // modify board adding cells which can be the next possible move
  const highlighedBoard = highlightMoves(board, rowIndex, columnIndex, currentPlayer);
  return createResponse(highlighedBoard, true);
};
