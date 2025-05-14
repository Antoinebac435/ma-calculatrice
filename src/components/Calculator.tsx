import React, { useState } from 'react';
import { Calculator as CalculatorLogic } from '../logic/calculator';

const calculator = new CalculatorLogic();

export const Calculator = () => {
  const [currentInput, setCurrentInput] = useState('');
  const [operator, setOperator] = useState<string | null>(null);
  const [firstValue, setFirstValue] = useState<number | null>(null);
  const [result, setResult] = useState<number | null>(null);
  const [history, setHistory] = useState(calculator.getHistory());

  const handleNumberClick = (value: string) => setCurrentInput(prev => prev + value);

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
      default:
        return;
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

  const handleUseHistory = (entry: { operands: number[]; operation: string; result: number }) => {
    // Ré‑injecte le résultat dans l'écran pour enchaîner
    setCurrentInput(entry.result.toString());
    setResult(entry.result);
    setFirstValue(null);
    setOperator(null);
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.calcPanel}>
        <h2>🧮 Ma Calculatrice</h2>
        <div style={styles.screen}>{currentInput || result || '0'}</div>
        <div style={styles.numpad}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(num => (
            <button key={num} onClick={() => handleNumberClick(num.toString())}>{num}</button>
          ))}
          <button onClick={() => handleOperatorClick('+')}>+</button>
          <button onClick={() => handleOperatorClick('-')}>-</button>
          <button onClick={() => handleOperatorClick('×')}>×</button>
          <button onClick={handleEquals}>=</button>
          <button onClick={handleClear}>C</button>
          <button onClick={handleClearHistory}>🧹</button>
        </div>
      </div>

      <div style={styles.history}>
        <div style={styles.historyHeader}>
          <h3 style={{ margin: 0 }}>Historique</h3>
          <button onClick={handleClearHistory} style={styles.clearHistoryBtn}>Tout effacer</button>
        </div>
        <ul style={styles.historyList}>
          {history.map((entry, index) => (
            <li key={index} style={styles.historyItem}>
              <span>
                {entry.operands.join(` ${entry.operation === 'add' ? '+' : entry.operation === 'subtract' ? '-' : '×'} `)} = {entry.result}
              </span>
              <button onClick={() => handleUseHistory(entry)} style={styles.useBtn}>Utiliser</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '2rem',
    padding: '2rem',
    width: '100%',
    boxSizing: 'border-box',
  },
  calcPanel: {
    width: 320,
    textAlign: 'center',
  },
  screen: {
    border: '1px solid #ccc',
    padding: '10px',
    fontSize: 24,
    marginBottom: 10,
    minHeight: 40,
  },
  numpad: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 10,
  },
  history: {
    minWidth: 240,
    maxHeight: 400,
    overflowY: 'auto',
    textAlign: 'left',
    borderLeft: '1px solid #eee',
    paddingLeft: '1rem',
  },
  historyHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem',
  },
  clearHistoryBtn: {
    fontSize: '0.8rem',
  },
  historyList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  historyItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem',
  },
  useBtn: {
    marginLeft: '0.5rem',
    fontSize: '0.75rem',
  },
};