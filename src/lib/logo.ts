import lolcatjs from 'lolcatjs';
const version = require('@package').version;

const logo = `

  █▀▄▀█ ██   █  █▀ ▄███▄   █▄▄▄▄     ████▄    ▄   ▄███▄
  █ █ █ █ █  █▄█   █▀   ▀  █  ▄▀     █   █     █  █▀   ▀
  █ ▄ █ █▄▄█ █▀▄   ██▄▄    █▀▀▌      █   █ ██   █ ██▄▄
  █   █ █  █ █  █  █▄   ▄▀ █  █      ▀████ █ █  █ █▄   ▄▀
     █     █   █   ▀███▀     █             █  █ █ ▀███▀
    ▀     █   ▀             ▀              █   ██
         ▀
                                           v${version}


`;

export default function showLogo() {
  console.clear();
  lolcatjs.options.seed = Math.round(Math.random() * 1000);
  lolcatjs.fromString(logo);
}
