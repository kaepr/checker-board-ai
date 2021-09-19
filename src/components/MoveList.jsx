import React from "react";

const MoveList = ({ moveList }) => {
  console.log(moveList);

  return (
    <div className="move__list">
      {moveList.map((x, index) => {
        return (
          <div className="move__info" key={index}>
            Player played 12312 at ( {x[0]}, {x[1]} )
          </div>
        );
      })}
    </div>
  );
};

export default MoveList;
