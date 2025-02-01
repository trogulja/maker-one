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

export function formatDate(date: Date) {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();

  return `${day}.${month}.${year}.`;
}

export function formatFolderName({date, name}: {date: string, name: string}) {
  const [day, month, year] = date.split('.').map((x) => parseInt(x).toString().padStart(2, '0'));
  return `${year}-${month}-${day} ${name}`;
}

export function getRb(oldRb?: string) {
  const yy = new Date().getFullYear().toString().slice(-2);
  let nnn = '001';

  const oldNnn = parseInt(oldRb?.slice(-3) ?? '0');
  if (oldRb && oldRb.slice(0, 2) === yy) {
    nnn = (oldNnn + 1).toString().padStart(3, '0');
  }

  return `${yy}${nnn}`;
}

export function formatTable(data: Record<string, string>[], paddingChar = ' '): string {
  const rowsMap: Record<number, number> = {};

  const mappedData = data.map((row) => {
    const values = Object.values(row);
    const keys = Object.keys(row);
    values.forEach((value, idx) => {
      if (!rowsMap[idx]) rowsMap[idx] = value.length;
      rowsMap[idx] = Math.max(rowsMap[idx], value.length, keys[idx].length);
    });
    return values;
  });

  const result = mappedData
    .map((row) => {
      const rowString = row
        .map((value, idx) => value.padEnd(rowsMap[idx], paddingChar))
        .join(' | ');

      return `  | ${rowString} |`;
    })
    .join('\n');

  const header = Object
    .keys(data[0])
    .map((key, idx) => key.padEnd(rowsMap[idx], paddingChar))
    .join(' | ');

  const divider = Object
    .keys(data[0])
    .map((_key, idx) => '-'.repeat(rowsMap[idx]))
    .join('-:-');

  return `  | ${header} |\n  :-${divider}-:\n${result}`;
}
