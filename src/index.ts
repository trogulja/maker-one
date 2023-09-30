import showLogo from '@lib/logo';
import input from '@lib/input';

showLogo();
// Step 1 - get last project from google sheets

// Step 2 - ask questions
const name = await input.projectName();
console.log(name);

// Step 3 - write project to google sheets

// Step 4 - create project folder and files

// Step 5 - update session db file

// Step 6 - open capture one
