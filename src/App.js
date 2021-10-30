import React from "react";

import "./App.css";

const App = () => {
  // store our user's public wallet
  const [currentAccount, setCurrentAccount] = React.useState("");

  const checkIfWalletIsConnected = async () => {
    try {
      // Make sure you have access to window.ethereum
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have Metamask");
        return;
      } else {
        console.log("We have the ethereum object: ", ethereum);
      }

      // Check if we're authorized to access the user's wallet
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found!");
      }
    } catch (error) {
      console.log(error);
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
