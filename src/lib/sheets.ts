import * as fs from 'fs/promises';
import { readFileSync } from 'fs';
import { authenticate } from '@google-cloud/local-auth';
import { google } from 'googleapis';
import { arraysToObjects, getRb } from '@lib/utility';

import { SCOPES, TOKEN_PATH, CREDENTIALS_PATH, TARGETS_PATH } from '@lib/consts';

import type { OAuth2Client } from 'google-auth-library';
import type { IProjects, ITargets } from '@appTypes';

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
      // console.log('Error while loading saved credentials', err)
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

  private async appendSheetData(spreadsheetId: string, range: string, values: string[][]) {
    const auth = await this.authorize();
    const sheets = google.sheets({version: 'v4', auth});
    const res = await sheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'OVERWRITE',
      requestBody: {
        values,
      },
    });
    return res.data;
  }

  async addNewProject(values: string[][]) {
    const res = await this.appendSheetData(
      this.target.sheetId,
      this.target.sheetRange,
      values
    );
    return res;
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

  async getNextRb() {
    const projects = await this.getProjects();
    return getRb(projects?.pop()?.Rb)
  }

  async appendProject(values: string[][]) {
    const auth = await this.authorize();
    const sheets = google.sheets({version: 'v4', auth});
    const res = await sheets.spreadsheets.values.append({
      spreadsheetId: this.target.sheetId,
      range: this.target.sheetRange,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });
    return res.data;
  }
}

const sheetsApi = new SheetsApi();
export default sheetsApi;
