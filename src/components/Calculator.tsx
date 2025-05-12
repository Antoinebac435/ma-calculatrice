import React, { useState } from 'react';
import { Calculator as CalculatorLogic } from '../logic/calculator';

const calculator = new CalculatorLogic();

export const Calculator = () => {
  const [currentInput, setCurrentInput] = useState('');
  const [operator, setOperator] = useState<string | null>(null);
  const [firstValue, setFirstValue] = useState<number | null>(null);
  const [result, setResult] = useState<number | null>(null);
  const [history, setHistory] = useState(calculator.getHistory());

  const handleNumberClick = (value: string) => {
    setCurrentInput(prev => prev + value);
  };

  const handleOperatorClick = (op: string) => {
    if (currentInput === '') return;
    setFirstValue(parseFloat(currentInput));
    setOperator(op);
    setCurrentInput('');
  };

  const handleEquals = () => {
    if (firstValue === null || currentInput === '' || !operator) return;
    const secondValue = parseFloat(currentInput);
    let calcResult = 0;

    switch (operator) {
      case '+':
        calcResult = calculator.add(firstValue, secondValue);
        break;
      case '-':
        calcResult = calculator.subtract(firstValue, secondValue);
        break;
      case '×':
        calcResult = calculator.multiply(firstValue, secondValue);
        break;
    }

    setResult(calcResult);
    setHistory([...calculator.getHistory()]);
    setCurrentInput('');
    setFirstValue(null);
    setOperator(null);
  };

  const handleClear = () => {
    setCurrentInput('');
    setFirstValue(null);
    setOperator(null);
    setResult(null);
  };

  const handleClearHistory = () => {
    calculator.clearHistory();
    setHistory([]);
  };

  return (
    <div style={styles.container}>
      <h2>🧮 Ma Calculatrice</h2>
      <div style={styles.screen}>{currentInput || result || '0'}</div>
      <div style={styles.numpad}>
        {[1,2,3,4,5,6,7,8,9,0].map(num => (
          <button key={num} onClick={() => handleNumberClick(num.toString())}>{num}</button>
        ))}
        <button onClick={() => handleOperatorClick('+')}>+</button>
        <button onClick={() => handleOperatorClick('-')}>-</button>
        <button onClick={() => handleOperatorClick('×')}>×</button>
        <button onClick={handleEquals}>=</button>
        <button onClick={handleClear}>C</button>
        <button onClick={handleClearHistory}>🧹 Historique</button>
      </div>

      <div style={styles.history}>
        <h3>Historique</h3>
        <ul>
          {history.map((entry, index) => (
            <li key={index}>
              {entry.operands.join(` ${entry.operation === 'add' ? '+' : entry.operation === 'subtract' ? '-' : '×'} `)} = {entry.result}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: { maxWidth: 400, margin: 'auto', textAlign: 'center', padding: 20 },
  screen: { border: '1px solid #ccc', padding: 10, fontSize: 24, marginBottom: 10 },
  numpad: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 },
  history: { marginTop: 20, textAlign: 'left' }
};
