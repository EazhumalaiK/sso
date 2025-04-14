import { useState } from "react";

const Bank = () => {
  const [num1, setNum1] = useState<string>("0");
  const [num2, setNum2] = useState<string>("0");
  const [result, setResult] = useState<number>(0);

  const handleAddition = () => {
    const parsedNum1 = parseFloat(num1) || 0;
    const parsedNum2 = parseFloat(num2) || 0;
    setResult(parsedNum1 + parsedNum2);
  };

  return (
    <div>
      <h1>Math Calculator</h1>
      <div>
        <input
          type="number"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
          placeholder="Enter first number"
        />
        <input
          type="number"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
          placeholder="Enter second number"
        />
        <button onClick={handleAddition}>Add</button>
      </div>
      <h2>Result: {result}</h2>
    </div>
  );
};

export default Bank;
