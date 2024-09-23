import React from "react";

export default function EndGameView({ score }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-start bg-cover bg-center text-white p-8 gap-x-20">
        <img src="/images/jesus.gif?raw=true" alt="Jesus bailando" className="w-52"/>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-8 mt-14">
          🎉 ¡Juego finalizado! 🎉
        </h1>
        <div className="text-center mb-6">
          <p className="text-2xl mb-2">
            Equipo A:{" "}
            <span className="font-semibold text-blue-500">
              {score["Team A"]}
            </span>
          </p>
          <p className="text-2xl mb-2">
            Equipo B:{" "}
            <span className="font-semibold text-red-500">
              {score["Team B"]}
            </span>
          </p>
          <p className="text-3xl mt-4 font-bold">
            🏆 Ganador:{" "}
            <span
              className={`${
                score["Team A"] > score["Team B"]
                  ? "text-blue-500"
                  : "text-red-500"
              }`}
            >
              {score["Team A"] > score["Team B"] ? "Equipo A" : "Equipo B"}
            </span>
          </p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="mt-8 bg-green-500 hover:bg-green-600 text-white text-lg font-semibold py-3 px-8 rounded-lg transition-transform transform hover:scale-105"
        >
          Jugar de nuevo
        </button>
      </div>
      <img src="/images/jesus.gif?raw=true" alt="Jesus bailando" className="w-52"/>
    </div>
  );
}
