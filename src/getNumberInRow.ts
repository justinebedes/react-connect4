import { Colour, Columns, Rows } from "./Constants";

export const getNumberInRow = (board: Colour[][], colourToCheck: Colour): number => {
    let numberInRow = 0;
    for (let row = 0; row < Rows; row++) {
        for (let col = 0; col < Columns; col++) {
            numberInRow = Math.max(numberInRow,
                getNumberInRowHorizontally(board, colourToCheck, row, col),
                getNumberInRowVertically(board, colourToCheck, row, col),
                getNumberInRowDiagonallyTopLeftToBottomRight(board, colourToCheck, row, col),
                getNumberInRowDiagonallyBottomLeftToTopRight(board, colourToCheck, row, col));
        }
    }

    return numberInRow;
}

export const getNumberInRowHorizontally = (board: Colour[][], colourToCheck: Colour, startRow: number, startCol: number): number => {
    let numberInRow = 0;
    for (let col = startCol; col < Columns; col++) {
        if (board[startRow][col] === colourToCheck) {
            numberInRow++;
        } else {
            break;
        }
    }
    return numberInRow;
}

export const getNumberInRowVertically = (board: Colour[][], colourToCheck: Colour, startRow: number, startCol: number): number => {
    let numberInRow = 0;
    for (let row = startRow; row < Rows; row++) {
        if (board[row][startCol] === colourToCheck) {
            numberInRow++;
        } else {
            break;
        }
    }
    return numberInRow;
}

export const getNumberInRowDiagonallyTopLeftToBottomRight = (board: Colour[][], colourToCheck: Colour, startRow: number, startCol: number): number => {
    let numberInRow = 0;
    for (let row = startRow, col = startCol; row < Rows && col < Columns; row++, col++) {
        if (board[row][col] === colourToCheck) {
            numberInRow++;
        } else {
            break;
        }
    }
    return numberInRow;
}

export const getNumberInRowDiagonallyBottomLeftToTopRight = (board: Colour[][], colourToCheck: Colour, startRow: number, startCol: number): number => {
    let numberInRow = 0;
    for (let row = startRow, col = startCol; row < Rows && col >= 0; row++, col--) {
        if (board[row][col] === colourToCheck) {
            numberInRow++;
        } else {
            break;
        }
    }
    return numberInRow;
}