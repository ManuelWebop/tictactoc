import React, { useState } from "react";
import { GameController } from "../controllers/GameController";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../components/ui/dialog";

interface BoardProps {
  controller: GameController;
}

const Board: React.FC<BoardProps> = ({ controller }) => {
  const [board, setBoard] = useState<(string | null)[]>(controller.getBoard());
  const [winner, setWinner] = useState<string | null>(controller.getWinner());
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleClick = (index: number): void => {
    if (!winner && controller.makeMove(index)) {
      setBoard([...controller.getBoard()]);
      const currentWinner = controller.getWinner();
      setWinner(currentWinner);
      if (currentWinner || controller.getBoard().every((cell) => cell)) {
        setIsDialogOpen(true);
      }
    }
  };

  const resetGame = (): void => {
    controller.resetGame();
    setBoard([...controller.getBoard()]);
    setWinner(null);
    setIsDialogOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFECD1]">
      <h1 className="text-5xl font-bold mb-10">Tic-Tac-Toe</h1>
      <div className="text-2xl font-bold mb-4">
        {winner ? `Ganador: ${winner}` : `Turno de: ${controller.getTurn()}`}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {board.map((cell, index) => (
          <Button
            key={index}
            onClick={() => handleClick(index)}
            disabled={!!cell || !!winner}
            className={`w-24 h-24 text-2xl font-bold shadow-md ${
              cell
                ? "bg-[#15616D] text-white"
                : "bg-[#15616D] hover:bg-[#FF7D00] text-white"
            }`}
          >
            {cell}
          </Button>
        ))}
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-[#FFECD1]">
          <DialogHeader>
            <DialogTitle>
              {winner
                ? `🎉 ¡Felicidades! Ganador: ${winner}`
                : "😲 ¡Es un empate!"}
            </DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={resetGame} className="bg-[#78290F] hover:bg-[#bc4821]">
              Reiniciar Juego
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Board;
