import { cloneDeep } from 'lodash';
import { PLAYER_1, COMPUTER, DEPTH } from '../constants';
import { findMoves, getDiscPositions, executeMove, getGameState } from '../helpers';

const calculateUtility = (board) => {
  let playerDiscs = 0;
  let aiDiscs = 0;
  let playerKings = 0;
  let aiKings = 0;

  for (const row in board) {
    for (const { owner, isKing } in row) {
      if (owner == PLAYER_1) {
        if (isKing) {
          playerKings++;
        } else {
          playerDiscs++;
        }
      } else {
        if (isKing) {
          aiKings++;
        } else {
          aiDiscs++;
        }
      }
    }
  }

  return (playerKings - aiKings) * 2 + (playerDiscs - aiDiscs);
};

class MiniMaxPlayer {
  static name = 'minimax';

  /**
   * @param {number[][]} board
   * @param {number} depth
   * @param {boolean} isMin
   *
   * @returns {}
   */
  minimax = (_board, depth, isMin, turnCount, lkmat, lcat, player) => {
    const state = getGameState(board, turnCount, lkmat, lcat, player);
    if (depth == 0 || ) {
      return [calculateUtility(board), board];
    }

    const board = cloneDeep(_board);
    if (isMin) {
      let bestMoveBoard;
      let minUtility = Number.POSITIVE_INFINITY;
      for (const board in this.getAllBoards(board, PLAYER_1)) {
        utility = this.minimax(board, depth - 1, !isMin)[0];
        minUtility = Math.min(minUtility, utility);
        if (minUtility == utility) {
          bestMoveBoard = board;
        }
      }
      return [minUtility, bestMoveBoard];
    } else {
      let bestMoveBoard;
      let maxUtility = Number.NEGATIVE_INFINITY;
      for (const board in this.getAllBoards(board, COMPUTER)) {
        utility = this.minimax(board, depth - 1, !isMin)[0];
        maxUtility = Math.max(maxUtility, utility);
        if (maxUtility == utility) {
          bestMoveBoard = board;
        }
      }
      return [maxUtility, bestMoveBoard];
    }
  };

  /**
   * Returns the next board positions for all player's valid next moves
   * @param {number[][]} board
   * @param {number} player
   * 
   * @returns {number[][]}
   */
  getAllBoards = (_board, player) => {
    const board = cloneDeep(_board);

    const boards = [];

    

    for (const piece in getDiscPositions(board, player)) {
      const [i, j] = piece;
      const validMoves = findMoves(i, j, board, player);

      

      for (const move in validMoves) {
        const boardCopy = cloneDeep(board);
        let moveExecuted = false;
        let destX = move[0];
        let destY = move[1];
        let kingMade = false;
        let captureMade = false;

        while (!moveExecuted) {
          const executeResponse = executeMove(destX, destY, boardCopy, COMPUTER);

          // Update board with new info
          boardCopy = executeResponse.boardData;

          if (executeResponse.captureMade) {
            captureMade = true;
            //make the current cell active
          }

          if (executeResponse.kingMade) {
            kingMade = true;
            //make the current cell active
          }

          if (executeResponse.hasAnotherJump) {
            // Keep repeating steps
            // Need to update to which index should the next execution be
            // board[destX][destY].hasAnotherJump = true

            // Find next moves for this cell
            const nxtMoves = findMoves(destX, destY, boardCopy, COMPUTER);

            // Update new final capture position ( multiple jump case )

            boardCopy[destX][destY].isActive = true;

            destX = nxtMoves[0][0];
            destY = nxtMoves[0][1];
          }

          if (!executeResponse.hasAnotherJump) {
            moveExecuted = true;
          }

          if (moveExecuted) {
            break;
          }
        }

        boards.push({
          board: boardCopy,
          captureMade,
          kingMade
        });

        // while(true) {
        //   const { boardData, hasAnotherJump, kingMade, captureMade } = executeMove(
        //     move[0],
        //     move[1],
        //     board,
        //     player
        //   );
        //   if (!hasAnotherJump) {
        //     boards.push({ boardData, hasAnotherJump, kingMade, captureMade });
        //     break;
        //   }
        // }
      }
    }
    // calculate the possible moves
    return boards;
  };

  findNextMove = (_board, { turnCount, lkmat, lcat, player }) => {
    const kingMade = true;
    const captureMade = true;
    // call minimax here and get the new board and the other stuff
    const [maxUtility, board] = this.minimax(_board, DEPTH, true, turnCount, lkmat, lcat, player);
    return {
      board,
      kingMade,
      captureMade,
    };
  };
}

export default MiniMaxPlayer;
