import React, { useContext } from "react";
import { ROSCO_TEAM_1, ROSCO_TEAM_2 } from "../roscos";
import RoscoComponent from "../components/RoscoComponent";
import { RoscoContext } from "../context/RoscoContext";

export default function RoscoGameView({ currentTeam, setCurrentTeam }) {
  const { score, setScore } = useContext(RoscoContext);

  const rosco = currentTeam === "Team A" ? ROSCO_TEAM_1 : ROSCO_TEAM_2;

  return (
    <div className="flex flex-col h-screen bg-start bg-cover bg-center px-7 py-5 items-center justify-between">
      <div className="flex justify-between w-full">
        <div className="text-center justify-center items-center bg-blue-500 p-3 rounded-xl">
          <p className="text-md text-white">Equipo A</p>
          <p className="text-3xl font-medium mt-2 text-white">
            {score["Team A"]}
          </p>
        </div>
        <div className="text-center justify-center items-center bg-red-500 p-3 rounded-xl">
          <p className="text-md text-white">Equipo B</p>
          <p className="text-3xl font-medium mt-2 text-white">
            {score["Team B"]}
          </p>
        </div>
      </div>

      <RoscoComponent
        rosco={rosco}
        currentTeam={currentTeam}
        setCurrentTeam={setCurrentTeam}
        setScore={setScore}
        score={score}
      />
    </div>
  );
}
