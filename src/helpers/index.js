import _ from 'lodash';
import { EMPTY, BOARD_SIZE, PLAYER_1, PLAYER_2, COMPUTER } from '../constants';
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

  // Clicked on a cell whose is-valid-next-move is true
  // Now execute that move
  if(cellData.isValidNextMove) {

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

  // for()



};

// Is move valid ( in which does he wanna place, check for validity )

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

// {
//   isGameDraw: false,
//   player1Won: false,
// }
export const isGameWon = (boardData, currentPlayer) => {
  // Check if all cells are of one type
  const board = _.cloneDeep(boardData);
  let player1Pieces = 0;
  let player2Pieces = 0;
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      if (board[i][j].owner == PLAYER_1)
        player1Pieces++;
      if (board[i][j].owner != EMPTY || board[i][j].owner == (PLAYER_2 || COMPUTER))
        player2Pieces++;
    }
  }
  //TODO return object 
  if (player1Pieces == 0) {
    return PLAYER_2;
  }
  if (player2Pieces == 0) {
    return PLAYER_1;
  }
  // Check if current player has any valid moves next or not
  let possibleMovesP1 = false;
  let possibleMovesP2 = false;
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      if (board[i][j].owner == PLAYER_1 && !possibleMovesP1) {
        let possMoves = findMoves(i, j, board, PLAYER_1);
        if (possMoves.length > 0) {
          possibleMovesP1 = true;
        }
      }

      if (board[i][j].owner == (PLAYER_2 || COMPUTER) && !possibleMovesP2) {
        let possMoves = findMoves(i, j, board, PLAYER_2);
        if (possMoves.length > 0) {
          possibleMovesP2 = true;
        }
      }
    }
  }
  if (currentPlayer == PLAYER_1 && !possibleMovesP1)
    return PLAYER_2;
  else if ((currentPlayer == PLAYER_2 || COMPUTER) && !possibleMovesP2)
    return PLAYER_1;


  // Check for draw conditions
  

  /*  
    win conditions
      1. all the pieces of opponent are captured
      2. opponent can't make a valid move 

    draw conditions
      1. Neither player has advanced an uncrowned man towards the king-row during the previous 50 moves
      2. No pieces have been removed from the board during the previous 50 moves.
  */

};
