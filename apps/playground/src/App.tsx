
import { useState } from "react";

import "./App.css";
import { FailingComponent } from "./FailingComponent";

function App() {
  const [x] = useState<number>(0);
  
  return (
    <>
      <div>{x}</div>
      <FailingComponent value={x} />
      <FailingComponent value={x} />
      <FailingComponent value={x} />
      <FailingComponent value={x} />
    </>
  );
}

export default App;
