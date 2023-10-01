import { Database } from 'bun:sqlite';
import path from 'path';
import * as fs from 'fs/promises';
import open from 'open';
import input from '@lib/input';
import sheetsapi from '@lib/sheets';
import { formatFolderName, formatTable } from '@lib/utility';
import { PROJECTS_FOLDER, APP_PATH } from '@lib/consts';

export default async function create() {
  const [name, rb] = await Promise.all([
    input.projectName(),
    sheetsapi.getNextRb(),
  ]);

  const date = await input.projectDate();
  const folderName = formatFolderName({rb, date, name});

  const values = [[rb, date, name, folderName]];
  const project = {
    Rb: rb,
    Datum: date,
    Projekt: name,
    "Ime projekta": folderName,
  };

  await sheetsapi.addNewProject(values);

  console.log(formatTable([project]));
  console.log();

  const folderPath = path.join(PROJECTS_FOLDER, folderName);

  await fs.mkdir(path.join(folderPath, '01 RAW', 'Capture'), { recursive: true });
  await fs.mkdir(path.join(folderPath, '01 RAW', 'Output'), { recursive: true });
  await fs.mkdir(path.join(folderPath, '01 RAW', 'Selects'), { recursive: true });
  await fs.mkdir(path.join(folderPath, '01 RAW', 'Trash'), { recursive: true });
  await fs.mkdir(path.join(folderPath, '02 Radni PSD'), { recursive: true });
  await fs.mkdir(path.join(folderPath, '03 Isporuka', folderName), { recursive: true });

  const templatePath = path.join(APP_PATH, 'template.cosessiondb');
  const dbPath = path.join(folderPath, '01 RAW', `${folderName}.cosessiondb`);
  await fs.copyFile(templatePath, dbPath);

  const db = new Database(dbPath);
  const stmt = db.prepare("UPDATE ZCOLLECTION SET ZCAPTURENAMINGNAME=(?) WHERE ZNAME='root'");
  stmt.run(folderName);
  stmt.finalize();
  db.close();

  await open(dbPath, {wait: false});
}
