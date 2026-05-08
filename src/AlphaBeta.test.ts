import { Colour } from './Constants';
import { getBestMove } from './AlphaBeta';

describe("AlphaBeta", () => {
    test('should return the best move for red 1', async () => {
        const board = [
            [Colour.White, Colour.White,  Colour.White,  Colour.White,  Colour.White,  Colour.White, Colour.White],
            [Colour.White, Colour.White,  Colour.White,  Colour.White,  Colour.White,  Colour.White, Colour.White],
            [Colour.White, Colour.White,  Colour.White,  Colour.White,  Colour.White,  Colour.White, Colour.White],
            [Colour.White, Colour.White,  Colour.Yellow, Colour.White,  Colour.White,  Colour.White, Colour.White],
            [Colour.White, Colour.Yellow, Colour.Red,    Colour.Red,    Colour.Red,    Colour.White, Colour.Yellow],
            [Colour.White, Colour.Yellow, Colour.Red,    Colour.Yellow, Colour.Yellow, Colour.Red,   Colour.Yellow],
        ];
        
        const depth = 2;
        const expectedBestMove = 5;
    
        const actualBestMove = await getBestMove(board, depth, true);
    
        expect(actualBestMove.column).toBe(expectedBestMove);
    });
    
    test('should return the best move for red 2', async () =>  {
        const board = [
            [Colour.White, Colour.White,  Colour.White,  Colour.White,  Colour.White,  Colour.White,  Colour.White],
            [Colour.White, Colour.White,  Colour.White,  Colour.White,  Colour.White,  Colour.White,  Colour.White],
            [Colour.White, Colour.White,  Colour.White,  Colour.White,  Colour.White,  Colour.Yellow, Colour.Yellow],
            [Colour.White, Colour.White,  Colour.White,  Colour.Yellow, Colour.White,  Colour.Red,    Colour.Yellow],
            [Colour.White, Colour.White,  Colour.White,  Colour.Yellow, Colour.Red,    Colour.Red,    Colour.Red],
            [Colour.White, Colour.White,  Colour.Red,    Colour.Yellow, Colour.Red,    Colour.Red,    Colour.Yellow],
        ]; 
        
        const depth = 2;
        const expectedBestMove = 3;
    
        const actualBestMove = await getBestMove(board, depth, true);
    
        expect(actualBestMove.column).toBe(expectedBestMove);
    });

    test('should return the best move for yellow 1 ', async () => {
        const board = [
            [Colour.White, Colour.White,  Colour.White,  Colour.White,  Colour.White,  Colour.White,  Colour.White],
            [Colour.White, Colour.White,  Colour.White,  Colour.White,  Colour.White,  Colour.White,  Colour.White],
            [Colour.White, Colour.White,  Colour.Yellow, Colour.White,  Colour.White,  Colour.White,  Colour.White],
            [Colour.White, Colour.White,  Colour.Red,    Colour.Red,    Colour.White,  Colour.White,  Colour.Red],
            [Colour.White, Colour.Yellow, Colour.Red,    Colour.Red,    Colour.White,  Colour.White,  Colour.Yellow],
            [Colour.White, Colour.Yellow, Colour.Red,    Colour.Red,    Colour.Yellow, Colour.Yellow, Colour.Yellow],
        ]; 

        const depth = 4;
        const expectedBestMove = 3;
    
        const actualBestMove = await getBestMove(board, depth, false);
    
        expect(actualBestMove.column).toBe(expectedBestMove);
    });

    test('should return the best move for yellow 2', async () => {
        const board = [
            [Colour.White,  Colour.White,  Colour.White,  Colour.White,  Colour.White,  Colour.White,  Colour.White],
            [Colour.White,  Colour.White,  Colour.White,  Colour.White,  Colour.White,  Colour.White,  Colour.White],
            [Colour.White,  Colour.White,  Colour.White,  Colour.Yellow, Colour.White,  Colour.White,  Colour.White],
            [Colour.White,  Colour.White,  Colour.Red,    Colour.Red,    Colour.White,  Colour.White,  Colour.White],
            [Colour.Yellow, Colour.White,  Colour.Red,    Colour.Red,    Colour.Yellow,  Colour.White,  Colour.White],
            [Colour.Yellow, Colour.Yellow, Colour.Red,    Colour.Red,    Colour.Yellow, Colour.Yellow, Colour.Yellow],
        ]; 

        const depth = 4;
        const expectedBestMove = 2;
    
        const actualBestMove = await getBestMove(board, depth, false);
    
        expect(actualBestMove.column).toBe(expectedBestMove);
    });

    test('should return the best move for red 3', async () => {
        const board = [
            [Colour.White, Colour.White, Colour.White,  Colour.White,  Colour.White,  Colour.White,  Colour.White],
            [Colour.White, Colour.White, Colour.White,  Colour.White,  Colour.White,  Colour.White,  Colour.White],
            [Colour.White, Colour.White, Colour.White,  Colour.Red,    Colour.White,  Colour.White,  Colour.White],
            [Colour.White, Colour.White, Colour.Yellow, Colour.Yellow, Colour.White,  Colour.White,  Colour.White],
            [Colour.White, Colour.Red,   Colour.Yellow, Colour.Yellow, Colour.White,  Colour.White,  Colour.White],
            [Colour.Red,   Colour.Red,   Colour.Yellow, Colour.Yellow, Colour.Red,    Colour.Red,    Colour.Red],
        ]; 

        const depth = 4;
        const expectedBestMove = 2;
    
        const actualBestMove = await getBestMove(board, depth, true);
    
        expect(actualBestMove.column).toBe(expectedBestMove);
    });
});

