import { createSlice } from "@reduxjs/toolkit";
import * as constants from "../../constants";

const initialCellState = {
  owner: constants.EMPTY,
  isValidNextMove: false,
  isKing: false,
  isActive: false,
};

const initialState = {
  board: [],
  playerOneMoves: [],
  loading: false,
  currentPlayer: constants.PLAYER_1,
  playerOneCells: constants.CELLS_AMOUNT,
  playerTwoCells: constants.CELLS_AMOUNT,
  opponentCells: constants.CELLS_AMOUNT,
};

const createNewBoard = () => {
  let board = [];
  for (let i = 0; i < constants.BOARD_SIZE; i++) {
    let row = [];
    for (let j = 0; j < constants.BOARD_SIZE; j++) {
      row.push({ ...initialCellState });
    }
    board.push(row);
  }

  // Player 2
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < constants.BOARD_SIZE; j++) {
      if ((i + j) % 2 == 0) {
        board[i][j].owner = constants.PLAYER_2;
      }
    }
  }

  // Player 1
  for (let i = constants.BOARD_SIZE - 3; i < constants.BOARD_SIZE; i++) {
    for (let j = 0; j < constants.BOARD_SIZE; j++) {
      if ((i + j) % 2 == 0) {
        board[i][j].owner = constants.PLAYER_1;
      }
    }
  }

  return board;
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    initializeGame: {
      reducer(state, action) {
        state.board = action.payload.board;
      },
      prepare() {
        return { payload: { board: createNewBoard() } };
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
  },
});

export const { setPlayer, setLoading, handlePlayerInput, initializeGame } =
  gameSlice.actions;

export const selectBoard = (state) => state.game.board;
export const selectMoveList = (state) => state.game.playerOneMoves;
export const selectLoading = (state) => state.game.loading;

export default gameSlice.reducer;
