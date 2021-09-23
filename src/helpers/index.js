import _ from "lodash";
import { EMPTY } from "../constants";

// Is click valid
const handleClick = (rowIndex, columnIndex, boardData, currentPlayer) => {
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
*/
const findMoves = (rowIndex, columnIndex, boardData, currentPlayer) => {
  /* 
  for king 
    (x-1,y-1)
    (x-1,y+1)
    (x+1,y-1)
    (x+1,y+1)

  for normal 
    (x+1,y-1)
    (x+1,y+1)
    */

  //for every cell check all the possible direction it can move
    //for normal cell the possible direction would be down and left or right
    //for king cell the possible direction would be up/down and left/right

  //store all the possible moves for each cell
    /* 
    check for adjacent moves
      if adjacent cell is not of bound and not occupied
        then add the cell to the list of possible moves
      
    check for jump moves
      check if king cell or not accordingly check for jumps
      if the active cell can capture any other enemy cell then add the cell to list of possible jump moves

    push all the moves into poossible moves
     */

  const board = _.cloneDeep(boardData);
};

const executeMove = (rowIndex, columnIndex, currentPlayer) => {};

// is game won
const isGameWon = () => {
  // Check if all cells are of one type
  // Check if user has any valid moves next or not
  // Check for draw conditions
};
