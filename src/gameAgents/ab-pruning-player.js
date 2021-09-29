// import { cloneDeep } from 'lodash';
// import { PLAYER_1, COMPUTER, DEPTH } from '../constants';
// import {
//   findMoves,
//   // getDiscPositions,
//   executeMove,
//   getGameState,
//   getCapturablePositions,
// } from '../helpers';

// const calculateUtility = (board) => {
//   let playerDiscs = 0;
//   let aiDiscs = 0;
//   let playerKings = 0;
//   let aiKings = 0;

//   for (const row in board) {
//     for (const { owner, isKing } in row) {
//       if (owner == PLAYER_1) {
//         if (isKing) {
//           playerKings++;
//         } else {
//           playerDiscs++;
//         }
//       } else {
//         if (isKing) {
//           aiKings++;
//         } else {
//           aiDiscs++;
//         }
//       }
//     }
//   }

//   return (aiKings - playerKings) * 2 + (aiDiscs - playerDiscs);
// };

// class MiniMaxPlayer {
//   static name = 'minimax';

//   /**
//    * @param {number[][]} board
//    * @param {number} depth
//    * @param {boolean} isMin
//    *
//    * @returns {}
//    */
//   minimax = (_board, depth, isMin, turnCount, lkmat, lcat, player) => {
//     const state = getGameState(board, turnCount, lkmat, lcat, player);
//     if (depth == 0 || state.isGameWon || state.isGameDraw) {
//       return [calculateUtility(board), board, turnCount, lkmat, lcat];
//     }

//     const board = cloneDeep(_board);
//     if (isMin) {
//       let bestMoveBoard;
//       let minUtility = Number.POSITIVE_INFINITY;
//       // we're checking all the next possible moves
//       for (const bestMoveBoardCandidate in this.getAllBoards(bestMoveBoardCandidate, COMPUTER)) {
//         // for ith possible move, we're checking for the next depth - 1 moves
//         let nlkmat = lkmat;
//         let nlcat = lcat;
//         if (bestMoveBoardCandidate.kingMade) {
//           nklmat = turnCount;
//         }

//         if (bestMoveBoardCandidate.captureMade) {
//           nlcat = turnCount;
//         }

//         utility = this.minimax(
//           bestMoveBoardCandidate.board,
//           depth - 1,
//           !isMin,
//           turnCount + 1,
//           nlkmat,
//           nlcat,
//           PLAYER_1
//         )[0];

//         // we're updating the min utility
//         minUtility = Math.min(minUtility, utility);
//         // if the minUtility is same as utility, that means we have our best move board
//         if (minUtility == utility) {
//           bestMoveBoard = bestMoveBoardCandidate.board;
//         }
//       }
//       return [minUtility, bestMoveBoard, turnCount];
//     } else {
//       let bestMoveBoard;
//       let maxUtility = Number.NEGATIVE_INFINITY;
//       for (const board in this.getAllBoards(board, PLAYER_1)) {
//         utility = this.minimax(board, depth - 1, !isMin)[0];
//         maxUtility = Math.max(maxUtility, utility);
//         if (maxUtility == utility) {
//           bestMoveBoard = board;
//         }
//       }
//       return [maxUtility, bestMoveBoard];
//     }
//   };

//   /**
//    * Returns the next board positions for all player's valid next moves
//    * If there are some which have captures available, then only find the next boards
//    * for those specific cells
//    * @param {number[][]} board
//    * @param {number} player
//    *
//    * @returns {number[][]}
//    */
//   getAllBoards = (_board, player) => {
//     const board = cloneDeep(_board);

//     const boards = [];

//     const { allCapturablesMoves, startPositions } = getCapturablePositions(board, COMPUTER);

//     let totalPositions;

//     if (allCapturablesMoves.length > 0) {
//       // some move exists which can capture
//       // So only play from that
//       totalPositions = startPositions;
//     } else {
//       totalPositions = getDiscPositions(board, player);
//     }

//     for (const piece in totalPositions) {
//       const [i, j] = piece;
//       const validMoves = findMoves(i, j, board, player);

//       for (const move in validMoves) {
//         const boardCopy = cloneDeep(board);
//         let moveExecuted = false;
//         let destX = move[0];
//         let destY = move[1];
//         let kingMade = false;
//         let captureMade = false;

//         while (!moveExecuted) {
//           const executeResponse = executeMove(destX, destY, boardCopy, COMPUTER);

//           // Update board with new info
//           boardCopy = executeResponse.boardData;

//           if (executeResponse.captureMade) {
//             captureMade = true;
//             //make the current cell active
//           }

//           if (executeResponse.kingMade) {
//             kingMade = true;
//             //make the current cell active
//           }

//           if (executeResponse.hasAnotherJump) {
//             // Keep repeating steps
//             // Need to update to which index should the next execution be
//             // board[destX][destY].hasAnotherJump = true

//             // Find next moves for this cell
//             const nxtMoves = findMoves(destX, destY, boardCopy, COMPUTER);

//             // Update new final capture position ( multiple jump case )

//             boardCopy[destX][destY].isActive = true;

//             destX = nxtMoves[0][0];
//             destY = nxtMoves[0][1];
//           }

//           if (!executeResponse.hasAnotherJump) {
//             moveExecuted = true;
//           }

//           if (moveExecuted) {
//             break;
//           }
//         }

//         boards.push({
//           board: boardCopy,
//           captureMade,
//           kingMade,
//         });
//       }
//     }
//     // calculate the possible moves
//     return boards;
//   };

//   findNextMove = (_board, { turnCount, lkmat, lcat, player }) => {
//     const kingMade = true;
//     const captureMade = true;
//     // call minimax here and get the new board and the other stuff
//     const [maxUtility, board] = this.minimax(_board, DEPTH, true, turnCount, lkmat, lcat, player);
//     return {
//       board,
//       kingMade,
//       captureMade,
//     };
//   };
// }

// export default MiniMaxPlayer;
