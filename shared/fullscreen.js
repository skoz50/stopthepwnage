(function() {
  const btn = document.querySelector('[data-fullscreen-toggle]');
  if (!btn) return;

  const enterIcon =
    '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M5 5h5v2H7v3H5V5zm9 0h5v5h-2V7h-3V5zM5 14h2v3h3v2H5v-5zm12 0h2v5h-5v-2h3v-3z"/></svg>';
  const exitIcon =
    '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M9 3h2v7H4V8h3.6L3.8 4.2l1.4-1.4L9 6.6V3zm4 0h2v3.6l3.8-3.8 1.4 1.4L16.4 8H20v2h-7V3zM4 14h7v7H9v-3.6l-3.8 3.8-1.4-1.4L7.6 16H4v-2zm9 0h7v2h-3.6l3.8 3.8-1.4 1.4-3.8-3.8V21h-2v-7z"/></svg>';

  const fullscreenElement = () => document.fullscreenElement || document.webkitFullscreenElement;
  const canEnter = document.documentElement.requestFullscreen || document.documentElement.webkitRequestFullscreen;
  const canExit = document.exitFullscreen || document.webkitExitFullscreen;

  if (!canEnter || !canExit) {
    btn.hidden = true;
    return;
  }

  function updateButton() {
    const isFullscreen = !!fullscreenElement();
    btn.innerHTML = isFullscreen ? exitIcon : enterIcon;
    btn.setAttribute(
      'aria-label',
      isFullscreen ? 'Exit fullscreen presentation mode' : 'Enter fullscreen presentation mode'
    );
    btn.title = isFullscreen ? 'Exit present mode' : 'Present mode (ESC to exit)';
  }

  btn.addEventListener('click', async function() {
    try {
      if (fullscreenElement()) {
        await canExit.call(document);
      } else {
        await canEnter.call(document.documentElement);
      }
    } catch (err) {
      console.warn('Fullscreen toggle failed:', err);
    }
  });

  document.addEventListener('fullscreenchange', updateButton);
  document.addEventListener('webkitfullscreenchange', updateButton);
  updateButton();
})();
