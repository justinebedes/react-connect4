import { Colour, Columns, RED_WIN, Rows, YELLOW_WIN } from "./Constants";
import { checkForWinner } from "./checkForWinner";

// Search center columns first — they have more winning potential and improve pruning
const COL_ORDER = [3, 2, 4, 1, 5, 0, 6];

const scoreWindow = (window: Colour[], colour: Colour): number => {
    const opponent = colour === Colour.Red ? Colour.Yellow : Colour.Red;
    if (window.some(c => c === opponent)) return 0;
    const count = window.filter(c => c === colour).length;
    if (count === 3) return 5;
    if (count === 2) return 2;
    return 0;
};

const scoreBoard = (board: Colour[][], colour: Colour): number => {
    let score = 0;
    for (let row = 0; row < Rows; row++) {
        for (let col = 0; col <= Columns - 4; col++) {
            score += scoreWindow([board[row][col], board[row][col+1], board[row][col+2], board[row][col+3]], colour);
        }
    }
    for (let col = 0; col < Columns; col++) {
        for (let row = 0; row <= Rows - 4; row++) {
            score += scoreWindow([board[row][col], board[row+1][col], board[row+2][col], board[row+3][col]], colour);
        }
    }
    for (let row = 0; row <= Rows - 4; row++) {
        for (let col = 0; col <= Columns - 4; col++) {
            score += scoreWindow([board[row][col], board[row+1][col+1], board[row+2][col+2], board[row+3][col+3]], colour);
        }
    }
    for (let row = 3; row < Rows; row++) {
        for (let col = 0; col <= Columns - 4; col++) {
            score += scoreWindow([board[row][col], board[row-1][col+1], board[row-2][col+2], board[row-3][col+3]], colour);
        }
    }
    return score;
};

interface Node {
    board: Colour[][];
    move: Move
}

interface Move {
    column: number;
    score: number;
}

export const getBestMove = async (board: Colour[][], depth: number, isMaximizing: boolean): Promise<Move> => {
    return alphaBeta({board, move: {column: -1, score: 0}}, depth, -Infinity, Infinity, isMaximizing);
}

const alphaBeta = ({board, move}: Node, depth: number, alpha: number, beta: number, isMaximizing: boolean): Move => {
    const {column, score} = move;
    const winner = checkForWinner(board);
    if (winner !== Colour.White) {
        // Depth remaining is added/subtracted so the AI prefers faster wins and slower losses
        return { column, score: winner === Colour.Red ? RED_WIN + depth : YELLOW_WIN - depth };
    }
    
    if (depth === 0) {
        const depth0Score = scoreBoard(board, Colour.Red) - scoreBoard(board, Colour.Yellow);
        return { column, score: depth0Score };
    }

    if (isMaximizing) {
        let bestMove = { column: -1, score: -Infinity };
loopMaximising:
        for (const col of COL_ORDER) {
            for (let row = Rows - 1; row >= 0; row--) {
                if (board[row][col] === Colour.White) {
                    const newBoard = board.map((r) => r.slice());
                    newBoard[row][col] = Colour.Red;
                    const childNode = alphaBeta({board: newBoard, move: {column: col, score: score}}, depth - 1, alpha, beta, false);
                    if (childNode.score > bestMove.score) {
                        bestMove = { column: col, score: childNode.score };
                    }
                    else if (childNode.score === bestMove.score && Math.random() < 0.5) {
                        bestMove = { column: col, score: childNode.score };
                    }
            
                    if (childNode.score > beta) {
                        break loopMaximising;
                    }
                    alpha = Math.max(alpha, childNode.score);
                    break;
                }
            }
        }
        
      return bestMove;
    } else {
        let bestMove = { column: -1, score: Infinity };
loopMinimising:
        for (const col of COL_ORDER) {
            for (let row = Rows - 1; row >= 0; row--) {
                if (board[row][col] === Colour.White) {
                    const newBoard = board.map((r) => r.slice());
                    newBoard[row][col] = Colour.Yellow;
                    const childNode = alphaBeta({board: newBoard, move: {column: col, score: score}}, depth - 1, alpha, beta, true);
                    if (childNode.score < bestMove.score) {
                        bestMove = { column: col, score: childNode.score };
                    }
                    else if (childNode.score === bestMove.score && Math.random() < 0.5) {
                        bestMove = { column: col, score: childNode.score };
                    }
                    if (childNode.score < alpha) {
                        break loopMinimising;
                    }
                    beta = Math.min(beta, childNode.score);
                    break;
                }
            }
        }
        return bestMove;
    }
}