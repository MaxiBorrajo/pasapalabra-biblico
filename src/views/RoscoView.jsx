import React, { useContext, useState } from "react";
import ChooseTeamView from "./ChooseTeamView";
import RoscoGameView from "./RoscoGameView";
import EndGameView from "./EndGameView";
import { RoscoContext } from "../context/RoscoContext";

export default function RoscoView() {
  const [currentTeam, setCurrentTeam] = useState(null);
  const { endGame, score } = useContext(RoscoContext);

  // Lógica de renderizado para mejorar legibilidad
  const renderView = () => {
    if (!currentTeam && !endGame) {
      return <ChooseTeamView setCurrentTeam={setCurrentTeam} />;
    }
    if (currentTeam && !endGame) {
      return (
        <RoscoGameView currentTeam={currentTeam} setCurrentTeam={setCurrentTeam} />
      );
    }
    return <EndGameView score={score} />;
  };

  return (
    <div>
      {renderView()}
    </div>
  );
}
