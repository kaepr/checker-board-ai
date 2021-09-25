// {
//   isGameDraw: false,
//   player1Won: false,
// }
import { BOARD_SIZE, PLAYER_1, COMPUTER, PLAYER_2, DRAW } from "../constants";

export const isGameWon = (boardData, currentPlayer) => {
    // Check if all cells are of one type
    const board = _.cloneDeep(boardData);
    let player1Pieces = 0;
    let player2Pieces = 0;
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            if (board[i][j].owner == PLAYER_1)
                player1Pieces++;
            if (board[i][j].owner != EMPTY || board[i][j].owner == (PLAYER_2 || COMPUTER))
                player2Pieces++;
        }
    }
    //TODO return object 
    if (player1Pieces == 0) {
        return PLAYER_2;
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

    if ((currentPlayer == PLAYER_1 && !possibleMovesP1) || ((currentPlayer == PLAYER_2 || COMPUTER) && !possibleMovesP2))
        return DRAW;

    // Check for draw conditions


    /*  
      win conditions
        1. all the pieces of opponent are captured
        2. opponent can't make a valid move 
  
      draw conditions
        1. Neither player has advanced an uncrowned man towards the king-row during the previous 50 moves
        2. No pieces have been removed from the board during the previous 50 moves.
    */

};
