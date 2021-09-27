import { cloneDeep } from 'lodash';
import { BOARD_SIZE, EMPTY } from '../constants';
import { executeMove } from './executeMove';
import { findMoves, getCaptureMoves } from './findHelpers';
import { highlightMoves } from './highlightMoves';
import { getDirections } from './utils';

const createResponse = (boardData, isSuccessful, wasExecuted = false) => {
  return {
    boardData,
    isSuccessful,
    wasExecuted,
  };
};

export const getCapturablePositions = (board, currentPlayer) => {
  console.log('current board ', board, currentPlayer);

  let allCapturablesMoves = [];
  let startPositions = [];

  if (board.length === 0) {
    return { allCapturablesMoves, startPositions };
  }

  for (let i = 0; i < BOARD_SIZE; i += 1) {
    for (let j = 0; j < BOARD_SIZE; j += 1) {
      if (board[i][j].owner === currentPlayer) {
        // Finds all the indexes on which it can capture
        const directions = getDirections(i, j, board, currentPlayer);
        const curCapturablesMoves = getCaptureMoves(i, j, board, directions, currentPlayer);
        if (curCapturablesMoves.length > 0) {
          startPositions.push([i, j]);
          allCapturablesMoves = [...allCapturablesMoves, ...curCapturablesMoves];
        }
      }
    }
  }

  return { allCapturablesMoves, startPositions };
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
  startPositions.forEach((move) => {
    board[move[0]][move[1]].hasPossibleCapture = true;
  });

  // If capturing positions are available, force the user to only play on those positions
  // If a capturing move has a another capturing move available, user must play that to completion

  if (allCapturablesMoves.length > 0) {
    // There is some capturable move available
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
