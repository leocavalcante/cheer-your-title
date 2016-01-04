;(function () {
  function slide(title, sliceLength) {
    var titleSlice = title.slice(this.frame, this.frame + sliceLength);
    window.document.title = titleSlice;
    this.frame += 1;

    if (this.frame >= title.length) {
      this.frame = -1;
    }
  }

  function blink(title) {
    if (this.visible) {
      window.document.title = title;
    } else {
      window.document.title = '\u200E';
    }

    this.visible =! this.visible;
  }

  function play(fx, speed) {
    fx();
    return setInterval(fx, speed);
  }

  function factory(title) {
    var interval;

    return {
      slide: function (speed, sliceLength) {
        interval = play(slide.bind({frame: 0}, title, sliceLength), speed);
        return this;
      },

      blink: function (speed) {
        interval = play(blink.bind({visible: true}, title), speed);
        return this;
      },

      stop: function () {
        clearInterval(interval);
        window.document.title = title;
        return this;
      }
    };
  }

  if (typeof window.cheerYourTitle === 'undefined') {
    window.cheerYourTitle = factory;
  }
}());