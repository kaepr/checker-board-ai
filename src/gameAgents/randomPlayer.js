import { BOARD_SIZE, CELLS_AMOUNT, COMPUTER } from '../constants';

class RandomPlayer {
  constructor(boardData, cellCount, ownCells) {
    this.board = boardData;
    this.cellCount = cellCount;
    this.cells = ownCells;
  }

  updateInfo(boardData) {
    this.board = boardData;

    let currentCells = [];

    for (let i = 0; i < BOARD_SIZE; i += 1) {
      for (let j = 0; j < BOARD_SIZE; j += 1) {
        if (boardData[i][j].owner === COMPUTER) {
          currentCells.push(boardData[i][j]); 
        }
      }
    }

    this.cells = currentCells;
    this.cellCount = currentCells.length;
  }

  findNextMove() {
    // Find a valid empty position for any cell from all its own cells
  }
}

export default RandomPlayer;
