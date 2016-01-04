import slide from './fx/slide.js';
import blink from './fx/blink.js';

function play(fx, speed) {
  fx();
  return setInterval(fx, speed);
}

export function create(title) {
  let interval = 0;
  
  return {
    slide(speed, sliceLength) {
      interval = play(slide.bind({frame: 0}, title, sliceLength), speed);
      return this;
    },

    blink(speed) {
      interval = play(blink.bind({visible: true}, title), speed);
      return this;
    },

    stop() {
      clearInterval(interval);
      window.document.title = title;
      return this;
    }
  };
}