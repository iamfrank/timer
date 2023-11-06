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

    window.addEventListener('statechange', this.handleStateChange.bind(this))
  }

  disconnectedCallback() {
    window.removeEventListener('statechange', this.handleStateChange)
  }

  render() {
    this.innerHTML = `
      <h1>Workout</h1>
      <section class="timer-program">
        <p>${ this.state.intervals } reps</p>
        <dl>
          <dt>Work</dt>
          <dd>${ this.state.worktime } seconds</dd>
          <dt>Break</dt>
          <dd>${ this.state.breaktime } seconds</dd>
        </dl>
      </section>
      <p class="timer-change-button">
        <button id="changeBtn" class="secondary">Change</button>
      </p>
      <p class="timer-go-button">
        <button id="goBtn" class="primary">Go</button>
      </p>
    `
    this.querySelector('#goBtn').addEventListener('click', this.handleGo.bind(this))
    this.querySelector('#changeBtn').addEventListener('click', this.handleChange.bind(this))
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

  handleStateChange(event) {
    this.state = getState()
    this.render()
  }

}
