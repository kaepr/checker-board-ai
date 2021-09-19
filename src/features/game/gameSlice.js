import { createSlice } from "@reduxjs/toolkit";
import { BOARD_SIZE } from "../../constants";

const initialCellState = {
  owner: 0,
};

const initialState = {
  board: [],
  playerOneMoves: [],
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    initializeBoard(state) {
      for (let i = 0; i < BOARD_SIZE; i++) {
        let board_row = [];
        for (let j = 0; j < BOARD_SIZE; j++) {
          board_row.push(initialCellState);
        }
        state.board.push(board_row);
      }
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
