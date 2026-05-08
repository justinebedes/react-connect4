import { useEffect, useState } from 'react';
import './App.css'
import Board from './Board'
import { Colour, Columns, Rows } from './Constants';
import { checkForWinner } from './checkForWinner';
import { getBestMove } from './AlphaBeta';

const DIFFICULTY = {
  Easy:   1,
  Medium: 5,
  Hard:   10,
} as const;

type Difficulty = keyof typeof DIFFICULTY;

const EMPTY_BOARD: Colour[][] = Array.from({ length: Rows }, () =>
  Array(Columns).fill(Colour.White)
);

function App() {
  const [currentBoard, setCurrentBoard] = useState<Colour[][]>(EMPTY_BOARD.map(r => r.slice()));
  const [currentTurn, setCurrentTurn] = useState<Colour>(Colour.Red);
  const [difficulty, setDifficulty] = useState<Difficulty>('Medium');
  const [lastAIMove, setLastAIMove] = useState<{ row: number; col: number } | null>(null);

  useEffect(() => {
    if (currentTurn !== Colour.Yellow) return;

    let cancelled = false;
    const id = setTimeout(async () => {
      if (cancelled) return;
      const { column } = await getBestMove(currentBoard, DIFFICULTY[difficulty], false);
      if (!cancelled) {
        let landingRow = -1;
        for (let row = Rows - 1; row >= 0; row--) {
          if (currentBoard[row][column] === Colour.White) { landingRow = row; break; }
        }
        setLastAIMove(landingRow >= 0 ? { row: landingRow, col: column } : null);
        makeMove(column, Colour.Yellow, currentBoard);
      }
    }, 0);

    return () => {
      cancelled = true;
      clearTimeout(id);
    };
  }, [currentBoard, currentTurn, difficulty]);

  const resetBoard = () => {
    setCurrentBoard(EMPTY_BOARD.map(r => r.slice()));
    setCurrentTurn(Colour.Red);
    setLastAIMove(null);
  };

  const onClickHandler = (row: number, col: number) => {
    setLastAIMove(null);
    makeMove(col, Colour.Red, currentBoard);
  }

  const makeMove = (col: number, turn: Colour, board: Colour[][]): Colour[][] => {
    for (let row = Rows - 1; row >= 0; row--) {
      if (board[row][col] === Colour.White) {
        const newBoard = board.map((r) => r.slice());
        newBoard[row][col] = turn;
        setCurrentBoard(newBoard);
        setCurrentTurn(turn === Colour.Red ? Colour.Yellow : Colour.Red);
        return newBoard;
      }
    }
    return board;
  }

  const winner = checkForWinner(currentBoard);
  const status = winner !== Colour.White ? `Winner: ${winner}` : `Current Turn: ${currentTurn}`;
  
  return (
    <>
      <div className="difficulty-selector">
        {(Object.keys(DIFFICULTY) as Difficulty[]).map(d => (
          <button
            key={d}
            onClick={() => setDifficulty(d)}
            className={difficulty === d ? 'active' : ''}
          >
            {d}
          </button>
        ))}
      </div>
      <div>{status}</div>
      <button onClick={resetBoard}>New Game</button>
      { winner === Colour.White 
      ? <Board board={currentBoard} lastAIMove={lastAIMove} onClick={onClickHandler} />
      : <Board board={currentBoard} lastAIMove={lastAIMove} />
      }
    </>
  )
}

export default App;
