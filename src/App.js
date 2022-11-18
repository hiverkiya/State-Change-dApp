import "./App.css";
import { useState } from "react";
import {
  InputBoxCon,
  Input,
  InputBox,
  InputBoxItems,
} from "./components/AppElements";
function App() {
  // Hooks here
  const [state, setState] = useState(0);
  const [getState, setGetState] = useState("Click to refresh");

  return (
    <div className="App">
      <InputBoxCon>
        <InputBox>
          <InputBoxItems>
            <h1> State Change dApp</h1>
            <form onSubmit={null}>
              <label htmlFor="state">
                {" "}
                My Input:
                <Input
                  id="state"
                  type="number"
                  name="stateInput"
                  value={state}
                  onChange={null}
                ></Input>
              </label>
              <br />
              <input type="submit" value="Set State" />
            </form>
            <br />
            <button onClick={null} type="button">
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
