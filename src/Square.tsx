import { Colour } from './Constants';

interface SquareProps {
    colour: Colour;
    onClick?: () => void;
    highlighted?: boolean;
}

function Square({ colour, onClick, highlighted }: SquareProps) {
    return (
        <div className="board-cell" onClick={onClick}>
            <div className="board-disc" style={{ backgroundColor: colour,
                          boxShadow: highlighted ? 'inset 0 0 0 5px pink' : undefined }}></div>
        </div>
    );
}

export default Square;