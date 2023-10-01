import input from '@lib/input';
import sheetsapi from '@lib/sheets';

export default async function list() {
  const amount = await input.projectsAmount();
  const projects = await sheetsapi.getProjects();
  // show only last n projects

  if (!projects) return console.log('No projects found.');

  console.log(projects.slice(0, amount));
}
