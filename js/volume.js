jQuery(document).ready(function($) {
  var audio = $('#audio');
  var volume = $('.volume');
  var muted = window.localStorage.getItem('cb-muted');

  audio.get(0).muted = muted === null ? false : muted;
  render();

  volume.click(function () {
    audio.get(0).muted = !audio.get(0).muted;
    window.localStorage.setItem('cb-muted', audio.get(0).muted);
    render();
  });

  function render() {
    if (audio.get(0).muted) {
      volume.removeClass('fa-volume-up').addClass('fa-volume-off');
    } else {
      volume.removeClass('fa-volume-off').addClass('fa-volume-up');
    }
  }
});
