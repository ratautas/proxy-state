const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const openModal = (modalId, previousModalId) => {
  // loose equality to skip undefined
  if (modalId == previousModalId) return;
  console.log('dont return');
};

const initialState = {
  activeModalId: null,
  hash: null,
};

export const state = new Proxy(initialState, {
  set(state, key, value) {
    const previousValue = state[key];

    if (key === 'activeModalId') {
      openModal(value, previousValue);
    }

    if (key === 'hash') {
      console.log('hash');
    }

    state[key] = value;
  },
});

const clickHandler = (event) => {
  if (event.defaultPrevented) return;

  const closest = event.target.closest.bind(event.target);

  state.activeModalId = closest('[data-modal-trigger]')?.dataset?.modalTrigger;
};

const hashchangeHandler = () => (state.hash = window.location.hash);

window.addEventListener('click', clickHandler, true);
window.addEventListener('hashchange', hashchangeHandler, true);

// Expose state to window so it would be reachable with inline scripts
window.state = state;
