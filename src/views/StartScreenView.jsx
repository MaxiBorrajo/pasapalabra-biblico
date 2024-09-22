import React, { useState } from "react";
import "./clouds.css";
export default function StartScreenView({ setStartedGame }) {
  const [showTransition, setShowTransition] = useState(false);

  const handleStartGame = () => {
    setShowTransition(true);
    setTimeout(() => {
      setStartedGame(true); // Cambiar de vista después de la animación
    }, 3000); // Duración de la animación en milisegundos (2 segundos)
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-start bg-cover bg-center">
      <h1 className="text-4xl font-bold text-white mb-8">
        Bienvenido al Juego del Rosco
      </h1>
      <button
        onClick={handleStartGame}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300"
      >
        Empezar Juego
      </button>

      {showTransition && (
        <>
          {/* Nubes en la parte superior (volteadas) */}
          <div className="banner banner-top">
            <div className="clouds clouds-right">
              <img src="images/cloud1.png" alt="cloud" style={{ "--i": 1 }} />
              <img src="images/cloud4.png" alt="cloud" style={{ "--i": 4 }} />
              <img src="images/cloud3.png" alt="cloud" style={{ "--i": 3 }} />
              <img src="images/cloud2.png" alt="cloud" style={{ "--i": 2 }} />
              <img src="images/cloud5.png" alt="cloud" style={{ "--i": 5 }} />
            </div>
            <div className="clouds clouds-left">
              <img src="images/cloud5.png" alt="cloud" style={{ "--i": 5 }} />
              <img src="images/cloud1.png" alt="cloud" style={{ "--i": 1 }} />
              <img src="images/cloud2.png" alt="cloud" style={{ "--i": 2 }} />
              
              <img src="images/cloud3.png" alt="cloud" style={{ "--i": 3 }} />
              <img src="images/cloud4.png" alt="cloud" style={{ "--i": 4 }} />
            </div>
          </div>

          {/* Nubes en la parte inferior (normales) */}
          <div className="banner banner-bottom">
            <div className="clouds clouds-right">
              <img src="images/cloud1.png" alt="cloud" style={{ "--i": 1 }} />
              <img src="images/cloud2.png" alt="cloud" style={{ "--i": 2 }} />
              <img src="images/cloud3.png" alt="cloud" style={{ "--i": 3 }} />
              <img src="images/cloud4.png" alt="cloud" style={{ "--i": 4 }} />
              <img src="images/cloud5.png" alt="cloud" style={{ "--i": 5 }} />
            </div>
            <div className="clouds clouds-left">
              <img src="images/cloud1.png" alt="cloud" style={{ "--i": 1 }} />
              <img src="images/cloud2.png" alt="cloud" style={{ "--i": 2 }} />
              <img src="images/cloud3.png" alt="cloud" style={{ "--i": 3 }} />
              <img src="images/cloud4.png" alt="cloud" style={{ "--i": 4 }} />
              <img src="images/cloud5.png" alt="cloud" style={{ "--i": 5 }} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
