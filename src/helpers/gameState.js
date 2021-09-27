import { BOARD_SIZE, PLAYER_1, COMPUTER, PLAYER_2, DRAW, GAME_END } from '../constants';
import { cloneDeep } from 'lodash';

const createResponse = (
  playerOneCount,
  playerTwoCount,
  computerCount,
  isGameWon,
  whoseWinner,
  isGameDraw
) => {
  return {
    playerOneCount,
    playerTwoCount,
    computerCount,
    isGameWon,
    whoseWinner,
    isGameDraw,
  };
};

/*  
win conditions
    1. all the pieces of opponent are captured
    2. opponent can't make a valid move 

draw conditions
    1. Neither player has advanced an uncrowned man towards the king-row during the previous 50 moves
    2. No pieces have been removed from the board during the previous 50 moves.
*/

export const getGameState = (boardData, turnCount, lastKingMadeAt, lastCaptureAt, opponent) => {
  // Check if all cells are of one type
  const board = cloneDeep(boardData);
  let playerOneCount = 0;
  let playerTwoCount = 0;
  let computerCount = 0;
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      if (board[i][j].owner === PLAYER_1) {
        playerOneCount += 1;
      }

      if (board[i][j].owner === PLAYER_2) {
        playerTwoCount += 1;
      }

      if (board[i][j].owner === COMPUTER) {
        computerCount += 1;
      }
    }
  }

  //TODO return object
  if (player1Pieces === 0) {
    return createResponse(playerOneCount, playerTwoCount, computerCount);
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

  if (
    (currentPlayer == PLAYER_1 && !possibleMovesP1) ||
    ((currentPlayer == PLAYER_2 || COMPUTER) && !possibleMovesP2)
  )
    return DRAW;
  else return GAME_END;
  // Check for draw conditions
};
