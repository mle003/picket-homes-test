async function parallelMap<T, R>(
    values: T[],
    asyncFunction: (value: T) => Promise<R>,
    parallelLimit: number
): Promise<R[]> {
    const results: R[] = [];
    let activeTasks = 0;

    const processNext = async () => {
        if (values.length > 0 && activeTasks < parallelLimit) {
            activeTasks++;
            const value = values.shift()!;
            try {
                const result = await asyncFunction(value);
                results.push(result);
            } catch (error) {
                results.push(error as R); // Handle errors gracefully
            } finally {
                activeTasks--;
                await processNext();
            }
        }
    };

    await processNext();

    return results;
}

export default parallelMap;