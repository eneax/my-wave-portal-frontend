import React from "react";

import "./App.css";

const App = () => {
  const checkIfWalletIsConnected = () => {
    // Make sure you have access to window.ethereum
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have Metamask");
      return;
    } else {
      console.log("We have the ethereum object: ", ethereum);
    }
  };

  // Check if wallet is connected when page loads
  React.useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

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
          I'm Enea, a developer tinkering with web3. Welcome to my little corner
          of the web! Connect your Ethereum wallet and wave at me!
        </div>

        <button className="waveButton" onClick={wave}>
          Wave at Me
        </button>
      </div>
    </div>
  );
};

export default App;
