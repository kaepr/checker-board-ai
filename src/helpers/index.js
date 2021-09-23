import _ from "lodash";

// Is click valid
const handleClick = (rowIndex, columnIndex, boardData) => {
  const board = _.cloneDeep(boardData);
};

// Is move valid ( in which does he wanna place, check for validity )

/*
Assuming player has chosen his own cell
Show him all his possible next moves
*/
const findMoves = (rowIndex, columnIndex, boardData) => {
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
  const board = _.cloneDeep(boardData);

  

};

// is game won
