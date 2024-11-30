export class GameModel {
    private board: (string | null)[];
    private isXNext: boolean;
  
    constructor() {
      this.board = Array(9).fill(null); 
      this.isXNext = true;
    }
  
    getBoard(): (string | null)[] {
      return this.board;
    }
  
    getTurn(): string {
      return this.isXNext ? "X" : "O";
    }
  
    makeMove(index: number): boolean {
      if (this.board[index] || this.calculateWinner()) return false;
  
      this.board[index] = this.isXNext ? "X" : "O";
      this.isXNext = !this.isXNext;
      return true;
    }
  
    calculateWinner(): string | null {
      const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6],           
      ];
  
      for (const line of lines) {
        const [a, b, c] = line;
        if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
          return this.board[a];
        }
      }
      return null;
    }
  
    resetGame(): void {
      this.board = Array(9).fill(null);
      this.isXNext = true;
    }
  }
  