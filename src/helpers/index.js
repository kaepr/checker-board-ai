import _ from "lodash";

// Is click valid
const handleClick = () => {};

// Is move valid ( in which does he wanna place, check for validity )

const findMoves = (x, y, board) => {
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

  const copy = _.cloneDeep(board);
  
  
};

// is game won
