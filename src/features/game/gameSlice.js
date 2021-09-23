import { createSlice } from "@reduxjs/toolkit";
import { BOARD_SIZE, EMPTY, PLAYER_1, PLAYER_2 } from "../../constants";

const initialCellState = {
  owner: EMPTY,
  isValidNextMove: NEXT_MOVE_INVALID,
};

const initialState = {
  board: [],
  playerOneMoves: [],
};

const createNewBoard = () => {
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
  name: "game",
  initialState,
  reducers: {
    initializeBoard: {
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
  },
});

export const { initializeBoard, handlePlayerInput } = gameSlice.actions;

export const selectBoard = (state) => state.game.board;
export const selectMoveList = (state) => state.game.playerOneMoves;

export default gameSlice.reducer;
