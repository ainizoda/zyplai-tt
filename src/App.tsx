import { useState } from "react";
import { Container, InputBox, Form } from "./components";
import { useDebounce, useThrottle } from "./hooks";

import "./App.scss";

function App() {
  const [deboundVal, setDeboundVal] = useState("");
  const debounce = useDebounce(setDeboundVal, 400);

  const [throttledVal, setThrottledVal] = useState("");
  const throttle = useThrottle(setThrottledVal, 400);

  return (
    <div>
      <Container className="centered push">
        <InputBox
          placeholder="debounce test"
          onChange={(e) => {
            debounce(e.target.value);
          }}
        />
        <InputBox
          placeholder="throttle test"
          onChange={(e) => {
            throttle(e.target.value);
          }}
        />
        <div className="push">Debounce: {deboundVal}</div>
        <div>Throttle: {throttledVal}</div>
      </Container>

      <div className="centered">
        <Form />
      </div>
    </div>
  );
}

export default App;
