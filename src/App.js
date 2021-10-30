import React from "react";
import { ethers } from "ethers";

import "./App.css";
import wavePortalAbi from "./utils/WavePortal.json";

const App = () => {
  // store our user's public wallet
  const [currentAccount, setCurrentAccount] = React.useState("");
  const [allWaves, setAllWaves] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  // contract address after you deploy
  const contractAddress = "0x8CB1764797a4ecA06D13B3a300999e906c29473E";

  // ABI file is something our web app needs to know how to communicate with our contract.
  // The contents of the ABI file can be found in a JSON file in your hardhat project
  const contractABI = wavePortalAbi.abi;

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

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Get MetaMask Now!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const wave = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        setLoading(true);
        // "Provider" is what we use to talk to Ethereum nodes.
        // We use nodes that Metamask provides in the background to send/receive data from our deployed contract (done with Alchemy)
        const provider = new ethers.providers.Web3Provider(ethereum);

        // A Signer in ethers is an abstraction of an Ethereum Account
        // It can be used to sign messages and transactions and send signed transactions to the Ethereum Network to execute state changing operations
        const signer = provider.getSigner();

        const wavePortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        let count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count: ", count.toNumber());

        // Execute the actual wave from your smart contract
        const waveTxn = await wavePortalContract.wave(message);
        console.log("Mining...", waveTxn.hash);

        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);

        count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count: ", count.toNumber());

        setLoading(false);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Gets all waves from your contract
  const getAllWaves = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        // Call the getAllWaves method from your Smart Contract
        const waves = await wavePortalContract.getAllWaves();

        // We only need address, timestamp, and message in our UI
        let wavesCleaned = [];
        waves.forEach((wave) => {
          wavesCleaned.unshift({
            address: wave.waver,
            timestamp: new Date(wave.timestamp * 1000),
            message: wave.message,
          });
        });

        // Store our data in React State
        setAllWaves(wavesCleaned);

        wavePortalContract.on("NewWave", (from, timestamp, message, winner) => {
          const newWave = {
            address: from,
            timestamp: new Date(timestamp * 1000),
            message: message,
            winner: winner,
          };
          if (allWaves.find((el) => newWave === el)) {
            console.log(
              allWaves.find((el) => newWave.timestamp === el.timestamp)
            );
            setAllWaves((prevState) => [newWave, ...prevState]);
          }
        });
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Check if wallet is connected when page loads
  React.useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  React.useEffect(() => {
    getAllWaves();
  }, []);

  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">
          <span role="img" aria-label="Waving Hand">
            👋
          </span>{" "}
          Hey there!
        </div>

        <div className="bio">
          I'm Enea, a developer tinkering with web3. Welcome to my little corner
          of the web! Connect your Ethereum wallet and wave at me!
        </div>

        {loading ? (
          <div id="loader"></div>
        ) : (
          <>
            <div className="card">
              <label>Send a Wave</label>

              <input
                type="text"
                className="message"
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your message here :)"
              />

              <button className="waveButton" onClick={wave} disabled={loading}>
                {loading ? "loader" : "Send"}
              </button>
            </div>
          </>
        )}

        {!currentAccount && (
          <button className="waveButton" onClick={connectWallet}>
            <span role="img" aria-label="Purse">
              👛
            </span>{" "}
            Connect Wallet
          </button>
        )}

        <div className="wavesContainer">
          {allWaves.map((wave, index) => {
            console.log(wave);
            return (
              <div key={index} className="card">
                <p>
                  Waver: <small>{wave.address}</small>
                </p>
                <p>
                  Posted on: <small>{wave.timestamp.toString()}</small>
                </p>
                <p>{wave.message}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
