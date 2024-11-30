import { GameModel } from "../models/GameModel";

export class GameController {
  private model: GameModel;

  constructor() {
    this.model = new GameModel();
  }

  getBoard(): (string | null)[] {
    return this.model.getBoard();
  }

  getTurn(): string {
    return this.model.getTurn();
  }

  makeMove(index: number): boolean {
    return this.model.makeMove(index);
  }

  getWinner(): string | null {
    return this.model.calculateWinner();
  }

  resetGame(): void {
    this.model.resetGame();
  }
}
