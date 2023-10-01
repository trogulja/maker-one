import logo from '@lib/logo';
import input from '@lib/input';
import actions from '@actions';

import type { TState } from '@appTypes';

let state: TState = 'init';

async function userInput() {
  switch (state) {
    case 'init':
      state = await input.initMenu();
      return userInput();
    case 'create':
      await actions.create();
      state = 'init';
      return;
    case 'list':
      await actions.list();
      state = 'init';
      return userInput();
    // case 'search':
    //   console.log('imagine a search of projects here');
    //   state = 'init';
    //   return userInput();
    // case 'open':
    //   console.log('imagine an open of projects here');
    //   state = 'init';
    //   return userInput();
    default:
      return;
  }
}

logo();
userInput();
// show menu with last 3 project dates (do not show names)
// menu:
// 1. Create new project
// 2. List last n projects
// 2.1. Ask how many projects to list & list them
// 2.2. Search projects by name
// 2.3. Search projects by date
// 2.4. Open project by name or id
// 3. Exit

// Step 1 - get last project from google sheets

// Step 2 - ask questions
// const name = await input.projectName();
// console.log(name);

// Step 3 - write project to google sheets

// Step 4 - create project folder and files

// Step 5 - update session db file

// Step 6 - open capture one
