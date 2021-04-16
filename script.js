//fullscreen
let switching = false;
let fullscreen = false;

const toggleFullscreen = async () => {
  if (switching) {
    return;
  }
  switching = true;
  if (fullscreen) {
    document.exitFullscreen();
  } else {
    await document.documentElement.requestFullscreen();
  }
  fullscreen = !fullscreen;
  switching = false;
};

const btn = document.querySelector('.fullscreen');

if (btn) {
  btn.addEventListener('click', toggleFullscreen);
}

// playing piano
const piano = document.querySelector('.piano');
const switchBtn = document.querySelector('.btn-container');
const keys = [...document.querySelectorAll('.piano-key')];
const buttons = [...document.querySelectorAll('.btn')];
let isPressed = false;

const mouseDownHandler = (event) => {
  if (event.target.classList.contains('piano-key')) {
    event.target.classList.add('piano-key-active');
    event.target.classList.add('piano-key-active-pseudo');
    playSound(event.target);
    isPressed = true;
  }
}

const mouseUpHandler = (event) => {
  if (event.target.classList.contains('piano-key')) {
    event.target.classList.remove('piano-key-active');
    event.target.classList.remove('piano-key-active-pseudo');
  }
  isPressed = false;
}

const mouseOverHandler = (event) => {
  if (event.target.classList.contains('piano-key') && isPressed) {
    event.target.classList.add('piano-key-active');
    event.target.classList.add('piano-key-active-pseudo');
    playSound(event.target);
  }
}

const mouseOutHandler = (event) => {
  if (event.target.classList.contains('piano-key')) {
    event.target.classList.remove('piano-key-active');
    event.target.classList.remove('piano-key-active-pseudo');
  }
}

const keyDownHandler = (event) => {
  if (event.repeat) return;
  const pianoKey = document.querySelector(`.piano-key[data-letter="${event.code.replace(/Key/g, '')}"]`);
  if (pianoKey) {
    pianoKey.classList.add('piano-key-active');
    pianoKey.classList.add('piano-key-active-pseudo');
    playSound(pianoKey);
  }
}

const keyUpHandler = (event) => {
  const pianoKey = document.querySelector(`.piano-key[data-letter="${event.code.replace(/Key/g, '')}"]`);
  if (pianoKey) {
    pianoKey.classList.remove('piano-key-active');
    pianoKey.classList.remove('piano-key-active-pseudo');
  }  
}

const switchButton = (event) => {
  if (event.target.classList.contains('btn')) {
    buttons.forEach(el => {
      el.classList.remove('btn-active');
    })
    event.target.classList.add('btn-active');
  }
  if (event.target.classList.contains('btn-letters')) {
    keys.forEach(el => {
      el.classList.add('piano-key-letter');
    })
  }
  if (event.target.classList.contains('btn-notes')) {
    keys.forEach(el => {
      el.classList.remove('piano-key-letter');
    })
  }
}

const playSound = (e) => {
  const audio = new Audio(`./assets/audio/${e.dataset.note}.mp3`);

  if (!audio) return;
  audio.currentTime = 0;
  audio.play();
}

piano.addEventListener('mousedown', mouseDownHandler);
document.addEventListener('mouseup', mouseUpHandler);
piano.addEventListener('mouseover', mouseOverHandler);
piano.addEventListener('mouseout', mouseOutHandler);
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);
switchBtn.addEventListener('click', switchButton);