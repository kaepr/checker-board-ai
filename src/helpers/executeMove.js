export const executeMove = (rowIndex, columnIndex, boardData, currentPlayer) => {
    // Find that one cell which has isActive flag set to true
    const board = _.cloneDeep(boardData);
    let i;
    let j;
    let found;
    for (i = 0; i < BOARD_SIZE; i++) {
        for (j = 0; j < BOARD_SIZE; j++) {
            if (board[i][j].isActive) {
                found = true;
                break;
            }
        }
    }

    if (!found) {
        return board;
    }

    // Go from (i,j) to (rowIndex, columnIndex)
    // Delete the enemy cell in the way

    let directions = [
        [-1, -1],
        [-1, 1],
    ];

    if (board[i][j].isKing) {
        // Also check for backward position
        directions.push([1, -1]);
        directions.push([1, 1]);
    }

    let dir;
    directions.forEach((direction) => {
        if (isValidDirection(i, j, rowIndex, columnIndex, direction)) {
            dir = direction;
        }
    });

    // dir holds the direction we moved our piece to
    // delete the enemy cell in this direction

    const enemyX = i + dir[0];
    const enemyY = j + dir[1];

    // Original cell should now become empty
    // Original Cell is active should be false

    board[rowIndex][columnIndex].owner = board[i][j].owner;
    board[rowIndex][columnIndex].isKing = board[i][j].isKing;

    board[i][j] = getInitiaCellState();

    // Enemy cell should be deleted
    board[enemyX][enemyY] = getInitiaCellState();

    // Final cell set player
    // Final cell set is valid

    board[rowIndex][columnIndex].isValidNextMove = false;

    // TODO Maybe change this to true later
    board[rowIndex][columnIndex].isActive = false;
};
