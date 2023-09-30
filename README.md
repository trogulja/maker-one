# maker-one
A CLI interface to create a new Capture One project and log it in Google sheets. It will:
- read sheets data
- update sheets with new record
- create new folder and open Capture One in it

## Required .env
GCLOUD_PROJECT - project ID
GOOGLE_APPLICATION_CREDENTIALS - credentials-file.json
SHEET_SCOPES
SHEET_ID
SHEET_RANGE
FOLDER_PATH

## Useful links
Authorizing Sheets:
http://codingfundas.com/how-to-read-edit-google-sheets-using-node-js/index.html

Setting access scopes:
https://developers.google.com/sheets/api/guides/authorizing

Managing credentials:
https://console.developers.google.com/apis/credentials

## Todo
- [ ] Refactor flow
- [ ] Update google sheets API
- [ ] Create package and publishing flow
- [ ] Publish binary to npm
- [ ] Write usage in this file
