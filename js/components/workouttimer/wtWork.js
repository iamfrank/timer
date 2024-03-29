import { beepEnd, beepStart } from "../../modules/soundEffects.js"
import { ScreenLock } from '../../modules/screenlock.js'
import { getState } from "../../modules/state.js"

export class WTWork extends HTMLElement {

  #state
  #sLoc
  #program
  #workoutRunning = false
  #messageElement
  #clockElement
  #countdownElement
  #template = `
    <section id="status">
      <div class="message">Get ready!</div>
      <p class="clockwrapper">
        <span class="countdown"></span>:00
      </p>
    </section>
    <button class="primary" title="End" id="endBtn">
      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
        <path d="M240-240v-480h480v480H240Z"/>
      </svg>
    </button>
  `

  constructor() {
    super()
    this.#sLoc = new ScreenLock()
  }
  
  connectedCallback() {
    this.innerHTML = this.#template
    this.#messageElement = this.querySelector('.message')
    this.#clockElement = document.querySelector('workout-timer visual-clock')
    this.#countdownElement = this.querySelector('.countdown')
    this.querySelector('#endBtn').addEventListener('click', this.handleEnd.bind(this))
  }

  disconnectedCallback() {
    this.#sLoc.disable()
  }
  
  handleEnd(event) {
    this.#workoutRunning = false
    this.#sLoc.disable()
    document.querySelector('wt-work').hidden = true
    document.querySelector('wt-ready').hidden = false
  }
  
  startWorkout() {
    this.#state = getState()
    this.#sLoc.enable()
    this.#program = this.#compileProgram(this.#state)
    this.#workoutRunning = true
    this.#runWorkout(0,0)
  }
  
  #compileProgram(dataset) {
    let program = []
    for (let i = 0; i < dataset.intervals; i++) {
      program.push([dataset.breaktime, false])
      program.push([dataset.worktime, true])
    } 
    return program
  }

  #formatElapsedTime(time, duration) {
    const timeRemaining = duration - time
    if (timeRemaining < 10) {
      return '0' + timeRemaining
    } else {
      return timeRemaining
    }
  }
  
  #updateTextClock(phase, elapsedTime, idx, length) {
    const msg = phase[1] ? 'Work' : 'Pause'
    this.#messageElement.innerHTML = `
      <p class="${ phase[1] ? 'work-msg' : 'pause-msg'}">${ msg }</p>
      <p class="rep-msg">
        Rep <span>${ Math.ceil((idx + 1) / 2) }/${ length / 2 }</span>
      </p>
    `
    this.#countdownElement.innerText = this.#formatElapsedTime(elapsedTime, Number(phase[0]))
  }

  #updateVisualClock(elapsedTime, phase) {
    this.#clockElement.dataset.divisions = phase[0]
    this.#clockElement.dataset.progress = elapsedTime
  }
  
  #runWorkout(idx, elapsed) {
    if (!this.#workoutRunning) {
      this.#sLoc.disable()
      return
    }

    const phase = this.#program[idx]
    if (this.#program.length > idx) {

      if (elapsed === 0) {
        phase[1] ? beepStart() : beepEnd()
      }

      this.#updateTextClock(phase, elapsed, idx, this.#program.length)
      this.#updateVisualClock(elapsed, phase)
      
      setTimeout(() => {
        const new_elapsed = elapsed + 1
        if (new_elapsed > phase[0]) {
          this.#runWorkout(idx + 1, 0)
        } else {
          this.#runWorkout(idx, new_elapsed)
        }
      }, 1000)
    } else {
      this.#messageElement.innerHTML = '<p class="work-msg">All done</p>'
      return false
    }
  }
}
