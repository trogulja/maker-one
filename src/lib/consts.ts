import path from 'path';
import { existsSync } from 'fs';
import * as fs from 'fs/promises';
import open from 'open';
import process from 'process';

// If modifying these scopes, delete token.json.
export const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
export const HOME = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE || process.env.PWD as string;
export const APP_PATH = path.join(HOME, '.maker-one');
export const TOKEN_PATH = path.join(APP_PATH, 'token.json');
export const CREDENTIALS_PATH = path.join(APP_PATH, 'credentials.json');
export const TARGETS_PATH = path.join(APP_PATH, 'targets.json');

if (!existsSync(HOME)) {
  console.log('Unable to find home directory');
  process.exit(1);
}

if (!existsSync(APP_PATH)) {
  await fs.mkdir(APP_PATH);
}

if (!existsSync(CREDENTIALS_PATH)) {
  open(APP_PATH);
  console.log(`Please put credentials.json in ${APP_PATH}`);
  process.exit(1);
}

if (!existsSync(TARGETS_PATH)) {
  open(APP_PATH);
  console.log(`Please put targets.json in ${APP_PATH}`);
  process.exit(1);
}
