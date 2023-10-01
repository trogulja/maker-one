import input from '@lib/input';
import sheetsapi from '@lib/sheets';

export default async function list() {
  const amount = await input.projectsAmount();
  const projects = await sheetsapi.getProjects();

  if (!projects) return console.log('No projects found.');

  const slicedProjects = projects.length < amount ? projects : projects.slice(-amount);
  const rowsMap: Record<number, number> = {};

  const mappedProjects = slicedProjects.map((project) => {
    const values = Object.values(project);
    const keys = Object.keys(project);
    values.forEach((value, idx) => {
      if (!rowsMap[idx]) rowsMap[idx] = value.length;
      rowsMap[idx] = Math.max(rowsMap[idx], value.length, keys[idx].length);
    });
    return values;
  });

  const result = mappedProjects
    .map((project) => {
      const projectString = project
        .map((value, idx) => value.padEnd(rowsMap[idx], ' '))
        .join(' | ');

      return `  | ${projectString} |`;
    })
    .join('\n');

  const header = Object
    .keys(slicedProjects[0])
    .map((key, idx) => key.padEnd(rowsMap[idx], ' '))
    .join(' | ');

  console.log(`  | ${header} |\n${result}`);
  console.log();
}
