# maker-one

A CLI interface to create a new Capture One project and log it in Google sheets. It will:

- read sheets data
- update sheets with new record
- create new folder and open Capture One in it

# Table of Contents

- [Installation](#installation)
  - [Initial Setup (for developer)](#initial-setup-for-developer)
  - [Setting Up Environment (for each user)](#setting-up-environment-for-each-user)
    - [Setting Up Targets (targets.json)](#setting-up-targets-targetsjson)
    - [Setting Up Credentials](#setting-up-credentials)
- [File Structure](#file-structure)
- [Usage](#usage)
- [Flow](#flow)
- [Todo](#todo)

# Installation

In order for this app to be able to communicate with Google API, you need to do the [initial setup](#initial-setup-only-once-for-development). This will result in a credentials file which is needed for Google Sheets API to work.

## Initial Setup (for developer)

Follow [this Google Sheets API quickstart guide](https://developers.google.com/sheets/api/quickstart/nodejs) when you first clone the repo - if you haven't already. (Note to self: check if you have `maker-one` project in Google API console.)

Breakdown:

- Create a new project
- Enable Google Sheets API (in that project)
- Configure the OAuth consent screen
  - Publishing status: Testing (just don't publish it)
  - User Type: External
  - Test Users: add your email and emails of people that will be using it
  - Scopes can be ignored because it's not published (Testing status)
- Create credentials
  - Create: OAuth client ID
  - Application type: Desktop app
  - Name: whatever (e.g. client-1)

The credentials you made can be used for metrics and analytics. So if you create multiple credentials, Google will be able to differentiate clients when reporting response, latency, errors, etc. It is also possible to create a single credential and use it for all clients.

If you decide to use more than one OAuth credential, `PRIVACY.md` file should probably be updated.

## Setting Up Environment (for each user)

First step is for the developer to:

- make sure the user has a Google account and it is added to the test users list
- send the user a `credentials.json` file

After that, the user should:

- receive from the developer a `credentials.json` file and put it in `~/.maker-one`
- create `targets.json` file in `~/.maker-one`
- copy `template.cosessiondb` to `~/.maker-one`

After the first run, they should also have a `token.json` file in `~/.maker-one`.

### Setting Up Targets (targets.json)

This is done by creating a `targets.json` file in `~/.maker-one` directory. The file should contain the following:

```json
{
  "sheetId": "<sheet-id>",
  "sheetRange": "<sheet-range>",
  "projectsFolder": "<projects-folder>"
}
```

- `sheet-id` is the ID of the Google Sheet you want to use (e.q. `1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z`)
- `sheet-range` is the range of the sheet you want to use (e.g. `Sheet1!A1:B` will use columns A and B of the first sheet)
- `projects-folder` is the path to the folder where your Capture One projects are stored (e.g. `/Users/username/Pictures/Capture One/Projects`) - this is where the new project will be created

### Setting Up Credentials

When you first run the script, it will ask you to authorize the app to access your Google account. This will create a `token.json` file in your `~/.maker-one` directory. The token file is used to authenticate the app when it tries to access Google API and is specific to your Google account. Keep it safe and don't share it with anyone.

# File Structure

Inside of your home directory, you should end up with a `.maker-one` directory with the following files:

```
~/.maker-one/
├── credentials.json
├── targets.json
├── template.cosessiondb
└── token.json
```

- `credentials.json` is the file you received from the developer that lets the app access Google API
- `targets.json` is the file you created that tells the app which Google Sheet to use and where to create the new project
- `template.cosessiondb` is a template file that is used to create a new Capture One session
- `token.json` is the file that is created when you first run the app and authorize it to access your Google account (and subsequently your Google Sheet you specified in `targets.json`)

# Usage

|   Command   |                   Action                    |
| :---------- | :------------------------------------------ |
| `maker-one` | Start the app and new project creation flow |

# Flow

1. Read Google Sheets data to get the next project number
2. Ask user for new project name
3. Write new project name and number to Google Sheets
4. Create new folder in Capture One projects folder
5. Copy template session file to new folder
6. Update template session file with new project name
7. Open Capture One in new folder

# Todo

- [x] Update Readme
- [x] Setup Google Projects / OAuth credentials
- [x] Refactor flow
- [x] Create package and publishing flow
- [x] Publish binary to github
- [ ] Add tests
