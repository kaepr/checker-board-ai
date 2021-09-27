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

export const handleClick = (rowIndex, columnIndex, boardData, currentPlayer) => {
  const board = cloneDeep(boardData);
  const cellData = board[rowIndex][columnIndex];

  // This handles user click on an empty cell, and specifically on that empty cell who is confirmed to be not a valid next move
  if (cellData.owner === EMPTY && !cellData.isValidNextMove) {
    return createResponse(board, false);
  }

  // Or they clicked enemy cell, (and the cell was not empty)
  if (cellData.owner != currentPlayer && cellData.owner != EMPTY) {
    return createResponse(board, false);
  }

  // For all of current Player moves, get all capturables moves possible
  // [  [x1,y1], [x2,y2]  ]
  let allCapturablesMoves = [];
  let startPositions = [];
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

  startPositions.forEach((move) => {
    board[move[0]][move[1]].hasPossibleCapture = true;
  });

  console.log('all possible capturable move list', allCapturablesMoves);

  // TODO Finish Logic here
  if (allCapturablesMoves.length > 0) {
    // There is some capturable move avalaible
    if (allCapturablesMoves.some((move) => move[0] === rowIndex && move[1] === columnIndex)) {
      // User played a capturable move
      const newBoard = executeMove(rowIndex, columnIndex, board, currentPlayer);
      return createResponse(newBoard, true, true);
    }

    if (startPositions.some((move) => move[0] === rowIndex && move[1] === columnIndex)) {
      // User played a move which is a valid start position for a capturable move
      // So make it active, and show all capturable moves it has available

      for (let i = 0; i < BOARD_SIZE; i += 1) {
        for (let j = 0; j < BOARD_SIZE; j += 1) {
          board[i][j].isValidNextMove = false;
          board[i][j].isActive = false;
          board[i][j].hasPossibleCapture = false;
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
    }

    return createResponse(board, false, false);
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
  const highlighedBoard = highlightMoves(board, rowIndex, columnIndex, currentPlayer);
  return createResponse(highlighedBoard, true);
};
