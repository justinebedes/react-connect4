// Minimax without alpha-beta pruning for Connect 4. 
// No longer used, but kept for reference and testing purposes.

import { Colour, Columns, Rows } from "./Constants";
import { checkForWinner } from "./checkForWinner";

interface Node {
    board: Colour[][];
    move: Move
}

interface Move {
    column: number;
    score: number;
}

export const getBestMove = (board: Colour[][], depth: number, isMaximizing: boolean): Move => {
    return minimax({board, move: {column: -1, score: 0}}, depth, isMaximizing);
}

const minimax = ({board, move}: Node, depth: number, isMaximizing: boolean): Move => {
    const {column, score} = move;
    const winner = checkForWinner(board);
    if (winner !== Colour.White) {
        return { column, score: winner === Colour.Red ? 1 : -1 };
    }
    
    if (depth === 0) {
        return { column, score: 0};
    }

    if (isMaximizing) {
        let bestMove = { column: -1, score: -Infinity };
        for (let col = 0; col < Columns; col++) {
            for (let row = Rows - 1; row >= 0; row--) {
                if (board[row][col] === Colour.White) {
                    const newBoard = board.map((r) => r.slice());
                    newBoard[row][col] = Colour.Red;
                    const childNode = minimax({board: newBoard, move: {column: col, score: score}}, depth - 1, false);
                    if (childNode.score > bestMove.score) {
                        bestMove = { column: col, score: childNode.score };
                    }
                }
            }
        }
        
      return bestMove;
    } else {
        let bestMove = { column: -1, score: Infinity };
        for (let col = 0; col < Columns; col++) {
            for (let row = Rows - 1; row >= 0; row--) {
                if (board[row][col] === Colour.White) {
                    const newBoard = board.map((r) => r.slice());
                    newBoard[row][col] = Colour.Yellow;
                    const childNode = minimax({board: newBoard, move: {column: col, score: score}}, depth - 1, true);
                    if (childNode.score < bestMove.score) {
                        bestMove = { column: col, score: childNode.score };
                    }
                }
            }
        }
        return bestMove;
    }
}