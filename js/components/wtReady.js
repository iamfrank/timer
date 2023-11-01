import { getState } from "../modules/state.js"

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
      <h2>Ready</h2>
      <dl>
        <dt>Work</dt>
        <dd>${ this.state.worktime } seconds</dd>
        <dt>Break</dt>
        <dd>${ this.state.breaktime } seconds</dd>
        <dt>Repetitions</dt>
        <dd>${ this.state.intervals }</dd>
      </dl>
      <p>
        <button id="goBtn">Go</button>
      </p>
      <p>
        <button id="changeBtn" class="secondary">Change</button>
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
