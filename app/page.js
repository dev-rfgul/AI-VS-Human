"use client";

import { useState } from "react";
import AIGuess from "./Components/AIGuess";
import HumanGuess from "./Components/HumanGuess";

export default function Page() {
  const [currentGame, setCurrentGame] = useState("human");

  const changeGameMode = () => {
    if (currentGame === "ai") setCurrentGame("human");
    else setCurrentGame("ai");
  };

  return (
    <>
      {currentGame === "human" ? (
        <HumanGuess onGameEnd={changeGameMode} />
      ) : (
        <AIGuess onGameEnd={changeGameMode} />
      )}
    </>
  );
}
