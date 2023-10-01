import input from '@lib/input';
import sheetsapi from '@lib/sheets';
import { formatFolderName, formatTable } from '@lib/utility';

export default async function create() {
  const [name, rb] = await Promise.all([
    input.projectName(),
    sheetsapi.getNextRb(),
  ]);

  const date = await input.projectDate();

  const values = [[rb, date, name, formatFolderName({rb, date, name})]];
  const project = {
    Rb: rb,
    Datum: date,
    Projekt: name,
    "Ime projekta": formatFolderName({rb, date, name}),
  };

  await sheetsapi.addNewProject(values);

  console.log(formatTable([project]));
  console.log();
}
