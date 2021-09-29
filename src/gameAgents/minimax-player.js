import { cloneDeep } from 'lodash';
import { PLAYER_1, COMPUTER } from '../constants';
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
    if (depth == 0 || getGameState(board, turnCount, lkmat, lcat, player)) {
      return [calculateUtility(board), board];
    }

    const board = cloneDeep(_board);
    if (isMin) {
      let bestMove;
      let minUtility = Number.POSITIVE_INFINITY;
      for (const move in this.getAllMoves(board, PLAYER_1)) {
        utility = this.makeNextMove(board, depth - 1, !isMin)[0];
        minUtility = Math.min(minUtility, utility);
        if (minUtility == utility) {
          bestMove = move;
        }
      }
      return [minUtility, bestMove];
    } else {
      let bestMove;
      let maxUtility = Number.NEGATIVE_INFINITY;
      for (const move in this.getAllMoves(board, COMPUTER)) {
        utility = this.makeNextMove(board, depth - 1, !isMin)[0];
        maxUtility = Math.max(maxUtility, utility);
        if (maxUtility == utility) {
          bestMove = move;
        }
      }
      return [maxUtility, bestMove];
    }
  };

  /**
   * @param {number[][]} board
   * @param {number} player
   */
  getAllMoves = (_board, player) => {
    const board = cloneDeep(_board);

    const moves = [];

    for (const piece in getDiscPositions(board, player)) {
      const [i, j] = piece;
      const validMoves = findMoves(i, j, board, player);
      for (const move in validMoves) {
        const { boardData, hasAnotherJump, kingMade, captureMade } = executeMove(
          move[0],
          move[1],
          board,
          player
        );
        moves.push(boardData);
      }
    }
    // calculate the possible moves
    return moves;
  };

  makeNextMove = (_board) => {
    const kingMade = true;
    const captureMade = true;
    // call minimax here and get the new board and the other stuff
    return {
      board: _board,
      kingMade,
      captureMade,
    };
  };
}

export default MiniMaxPlayer;
