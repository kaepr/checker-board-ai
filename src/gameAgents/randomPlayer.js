import { CELLS_AMOUNT } from "../constants";

class RandomPlayer {
  constructor(boardData) {
    this.board = boardData;
    this.cells = CELLS_AMOUNT;
  }

  updateInfo(boardData) {
    this.board = boardData;
  }

  findNextMove() {
    // Find a valid empty position for any cell from all its own cells
  }
}

export default RandomPlayer;
