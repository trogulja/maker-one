export function arraysToObjects(input: string[][]) {
  const keys = input[0];
  const values = input.slice(1);

  const object = values.map((row) => {
    return row.reduce<Record<string, string>>((acc, value, idx) => {
      acc[keys[idx]] = value;
      return acc;
    }, {});
  });

  return object;
}
