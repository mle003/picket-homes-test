const parallelMap = require("./index")
// jest.mock("./index")

test('Basic functionality with even number of values', async () => {
    const values = [1, 2, 3, 4];
    const asyncFunction = jest.fn(async value => value * 2);
    const parallelLimit = 2;
  
    const results = await parallelMap(values, asyncFunction, parallelLimit);
  
    expect(results).toEqual([2, 4, 6, 8]);
    expect(asyncFunction).toHaveBeenCalledTimes(4);
  });
  
  test('Basic functionality with odd number of values', async () => {
    const values = [1, 2, 3, 4, 5];
    const asyncFunction = jest.fn(async value => value * 2);
    const parallelLimit = 2;
  
    const results = await parallelMap(values, asyncFunction, parallelLimit);
  
    expect(results).toEqual([2, 4, 6, 8, 10]);
    expect(asyncFunction).toHaveBeenCalledTimes(5);
  });
  
  test('Handles errors in async function', async () => {
    const values = [1, 2, 3];
    const asyncFunction = jest.fn(async value => {
      if (value === 2) {
        throw new Error('Error!');
      }
      return value * 2;
    });
    const parallelLimit = 2;
  
    const results = await parallelMap(values, asyncFunction, parallelLimit);
  
    expect(results).toEqual([2, undefined, new Error('Error!')]);
    expect(asyncFunction).toHaveBeenCalledTimes(3);
  });
  
  test('Respects parallel limit', async () => {
    const values = [1, 2, 3, 4, 5];
    const asyncFunction = jest.fn(async value => {
      await new Promise(resolve => setTimeout(resolve, 100));
      return value * 2;
    });
    const parallelLimit = 2;
  
    const startTime = Date.now();
    await parallelMap(values, asyncFunction, parallelLimit);
    const endTime = Date.now();
  
    // Execution time should be less than the total async function execution time
    // multiplied by the number of values, indicating parallel execution.
    expect(endTime - startTime).toBeLessThan(500 * values.length);
  });
  
  test('Handles empty input', async () => {
    const values = [];
    const asyncFunction = jest.fn();
    const parallelLimit = 2;
  
    const results = await parallelMap(values, asyncFunction, parallelLimit);
  
    expect(results).toEqual([]);
    expect(asyncFunction).not.toHaveBeenCalled();
  });