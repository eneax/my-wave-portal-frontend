import * as React from "react";
import { ethers } from "ethers";

import "./App.css";

export default function App() {
  const wave = () => {};

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
}
