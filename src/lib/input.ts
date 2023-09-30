import inquirer from 'inquirer';

class Input {
  async projectName() {
    const response: {name: string} = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the project?',
      },
    ]);

    return response.name;
  }
}

const input = new Input();
export default input;
