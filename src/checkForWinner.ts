import { Colour } from "./Constants";
import { getNumberInRow } from "./getNumberInRow";

export const checkForWinner = (board: Colour[][]): Colour => {
  if (getNumberInRow(board, Colour.Red) >= 4) {
      return Colour.Red;
  }
  if (getNumberInRow(board, Colour.Yellow) >= 4) {
      return Colour.Yellow;
  }

  return Colour.White;
};