type Operation = {
    operation: 'add' | 'subtract' | 'multiply';
    operands: number[];
    result: number;
  };
  
  export class Calculator {
    private history: Operation[] = [];
  
    add(a: number, b: number): number {
      const result = a + b;
      this.history.push({ operation: 'add', operands: [a, b], result });
      return result;
    }
  
    subtract(a: number, b: number): number {
      const result = a - b;
      this.history.push({ operation: 'subtract', operands: [a, b], result });
      return result;
    }
  
    multiply(a: number, b: number): number {
      const result = a * b;
      this.history.push({ operation: 'multiply', operands: [a, b], result });
      return result;
    }
  
    getHistory(): Operation[] {
      return this.history;
    }
  
    clearHistory(): void {
      this.history = [];
    }
  
    reuseResult(index: number): number {
      if (index < 0 || index >= this.history.length) {
        throw new Error('Index out of history range');
      }
      return this.history[index].result;
    }
  }
  