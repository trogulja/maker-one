import input from '@lib/input';

export default async function create() {
  const name = await input.projectName();
  console.log(name);
}
