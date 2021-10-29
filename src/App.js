import * as React from "react";

import "./App.css";

const App = () => {
  const wave = () => {
    console.log("you waved at me!!!");
  };

  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">
          <span role="img" aria-label="hey">
            👋
          </span>{" "}
          Hey there!
        </div>

        <div className="bio">
          Hey there! I'm Enea, a developer currently diving into Web3. Welcome
          to my little corner of the web! Connect your Ethereum wallet and wave
          at me!
        </div>

        <button className="waveButton" onClick={wave}>
          Wave at Me
        </button>
      </div>
    </div>
  );
};

export default App;
