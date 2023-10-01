import inquirer from 'inquirer';
import { formatDate } from '@lib/utility';

import type {TState} from '@appTypes';

class Input {
  get randInitMenuMessage() {
    const messages = [
      'Camera roll ready! What\'s the frame-worthy idea today?',
      'Camera set, imagination ready! What\'s the story you want to unfold?',
      'Camera, action, attitude! What\'s your photographic swagger?',
      'Capture the cosmos or the candid? Your wish is my command!',
      'Capture the moment or create the magic? What\'s your call?',
      'Channeling your inner artist? What\'s the shot you\'re after?',
      'Click and conquer or shoot and strut? What\'s your mood?',
      'Click, click, hooray! What\'s your click-worthy idea today?',
      'Fancy a frame? What\'s the masterpiece in your mind?',
      'Feeling artsy? Tell me, what\'s your vision today?',
      'Feeling shutter-happy? What\'s your focus today, champ?',
      'Frame it or forget it? Tell me, what\'s your frame of mind?',
      'Frame the fantasy! What\'s your dreamy click idea?',
      'In the mood for pixels and poses? What\'s your moodboard?',
      'Lens at the ready! What\'s your photo fantasy, friend?',
      'Lens focused, creativity unbound! What\'s your photo escapade?',
      'Lens in hand, creativity at play! What\'s your visionary quest?',
      'Life through the lens! What\'s your desired snapshot?',
      'Lights, camera, cheeky grin! What\'s your sassy snapshot plan?',
      'Lights, camera, sass! What\'s your command, maestro?',
      'Photo fever rising! What\'s your snapshot fantasy today?',
      'Photography dreams calling! What\'s the magical moment you seek?',
      'Photography dreams loading... What\'s your wish for today\'s shoot?',
      'Photography game strong! What\'s the winning shot in your mind?',
      'Photography vibes on! What\'s your picture-perfect plan?',
      'Picture-perfect plans? I\'m all ears, spill the lens secrets!',
      'Pixel power activated! What\'s the vision you want to capture?',
      'Ready to capture brilliance? What\'s your photographic plot?',
      'Ready to capture some magic? What\'s your move?',
      'Ready to lens the world? What\'s your click command?',
      'Ready, set, click! What\'s the story you want to tell today?',
      'Shutter speed or slow-mo? What\'s your photography tempo?',
      'Shutterbug alert! What\'s the focus of your creativity?',
      'Snap-happy or picture-picky? What\'s your style today?',
      'Snap-happy? Spill the beans, what\'s the plan?',
      'Strike a pose or plan your pros? Your move, photographer!',
      'Strike a pose! What\'s on your photography agenda?',
      'Strike while the lens is hot! What\'s your focus today?',
      'Time to click and conquer! Your move, photographer.',
      'Time to frame your fame! What\'s the masterpiece you\'re planning?',
    ];

    return messages[Math.floor(Math.random() * messages.length)];
  }

  async initMenu() {
    const response: {choice: TState} = await inquirer.prompt([
      {
        type: 'list',
        name: 'choice',
        message: this.randInitMenuMessage,
        choices: [
          {name: 'Create new project', value: 'create'},
          {name: 'List projects', value: 'list'},
          // {name: 'Search projects', value: 'search'},
          // {name: 'Open project', value: 'open'},
          {name: 'Exit', value: 'exit'},
        ],
      },
    ]);

    return response.choice;
  }

  async projectsAmount() {
    const response: {amount: number} = await inquirer.prompt([
      {
        type: 'number',
        name: 'amount',
        message: 'How many?',
      },
    ]);

    return response.amount;
  }

  async projectName() {
    const response: {name: string} = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Name?',
      },
    ]);

    return response.name;
  }

  async projectDate() {
    const response: {date: string} = await inquirer.prompt([
      {
        type: 'input',
        name: 'date',
        default: formatDate(new Date()),
        message: 'Date?',
      },
    ]);

    return response.date;
  }
}

const input = new Input();
export default input;
