import React from "react";
import Board from "./components/Board";
import { GameController } from "./controllers/GameController";

const App: React.FC = () => {
  const controller = new GameController();

  return <Board controller={controller} />;
};

export default App;
