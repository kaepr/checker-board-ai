import React from "react";

const MoveList = ({ moveList }) => {
  console.log(moveList);
  return (
    <div className="moves__list">
      {moveList.map((x, index) => {
        return (
          <div className="move__info" key={index}>
            Player played at Player played at Player played at Player played at
            ( {x[0]}, {x[1]} )
          </div>
        );
      })}
    </div>
  );
};

export default MoveList;
