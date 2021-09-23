import _ from 'lodash';
import { EMPTY, BOARD_SIZE, PLAYER_1 } from '../constants';
import { getAdjacentMoves, getCaptureMoves } from './findHelpers';

const getInitiaCellState = () => {
  return {
    owner: EMPTY,
    isActive: false,
    isValidNextMove: false,
    isKing: false,
  };
};

export const handleClick = (rowIndex, columnIndex, boardData, currentPlayer) => {
  const board = _.cloneDeep(boardData);

  // If the user clicks on empty space, or enemy's move, then ignore click

  const cellData = board[rowIndex][columnIndex];

  // Cell is not a valid next move position
  // Either they clicked empty cell

  if (cellData.owner === EMPTY && !cellData.isValidNextMove) {
    // This handles user click on an empty cell, and specifically on that empty cell who is confirmed to be not a valid next move
    return board;
  }
  // Or they clicked enemy cell
  if (cellData.owner != currentPlayer) {
    return board;
  }

  // Now, user clicked on its own cell,
  // This will show all the next possible valid positions from this cell
  // modify board adding cells which can be the next possible move

  // Clicked on a cell whose is valid next move is true
};

// Is move valid ( in which does he wanna place, check for validity )

/*
Assuming player has chosen his own cell
Show him all his possible next moves

Returns an array of the next possible moves for provided indexes
*/
// function getCaptureMoves(rowIndex, columnIndex, board, directions, currentPlayer) {
//   const possibleCaptureMoves = [];
//   for (let i = 0; i < directions.length; i++) {
//     const midX = rowIndex + directions[i][0];
//     const midY = columnIndex + directions[i][1];

//     const destX = rowIndex + directions[i][0] * 2;
//     const destY = columnIndex + directions[i][1] * 2;

//     if (isValidIndex(destX, destY) && isValidIndex(midX, midY)) {
//       const destinationCell = board[destX][destY];
//       const middleCell = board[midX][midY];
//       const isMiddleEnemy = middleCell.owner != currentPlayer && middleCell.owner != EMPTY;

//       if (destinationCell.owner == EMPTY && isMiddleEnemy) {
//         possibleCaptureMoves.push([destX, destY]);
//       }
//     }
//   }
//   return possibleCaptureMoves;
// }

// function getAdjacentMoves(rowIndex, columnIndex, board, directions) {
//   let moves = [];

//   for (let i = 0; i < directions.length; i++) {
//     const destX = rowIndex + directions[i][0];
//     const destY = columnIndex + directions[i][1];

//     if (isValidIndex(destX, destY)) {
//       const destinationCell = board[destX][destY];
//       if (destinationCell.owner == EMPTY) {
//         moves.push([destX, destY]);
//       }
//     }
//   }

//   return moves;
// }

export const findMoves = (rowIndex, columnIndex, boardData, currentPlayer) => {
  let possibleMoves = [];
  const board = _.cloneDeep(boardData);

  let directions = [
    [-1, -1],
    [-1, 1],
  ];

  if (board[i][j].isKing) {
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
  //store all the possible moves for each cell
  /* 
    check for adjacent moves
      if adjacent cell is not of bound and not occupied
        then add the cell to the list of possible moves
      
    check for jump moves
      check if king cell or not accordingly check for jumps
      if the active cell can capture any other enemy cell then add the cell to list of possible jump moves

    check for multiple jump moves
      if the double jump moves are possible and the space is free then add the cell to another list 
         make a counter for checking if the multiple jumps is possible 
    
    if multiple jumps found then call this function on those cells to get more moves
    
    
      
    push all the moves into possible moves
     */
};

export const executeMove = (rowIndex, columnIndex, boardData, currentPlayer) => {
  // Find that one cell which has isActive flag set to true
  const board = _.cloneDeep(boardData);
  let i;
  let j;
  let found;
  for (i = 0; i < BOARD_SIZE; i++) {
    for (j = 0; j < BOARD_SIZE; j++) {
      if (board[i][j].isActive) {
        found = true;
        break;
      }
    }
  }

  if (!found) {
    return board;
  }

  // Go from (i,j) to (rowIndex, columnIndex)
  // Delete the enemy cell in the way

  let directions = [
    [-1, -1],
    [-1, 1],
  ];

  if (board[i][j].isKing) {
    // Also check for backward position
    directions.push([1, -1]);
    directions.push([1, 1]);
  }

  let dir;
  directions.forEach((direction) => {
    if (isValidDirection(i, j, rowIndex, columnIndex, direction)) {
      dir = direction;
    }
  });

  // dir holds the direction we moved our piece to
  // delete the enemy cell in this direction

  const enemyX = i + dir[0];
  const enemyY = j + dir[1];

  // Original cell should now become empty
  // Original Cell is active should be false

  board[rowIndex][columnIndex].owner = board[i][j].owner;
  board[rowIndex][columnIndex].isKing = board[i][j].isKing;

  board[i][j] = getInitiaCellState();

  // Enemy cell should be deleted
  board[enemyX][enemyY] = getInitiaCellState();

  // Final cell set player
  // Final cell set is valid

  board[rowIndex][columnIndex].isValidNextMove = false;

  // TODO Maybe change this to true later
  board[rowIndex][columnIndex].isActive = false;
};

/*
Returns if it is possible to reach (destX,destY) from (srcX, srcY) using provided direction 
*/
const isValidDirection = (initialX, initialY, destinationX, destinationY, direction) => {
  for (let i = 0; i < 2; i += 1) {
    initialX += direction[0];
    initialY += direction[1];

    if (!isValidIndex(initialX, initialY)) {
      return false;
    }

    if (initialX === destinationX && initialY == destinationY) {
      return true;
    }
  }

  return false;
};

const isValidIndex = (row, col) => {
  if (row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE) {
    return true;
  }
  return false;
};

// is game won
export const isGameWon = () => {
  // Check if all cells are of one type
  // Check if user has any valid moves next or not
  // Check for draw conditions
};
