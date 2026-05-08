import { getNumberInRow } from "./getNumberInRow";
import { Colour } from "./Constants";

describe("getNumberInRow", () => {
    it("should return the correct number of reds in a row when best streak is horizontal", () => {
        const board = [
            [Colour.White, Colour.White,  Colour.White,  Colour.White,  Colour.White,  Colour.White, Colour.White],
            [Colour.White, Colour.White,  Colour.White,  Colour.White,  Colour.White,  Colour.White, Colour.White],
            [Colour.White, Colour.White,  Colour.White,  Colour.White,  Colour.White,  Colour.White, Colour.White],
            [Colour.White, Colour.White,  Colour.Yellow, Colour.White,  Colour.White,  Colour.White, Colour.White],
            [Colour.White, Colour.Yellow, Colour.Red,    Colour.Red,    Colour.Red,    Colour.Red,   Colour.Yellow],
            [Colour.White, Colour.Yellow, Colour.Red,    Colour.Yellow, Colour.Yellow, Colour.Red,   Colour.Yellow],
        ];
        const colourToCheck = Colour.Red;
        const expectedNumberInRow = 4;

        const result = getNumberInRow(board, colourToCheck);

        expect(result).toBe(expectedNumberInRow);
    });

    it("should return the correct number of yellows in a row when best streak is vertical", () => {
        const board = [
            [Colour.White, Colour.White,  Colour.White,  Colour.White,  Colour.White,  Colour.White, Colour.White],
            [Colour.White, Colour.White,  Colour.White,  Colour.White,  Colour.White,  Colour.White, Colour.Yellow],
            [Colour.White, Colour.White,  Colour.White,  Colour.White,  Colour.White,  Colour.White, Colour.Yellow],
            [Colour.White, Colour.White,  Colour.Yellow, Colour.White,  Colour.White,  Colour.White, Colour.Yellow],
            [Colour.White, Colour.Yellow, Colour.Red,    Colour.Red,    Colour.Yellow, Colour.Red,   Colour.Yellow],
            [Colour.White, Colour.Yellow, Colour.Red,    Colour.Yellow, Colour.Yellow, Colour.Red,   Colour.Yellow],
        ];
        const colourToCheck = Colour.Yellow;
        const expectedNumberInRow = 5;

        const result = getNumberInRow(board, colourToCheck);

        expect(result).toBe(expectedNumberInRow);
    });

    it("should return the correct number of reds in a row when best streak is diagonal top left to bottom right", () => {
        const board = [
            [Colour.Red,   Colour.White,  Colour.White,  Colour.White,  Colour.White,  Colour.White, Colour.White],
            [Colour.White, Colour.Red,    Colour.White,  Colour.White,  Colour.White,  Colour.White, Colour.White],
            [Colour.White, Colour.White,  Colour.Red,    Colour.White,  Colour.White,  Colour.White, Colour.White],
            [Colour.White, Colour.White,  Colour.Yellow, Colour.Red,    Colour.White,  Colour.White, Colour.White],
            [Colour.White, Colour.Yellow, Colour.Red,    Colour.Red,    Colour.Red,    Colour.Red,   Colour.Yellow],
            [Colour.White, Colour.Yellow, Colour.Red,    Colour.Yellow, Colour.Yellow, Colour.Red,   Colour.Yellow],
        ];
        const colourToCheck = Colour.Red;
        const expectedNumberInRow = 6;

        const result = getNumberInRow(board, colourToCheck);

        expect(result).toBe(expectedNumberInRow);
    });

    it("should return the correct number of yellows in a row when best streak is diagonal bottom left to top right", () => {
        const board = [
            [Colour.White, Colour.White,  Colour.White,  Colour.White,  Colour.White,  Colour.White, Colour.White],
            [Colour.White, Colour.White,  Colour.White,  Colour.White,  Colour.Yellow, Colour.White, Colour.White],
            [Colour.White, Colour.White,  Colour.White,  Colour.Yellow, Colour.Red,    Colour.White, Colour.White],
            [Colour.White, Colour.White,  Colour.Yellow, Colour.Red,    Colour.Yellow, Colour.White, Colour.Yellow],
            [Colour.White, Colour.Yellow, Colour.Red,    Colour.Red,    Colour.Yellow, Colour.Red,   Colour.Yellow],
            [Colour.White, Colour.Yellow, Colour.Red,    Colour.Yellow, Colour.Yellow, Colour.Red,   Colour.Yellow],
        ];
        const colourToCheck = Colour.Yellow;
        const expectedNumberInRow = 4;

        const result = getNumberInRow(board, colourToCheck);

        expect(result).toBe(expectedNumberInRow);
    });
});
