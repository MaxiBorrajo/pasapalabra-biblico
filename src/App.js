import { useState } from "react";
import StartScreenView from "./views/StartScreenView";
import RoscoView from "./views/RoscoView";
import { RoscoProvider } from "./context/RoscoContext";

function App() {
  const [startedGame, setStartedGame] = useState(false);
  
  return (
    <RoscoProvider>
      <div className="min-h-screen w-full">
        {startedGame ? (
          <RoscoView />
        ) : (
          <StartScreenView setStartedGame={setStartedGame} />
        )}

        
      </div>
    </RoscoProvider>
  );
}

export default App;
