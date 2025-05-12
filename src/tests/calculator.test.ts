import { Calculator } from '../logic/calculator';

describe('Calculator logic', () => {
  let calculator: Calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  test('adds two numbers', () => {
    expect(calculator.add(2, 3)).toBe(5);
  });

  test('subtracts two numbers', () => {
    expect(calculator.subtract(5, 2)).toBe(3);
  });

  test('multiplies two numbers', () => {
    expect(calculator.multiply(4, 3)).toBe(12);
  });

  test('saves operations in history', () => {
    calculator.add(1, 2);
    calculator.subtract(5, 3);
    const history = calculator.getHistory();
    expect(history.length).toBe(2);
    expect(history[0].operation).toBe('add');
    expect(history[1].result).toBe(2);
  });

  test('clears the history', () => {
    calculator.add(10, 5);
    calculator.clearHistory();
    expect(calculator.getHistory()).toHaveLength(0);
  });

  test('reuses result from history', () => {
    calculator.add(3, 7); // 10
    calculator.multiply(calculator.reuseResult(0), 2); // 20
    const history = calculator.getHistory();
    expect(history[1].result).toBe(20);
  });
});
