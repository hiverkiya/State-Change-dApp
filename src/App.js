import "./App.css";
import { useState } from "react";
import {
  InputBoxCon,
  Input,
  InputBox,
  InputBoxItems,
} from "./components/AppElements";
import Web3 from "web3";
import { changeStateInput } from "./abi/abis";
// Truffle Outputs post-migration process
 const web3 = new Web3(Web3.givenProvider);
 const contractAddr = "0x8a6232679ACD74cEcE204Ea0011770fe";
 const ChangeState = new web3.eth.Contract(changeStateInput, contractAddr);

function App() {
 
  // Hooks here
  const [state, setState] = useState(0);
  const [getState, setGetState] = useState("Click to refresh");
  // Check if a web3 address is running on port :9545
  const web3Check = new Web3();
  web3Check.setProvider(
    new Web3.providers.WebsocketProvider("ws://localhost:9545")
  );
  web3Check.eth.net
    .isListening()
    .then(() => console.log("Successful Connection!"))
    .catch((e) => console.log("Error: " + e));
  // Read and get data from our local blockchain
  const handleGet = async (e) => {
    e.preventDefault();
    const result = await ChangeState.methods.get().call();
    setGetState(result);
    console.log(result);
  };
  // Write send data to our local blockchain
  const handleSet = async (e) => {
    e.preventDefault();
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    const gas = await ChangeState.methods.set(state).estimateGas();
    const result = await ChangeState.methods.set(state).send({
      from: account,
      gas,
    });
    console.log(result);
  };
  return (
    <div className="App">
      <header>
        <title>State Change App</title>
      </header>
      <InputBoxCon>
        <InputBox>
          <InputBoxItems>
            <h1> State Change dApp</h1>
            <form onSubmit={handleSet}>
              <label htmlFor="state">
                {" "}
                My Input:
                <Input
                  id="state"
                  type="number"
                  name="stateInput"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </label>
              <br />
              <input type="submit" value="Set State" />
            </form>
            <br />
            <button onClick={handleGet} type="button">
              Get State
            </button>
            <br />
            <br />
            <div style={{ border: "1px black" }}> {getState}</div>
          </InputBoxItems>
        </InputBox>
      </InputBoxCon>
    </div>
  );
}

export default App;
