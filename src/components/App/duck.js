export function nextSlide() {
  return {
    type: 'NEXT_SLIDE'
  };
}

export function prevSlide() {
  return {
    type: 'PREV_SLIDE'
  };
}

export default function reducer (state = 0, action) {
  switch (action.type) {
    case 'NEXT_SLIDE':
      return state + 1;
    case 'PREV_SLIDE':
      return state - 1;
    default:
      return state;
  }
}
