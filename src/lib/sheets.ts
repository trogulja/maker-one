import path from 'path';
import * as fs from 'fs/promises';
import { existsSync, readFileSync } from 'fs';
import process from 'process';
import { authenticate } from '@google-cloud/local-auth';
import { google } from 'googleapis';
import open from 'open';
import { arraysToObjects } from '@lib/utility';

import type { OAuth2Client } from 'google-auth-library';

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
const HOME = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE || process.env.PWD as string;
const APP_PATH = path.join(HOME, '.maker-one');
const TOKEN_PATH = path.join(APP_PATH, 'token.json');
const CREDENTIALS_PATH = path.join(APP_PATH, 'credentials.json');
const TARGETS_PATH = path.join(APP_PATH, 'targets.json');

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

interface ITargets {
  sheetId: string
  sheetRange: string
  projectsFolder: string
}

interface IProjects {
  Rb: string // YYnnn format (e.g. 23078)
  Datum: string // D.M.YYYY. format (e.g. 28.9.2023.)
  Projekt: string // just a name (e.g. "Mehrzer Inox 8L")
  "Ime projekta": string // project folder name (e.g. "23078-09-28 Mehrzer Inox 8L")
}

class SheetsApi {
  declare client: OAuth2Client | null;
  declare target: ITargets;

  constructor() {
    this.client = null;
    this.target = JSON.parse(readFileSync(TARGETS_PATH).toString());
  }

  private async loadSavedCredentialsIfExist() {
    try {
      const content = (await fs.readFile(TOKEN_PATH)).toString();
      const credentials = JSON.parse(content);
      this.client = google.auth.fromJSON(credentials) as OAuth2Client;
    } catch (err) {
      console.log('Error while loading saved credentials', err)
      return null;
    }
  }

  private async saveCredentials() {
    const content = (await fs.readFile(CREDENTIALS_PATH)).toString();
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
      type: 'authorized_user',
      client_id: key.client_id,
      client_secret: key.client_secret,
      refresh_token: this.client?.credentials.refresh_token,
    });
    await fs.writeFile(TOKEN_PATH, payload);
  }

  private async authorize() {
    await this.loadSavedCredentialsIfExist();
    if (this.client) return this.client;

    this.client = await authenticate({
      scopes: SCOPES,
      keyfilePath: CREDENTIALS_PATH,
    });

    if (this.client.credentials) {
      await this.saveCredentials();
    }

    return this.client;
  }

  private async getSheetData(sheetId: string, range: string) {
    const auth = await this.authorize();
    const sheets = google.sheets({version: 'v4', auth});
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range,
    });
    return res.data.values;
  }

  async printTest() {
    const rows = await this.getSheetData(
      '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
      'Class Data!A2:E'
    );

    if (!rows || rows.length === 0) {
      console.log('No data found.');
      return;
    }
    console.log('Name, Major:');
    rows.forEach((row) => {
      // Print columns A and E, which correspond to indices 0 and 4.
      console.log(`${row[0]}, ${row[4]}`);
    });
  }

  async getProjects() {
    const rows = await this.getSheetData(
      this.target.sheetId,
      this.target.sheetRange
    );

    if (!rows || rows.length === 0) {
      console.log('No data found.');
      return;
    }

    return arraysToObjects(rows) as unknown as IProjects[];
  }
}

const sheetsApi = new SheetsApi();
export default sheetsApi;
