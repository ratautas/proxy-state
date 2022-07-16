const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const openModal = (modalId, previousModalId) => {
  if (modalId === previousModalId) return;
  console.log({ modalId, previousModalId });
};

const initialState = {
  activeModalId: null,
  hash: null,
};

// Expose to window so it would be reachable with inline scripts
window.state = new Proxy(initialState, {
  set(state, key, value) {
    const previousValue = state[key];

    state[key] = value;

    switch (key) {
      case 'activeModalId':
        return openModal(value, previousValue);
      case 'hash': {
        console.log('hash');
        return;
      }
      default: {
        console.log('Unhandled state key: ', key);
        return;
      }
    }
  },
});

const clickHandler = (event) => {
  if (event.defaultPrevented) return;

  const closest = event.target.closest.bind(event.target);

  const $modalTrigger = closest('[data-modal-trigger]');

  if ($modalTrigger) state.activeModalId = $modalTrigger.dataset.modalTrigger;
};

const hashchangeHandler = () => (state.hash = window.location.hash);

window.addEventListener('click', clickHandler, true);
window.addEventListener('hashchange', hashchangeHandler, true);
