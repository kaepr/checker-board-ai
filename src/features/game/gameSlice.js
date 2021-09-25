import { createSlice } from '@reduxjs/toolkit';
import { BOARD_SIZE, CELLS_AMOUNT, EMPTY, PLAYER_1, PLAYER_2 } from '../../constants';

const initialCellState = {
  owner: EMPTY,
  isValidNextMove: false,
  isKing: false,
  isActive: false,
  hasPossibleCapture: false,
};

const initialState = {
  board: [],
  playerOneMoves: [],
  loading: false,
  // currentPlayer: PLAYER_1,
  playerOneCells: CELLS_AMOUNT,
  playerTwoCells: CELLS_AMOUNT,
  opponentCells: CELLS_AMOUNT,
  turnCount: 0,
  whoseTurn: PLAYER_1,
};

const createNewBoard = (intializeInfo) => {
  let board = [];
  for (let i = 0; i < BOARD_SIZE; i++) {
    let row = [];
    for (let j = 0; j < BOARD_SIZE; j++) {
      row.push({ ...initialCellState });
    }
    board.push(row);
  }

  // Player 2
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      if ((i + j) % 2 == 0) {
        board[i][j].owner = PLAYER_2;
      }
    }
  }

  // Player 1
  for (let i = BOARD_SIZE - 3; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      if ((i + j) % 2 == 0) {
        board[i][j].owner = PLAYER_1;
      }
    }
  }

  return board;
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    initializeGame: {
      reducer(state, { payload }) {
        state.board = payload.board;
        state.loading = payload.loading;
        state.playerOneCells = payload.playerOneCells;
        state.playerTwoCells = payload.playerTwoCells;
        state.opponentCells = payload.opponentCells;
        state.turnCount = payload.turnCount;
      },
      prepare() {
        return {
          payload: {
            board: createNewBoard(),
            loading: false,
            playerOneCells: CELLS_AMOUNT,
            playerTwoCells: CELLS_AMOUNT,
            opponentCells: CELLS_AMOUNT,
            turnCount: 0,
            whoseTurn: PLAYER_1,
          },
        };
      },
    },
    handlePlayerInput(state, action) {
      state.playerOneMoves.push(action.payload.moveCoordinates);
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setPlayer(state, action) {
      state.currentPlayer = action.payload;
    },
    changePlayerOneCells(state, action) {
      state.playerOneCells = action.payload;
    },
    changePlayerTwoCells(state, action) {
      state.playerTwoCells = action.payload;
    },
    changeOpponentCells(state, action) {
      state.opponentCells = action.payload;
    },
    setBoard(state, action) {
      state.board = action.payload;
    },
    changeTurnCountByAmount(state, action) {
      state.turnCount += action.payload;
    },
    changeWhoseTurn(state, action) {
      state.whoseTurn = action.payload;
    },
  },
});

export const {
  setPlayer,
  setLoading,
  handlePlayerInput,
  initializeGame,
  changeOpponentCells,
  changePlayerOneCells,
  changePlayerTwoCells,
  setBoard,
  changeTurnCountByAmount,
  changeWhoseTurn,
} = gameSlice.actions;

export const selectBoard = (state) => state.game.board;
export const selectMoveList = (state) => state.game.playerOneMoves;
export const selectLoading = (state) => state.game.loading;
export const selectWhoseTurn = (state) => state.game.whoseTurn;
export const selectTurnCount = (state) => state.game.turnCount;

export default gameSlice.reducer;
