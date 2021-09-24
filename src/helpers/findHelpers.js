import { EMPTY } from "../constants";
import _ from 'lodash';
import { isValidIndex, isValidDirection } from ".";

export const getCaptureMoves = (rowIndex, columnIndex, board, directions, currentPlayer) => {
  const possibleCaptureMoves = [];
  for (let i = 0; i < directions.length; i++) {
    const midX = rowIndex + directions[i][0];
    const midY = columnIndex + directions[i][1];

    const destX = rowIndex + directions[i][0] * 2;
    const destY = columnIndex + directions[i][1] * 2;

    if (isValidIndex(destX, destY) && isValidIndex(midX, midY)) {
      const destinationCell = board[destX][destY];
      const middleCell = board[midX][midY];
      const isMiddleEnemy = middleCell.owner != currentPlayer && middleCell.owner != EMPTY;

      if (destinationCell.owner == EMPTY && isMiddleEnemy) {
        possibleCaptureMoves.push([destX, destY]);
      }
    }
  }
  return possibleCaptureMoves;
};

export const getAdjacentMoves = (rowIndex, columnIndex, board, directions) => {
  let moves = [];

  for (let i = 0; i < directions.length; i++) {
    const destX = rowIndex + directions[i][0];
    const destY = columnIndex + directions[i][1];

    if (isValidIndex(destX, destY)) {
      const destinationCell = board[destX][destY];
      if (destinationCell.owner == EMPTY) {
        moves.push([destX, destY]);
      }
    }
  }

  return moves;
};


/*
Assuming player has chosen his own cell
Show him all his possible next moves

Returns an array of the next possible moves for provided indexes
*/


export const findMoves = (rowIndex, columnIndex, boardData, currentPlayer) => {
 
  let possibleMoves = [];
  const board = _.cloneDeep(boardData);

  let directions = [
    [-1, -1],
    [-1, 1],
  ];

  if (board[rowIndex][columnIndex].isKing) {
    // Also check for backward position
    directions.push([1, -1]);
    directions.push([1, 1]);
  }
  //adjacent moves
  const adjMoves = getAdjacentMoves(rowIndex, columnIndex, board, directions);

  //capture moves
  const capMoves = getCaptureMoves(rowIndex, columnIndex, board, directions, currentPlayer);

  possibleMoves = [...adjMoves, ...capMoves];


  return possibleMoves;
};
