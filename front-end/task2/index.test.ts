import parallelMap from './index';

describe('parallelMap', () => {
  it('should execute async functions in parallel with a limit', async () => {
    const values = [1, 2, 3, 4, 5];
    const asyncFunction = (value) => new Promise((resolve) => setTimeout(() => resolve(value * 2), value * 100)); // Simulate delay
    const parallelLimit = 2;

    const results = await parallelMap(values, asyncFunction, parallelLimit);

    expect(results).toEqual([2, 4, 6, 8, 10]);
  });

  it('should handle errors gracefully', async () => {
    const values = [1, 2, 3];
    const asyncFunction = (value: any) => {
      if (value === 2) {
        throw new Error('Error for value 2');
      }
      return Promise.resolve(value * 2);
    };
    const parallelLimit = 1;

    const results = await parallelMap(values, asyncFunction, parallelLimit);

    expect(results).toEqual([2, Error('Error for value 2'), 6]);
  });

  it('should respect the parallel limit', async () => {
    const values = [1, 2, 3, 4, 5];
    const asyncFunction = async (value) => {
      await new Promise((resolve) => setTimeout(() => resolve(value), 500)); // Simulate delay
      return value * 2;
    };
    const parallelLimit = 2;
  
    const startTime = Date.now();
    const results = await parallelMap(values, asyncFunction, parallelLimit);
    const endTime = Date.now();
  
    for (let i = 0; i < results.length; i++) {
      console.log(`Task ${i + 1} execution time: ${endTime - startTime}`);
    }
  
    const averageExecutionTime = (endTime - startTime) / results.length;
    expect(averageExecutionTime).toBeLessThan(600);
  });
});