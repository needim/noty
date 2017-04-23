new Noty({
  type: 'warning',
  layout: 'topRight',
  theme: 'mint',
  text: 'Interactive example',
  timeout: 5000,
  progressBar: true,
  closeWith: ['click', 'button'],
  animation: {
    open: 'noty_effects_open',
    close: 'noty_effects_close'
  },
  id: false,
  force: false,
  killer: false,
  queue: 'global',
  container: false,
  buttons: [],
  sounds: {
    sources: [],
    volume: 1,
    conditions: []
  },
  titleCount: {
    conditions: []
  },
  modal: false
}).show()