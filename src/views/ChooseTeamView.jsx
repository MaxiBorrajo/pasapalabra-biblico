import React from 'react';

export default function ChooseTeamView({ setCurrentTeam }) {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-start bg-cover bg-center">
      <h1 className="text-4xl font-bold text-white mb-10">
        ¿Cuál fue la palabra de hoy?
      </h1>
      <div className="flex space-x-10">
        <button
          onClick={() => setCurrentTeam('Team A')}
          className="bg-blue-500 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300"
        >
          Equipo A
        </button>
        <button
          onClick={() => setCurrentTeam('Team B')}
          className="bg-red-500 hover:bg-red-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300"
        >
          Equipo B
        </button>
      </div>
    </div>
  );
}
