import { useState } from "react";

function App() {
  const [value, setValue] = useState(0);

  const addValue = () => {
    setValue((prevValue) => prevValue + 1);
    setValue((prevValue) => prevValue + 1);
    setValue((prevValue) => prevValue + 1);
  };

  const subtractValue = () => {
    setValue((prevValue) => prevValue - 1);
  };

  return (
    <>
      <h1>Hello,Ravi!</h1>
      <p>Value: {value}</p>
      <button onClick={addValue}>Click me! to add value</button>
      <button onClick={subtractValue}>Click me! to subtract value</button>
    </>
  );
}

export default App;
