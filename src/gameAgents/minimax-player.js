import { cloneDeep } from 'lodash';
import { findMoves } from '../helpers/findHelpers';
import { getDiscPositions } from '../helpers/utils';

class MiniMaxPlayer {
  static name = 'minimax';
  /** @type {number} */
  depth;

  /**
   * @param {number[][]} board
   * @param {number} depth
   * @param {boolean} isMin
   *
   * @returns {}
   */
  makeNextMove = (_board, depth, isMin) => {
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
      const validMoves = findMoves(
        i,
        j,
        board,
        player
      );
      for (const move in validMoves) {
        
      }
    }
    // calculate the possible moves
    return [];
  };
}

export default MiniMaxPlayer;
