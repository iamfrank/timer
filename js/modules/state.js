const localstoragekey = 'iamfrankWorkoutTimer1'
const defaults = {
  worktime: 30,
  breaktime: 10,
  intervals: 15
}
const stateChangeEvent = new CustomEvent('statechange', {bubbles: true})

function getState() {
  if (localStorage.getItem(localstoragekey)) {
    return JSON.parse(localStorage.getItem(localstoragekey))
  } else {
    setState(defaults)
    return defaults
  }
}

function setState(state) {
  const newState = {
    worktime: state.worktime,
    breaktime: state.breaktime,
    intervals: state.intervals
  }
  localStorage.setItem(localstoragekey, JSON.stringify(newState))
  document.dispatchEvent(stateChangeEvent)
  return state
}


export {
  getState,
  setState
}