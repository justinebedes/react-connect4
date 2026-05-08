import { Colour, Columns, Rows } from "./Constants";
import Square from "./Square";

interface BoardProps {
    board: Colour[][];
    onClick?: (row: number, col: number) => void;
    lastAIMove?: { row: number; col: number } | null;
}

function Board({ board, onClick, lastAIMove } : BoardProps) {
    const renderRow = (row: number) => {
        const squares = [];

        for (let col = 0; col < Columns; col++) {
            squares.push(<Square key={col} colour={board[row][col]}
                                 highlighted={lastAIMove?.row === row && lastAIMove?.col === col}
                                 onClick={() => onClick && onClick(row, col)} />);
        }

        return squares;
    }

    const rows = [];
    for (let row = 0; row < Rows; row++) {
        rows.push(renderRow(row));
    }

    return (
        <div className="board">
            {rows}
        </div>
    );
}

export default Board;