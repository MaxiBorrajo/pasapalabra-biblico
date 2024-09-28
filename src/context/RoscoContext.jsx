// context/MyContext.js
import React, { createContext, useState } from "react";

// Crea el contexto
export const RoscoContext = createContext();

// Proveedor del contexto
export const RoscoProvider = ({ children }) => {
  const [endGame, setEndGame] = useState(false);
  const [score, setScore] = useState({
    "Team A": 0,
    "Team B": 0,
  });

  return (
    <RoscoContext.Provider value={{ endGame, setEndGame, score, setScore }}>
      {children}
    </RoscoContext.Provider>
  );
};
