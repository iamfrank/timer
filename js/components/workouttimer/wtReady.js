import { getState } from "../../modules/state.js"

export class WTReady extends HTMLElement {

  state
  workEl
  setEl

  constructor() {
    super()
  }
  
  connectedCallback() {
    this.state = getState()
    
    this.workEl = document.querySelector('wt-work')
    this.setEl = document.querySelector('wt-set')
    
    this.render()
  }

  render() {
    this.innerHTML = `
      <h1>Workout timer</h1>
      <wt-set></wt-set>
      <button class="primary" title="Go" id="goBtn">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
          <path d="M320-200v-560l440 280-440 280Z"/>
        </svg>
      </button>
    `
    this.querySelector('#goBtn').addEventListener('click', this.handleGo.bind(this))
  }
  
  handleGo(event) {
    this.hidden = true
    this.workEl.hidden = false
    this.workEl.startWorkout()
  }
  
  handleChange(event) {
    this.hidden = true
    this.setEl.hidden = false
  }

}
