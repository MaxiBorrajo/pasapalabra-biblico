import React, { useContext, useEffect, useState } from "react";
import { LETTERS } from "../roscos";
import { RoscoContext } from "../context/RoscoContext";

export default function RoscoComponent({
  rosco,
  currentTeam,
  setCurrentTeam,
  score,
  setScore,
}) {
  const [currentLetter, setCurrentLetter] = useState(LETTERS[0]);
  const [lettersState, setLettersState] = useState([]);
  const [lastOtherTeamLetter, setLastOtherTeamLetter] = useState(LETTERS[0]);
  const [timeLeft, setTimeLeft] = useState(15);
  const { setEndGame } = useContext(RoscoContext);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleLetterState("fallo");
    }
  }, [timeLeft]);

  useEffect(() => {
    setLettersState(() => [
      ...LETTERS.map((letter) => ({
        letter,
        state: null,
        team: "Team A",
      })),
      ...LETTERS.map((letter) => ({
        letter,
        state: null,
        team: "Team B",
      })),
    ]);
  }, []);

  const handleTurns = (letterState, nextLetter) => {
    if (
      lettersState.every(
        (letterState) =>
          letterState.state && letterState.state !== "pasapalabra"
      )
    ) {
      setEndGame(true);
    }

    if (
      lettersState
        .filter((letterState) => letterState.team === currentTeam)
        .every(
          (letterState) =>
            letterState.state && letterState.state !== "pasapalabra"
        )
    ) {
      setCurrentTeam(currentTeam === "Team A" ? "Team B" : "Team A");
      setCurrentLetter(lastOtherTeamLetter);
      setLastOtherTeamLetter(nextLetter);
    }

    //Aca pregunto si es estado es distinto de acierto
    //Y que si aun quedan letras en el otro rosco
    //Si quedan, cambio turno, sino no
    if (
      letterState !== "acierto" &&
      !lettersState
        .filter((letterState) => letterState.team !== currentTeam)
        .every(
          (letterState) =>
            letterState.state && letterState.state !== "pasapalabra"
        )
    ) {
      setCurrentTeam(currentTeam === "Team A" ? "Team B" : "Team A");
      setCurrentLetter(lastOtherTeamLetter);
      setLastOtherTeamLetter(nextLetter);
    }

    return;
  };

  const handleNextLetter = (letterState) => {
    // Obtener el índice actual de la letra
    const currentIndex = LETTERS.indexOf(currentLetter);

    // Filtrar las letras del equipo actual que sean "pasapalabra" o sin estado
    const availableLetters = lettersState.filter(
      (letter) =>
        (letter.state === "pasapalabra" || !letter.state) &&
        letter.team === currentTeam
    );

    // Si no hay letras disponibles, no cambiar la letra actual
    if (availableLetters.length === 0) {
      return handleTurns(letterState, currentLetter);
    }

    // Buscar la siguiente letra disponible en orden circular
    let nextLetter;
    for (let i = 1; i <= LETTERS.length; i++) {
      const nextIndex = (currentIndex + i) % LETTERS.length;
      const potentialNextLetter = LETTERS[nextIndex];

      // Verificar si esta letra está disponible en el equipo actual
      if (
        availableLetters.find((letter) => letter.letter === potentialNextLetter)
      ) {
        nextLetter = potentialNextLetter;
        break;
      }
    }

    // Si no se encontró una siguiente letra, conservar la actual
    if (!nextLetter) {
      nextLetter = currentLetter;
    }

    // Verificar si todas las letras del equipo actual tienen estado distinto a "pasapalabra"
    if (
      lettersState
        .filter((letterState) => letterState.team === currentTeam)
        .every(
          (letterState) =>
            letterState.state && letterState.state !== "pasapalabra"
        )
    ) {
      return handleTurns(letterState, nextLetter);
    }

    // Actualizar la letra actual
    setCurrentLetter(() => nextLetter);
    return handleTurns(letterState, nextLetter);
  };

  const handleScore = (letterState) => {
    if (letterState === "acierto") {
      setScore({ ...score, [currentTeam]: score[currentTeam] + 1 });
    } else if (letterState === "fallo") {
      setScore({ ...score, [currentTeam]: score[currentTeam] - 1 });
    }
  };

  const handleLetterState = (letterState) => {
    const findLetterState = lettersState.find(
      (letterState) =>
        letterState.letter === currentLetter && letterState.team === currentTeam
    );

    findLetterState.state = letterState;

    handleScore(letterState);

    handleNextLetter(letterState);

    setTimeLeft(15);
  };

  const getLetterColorClass = (letter) => {
    const letterState = lettersState.find(
      (letterState) =>
        letterState.letter === letter && letterState.team === currentTeam
    );

    switch (letterState?.state) {
      case "acierto":
        return "bg-green-500"; // Verde
      case "fallo":
        return "bg-red-500"; // Rojo
      case "pasapalabra":
        return "bg-yellow-500"; // Amarillo
      default:
        return "bg-blue-500"; // Azul por defecto
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-evenly gap-x-5">
      <div
        className="relative w-2/5"
        style={{
          transform: `rotate(-90deg)`,
        }}
      >
        {LETTERS.map((letter, index) => {
          return (
            <div
              key={letter}
              className={`${getLetterColorClass(
                letter
              )} w-10 h-10 text-lg text-white flex text-center items-center justify-center rounded-full absolute top-1/2 left-1/2 ${
                letter === currentLetter
                  ? "brightness-125 border-white border"
                  : ""
              }`}
              style={{
                transform: `rotate(${
                  (index * 360) / LETTERS.length
                }deg) translateX(10.6875em) rotate(-${
                  (index * 360) / LETTERS.length
                }deg`,
                boxShadow:
                  letter === currentLetter ? "0 0 5px 0.1px white" : "none",
              }}
            >
              <p style={{ transform: "rotate(90deg)" }}>
                {letter.split("_")[0]}
              </p>
            </div>
          );
        })}
      </div>

      <div className="w-2/5 text-white flex flex-col gap-y-10 text-center mb-16">
        <div className="flex flex-col gap-y-5">
          <h2 className="text-2xl font-bold">
            {currentTeam === "Team A" ? "Equipo A" : "Equipo B"}
          </h2>
          <h2
            className={`text-2xl mb-2 ${timeLeft < 10 ? "text-red-500" : ""}`}
          >
            <span
              className="inline-block animate-spin mr-1"
              style={{
                display: "inline-block",
                animation: "spin 2s linear infinite",
              }}
            >
              ⏳
            </span>
            Tiempo: {timeLeft}
          </h2>
        </div>
        <h3
          className="text-3xl italic mb-6"
          style={{
            textShadow: "1px 1px 2px gray",
          }}
        >
          {rosco[currentLetter].description}
        </h3>
        <div className="flex justify-around">
          <button
            onClick={() => handleLetterState("pasapalabra")}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-transform transform hover:scale-105"
          >
            Pasapalabra
          </button>
          <button
            onClick={() => handleLetterState("acierto")}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-transform transform hover:scale-105"
          >
            Acierto
          </button>
          <button
            onClick={() => handleLetterState("fallo")}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-transform transform hover:scale-105"
          >
            Fallo
          </button>
        </div>
      </div>
    </div>
  );
}
