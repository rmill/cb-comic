jQuery(document).ready(function($) {
  var audioEl = $('#soundtrack');
  var volumeIconEl = $('.volume-icon');
  var volumeSliderEl = $('.volume-slider');
  var storedVolume = window.localStorage.getItem('cb-volume-stored');
  var curVolume = window.localStorage.getItem('cb-volume');
  var muted = window.localStorage.getItem('cb-muted') === 'true';

  if (isNaN(curVolume)) {
    curVolume = 20;
  }

  if (isNaN(storedVolume)) {
    storedVolume = 20;
  }

  render();

  volumeSliderEl.on('input', function (e) {
    curVolume = e.target.value;
    storedVolume = e.target.value;
    muted = false;
    render();
  });

  volumeIconEl.click(function () {
    if (muted) {
      muted = false;
      curVolume = storedVolume;
    } else {
      muted = true;
      curVolume = 0;
    }

    render();
  });

  function render() {
    window.localStorage.setItem('cb-muted', muted);
    window.localStorage.setItem('cb-volume', curVolume);
    window.localStorage.setItem('cb-volume-stored', storedVolume);

    volumeSliderEl.val(curVolume);
    audioEl.get(0).volume = curVolume / 100;

    if (curVolume == 0) {
      volumeIconEl.removeClass('fa-volume-up').addClass('fa-volume-off');
    } else {
      volumeIconEl.removeClass('fa-volume-off').addClass('fa-volume-up');
    }
  }
});
