import input from '@lib/input';
import sheetsapi from '@lib/sheets';
import { formatTable } from '@lib/utility';

export default async function list() {
  const [amount, projects] = await Promise.all([
    input.projectsAmount(),
    sheetsapi.getProjects(),
  ]);

  if (!projects) return console.log('No projects found.');

  const slicedProjects = projects.length < amount ? projects : projects.slice(-amount);

  const result = formatTable(slicedProjects);
  console.log(result);
  console.log();
}
