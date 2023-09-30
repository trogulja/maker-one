import lolcatjs from 'lolcatjs';

const logo = `

  █▀▄▀█ ██   █  █▀ ▄███▄   █▄▄▄▄     ████▄    ▄   ▄███▄
  █ █ █ █ █  █▄█   █▀   ▀  █  ▄▀     █   █     █  █▀   ▀
  █ ▄ █ █▄▄█ █▀▄   ██▄▄    █▀▀▌      █   █ ██   █ ██▄▄
  █   █ █  █ █  █  █▄   ▄▀ █  █      ▀████ █ █  █ █▄   ▄▀
     █     █   █   ▀███▀     █             █  █ █ ▀███▀
    ▀     █   ▀             ▀              █   ██
         ▀




`;

export default function showLogo() {
  console.clear();
  lolcatjs.options.seed = Math.round(Math.random() * 1000);
  lolcatjs.fromString(logo);
}
