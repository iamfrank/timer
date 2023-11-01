import { beepEnd, beepStart } from "../modules/soundEffects.js"
import { ScreenLock } from '../modules/screenlock.js'
import { getState } from "../modules/state.js"

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
        <svg class="clock" viewbox="0 0 200 200">
          <path id="pieSlice"></path>
        </svg>
        <span class="countdown"></span>
      </p>
    </section>
    <button id="endBtn">End</button>
  `

  constructor() {
    super()
    this.#sLoc = new ScreenLock()
  }
  
  connectedCallback() {
    this.innerHTML = this.#template
    this.#messageElement = this.querySelector('.message')
    this.#clockElement = this.querySelector('.clock')
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
    setTimeout(this.#runWorkout(0,0), 3000)
  }
  
  #compileProgram(dataset) {
    let program = []
    for (let i = 0; i < dataset.intervals; i++) {
      program.push([dataset.breaktime, false])
      program.push([dataset.worktime, true])
    } 
    return program
  }
  
  #updateClock(phase, elapsedTime, idx, length) {
    const msg = phase[1] ? 'Work' : 'Pause'
    this.#messageElement.innerHTML = `
      <p class="${ phase[1] ? 'work-msg' : 'pause-msg'}">${ msg }</p>
      <p class="rep-msg">
        Rep <span>${ Math.ceil((idx + 1) / 2) }/${ length / 2 }</span>
      </p>
    `
    this.#countdownElement.innerText = elapsedTime
    const pieSliceValue = elapsedTime / phase[0] * Math.PI * 2
    this.#updatePieSlice(this.#clockElement, 0, pieSliceValue)
  }
  
  #runWorkout(idx, elapsed) {
    if (!this.#workoutRunning) {
      this.#sLoc.disable()
      return
    }

    const phase = this.#program[idx]
    if (this.#program.length > idx) {
      this.#updateClock(phase, elapsed, idx, this.#program.length)
      setTimeout(() => {
        const new_elapsed = elapsed + 1
        if (new_elapsed > phase[0]) {
          phase[1] ? beepStart() : beepEnd()
          const new_idx = idx + 1
          this.#runWorkout(new_idx, 0)
        } else {
          this.#runWorkout(idx, new_elapsed)
        }
      }, 1000)
    } else {
      this.#messageElement.innerHTML = '<p class="work-msg">All done</p>'
      return false
    }
  }

  // Function to update the pie slice angles
  #updatePieSlice(element, startAngle, endAngle) {
    const radius = 100;
    const centerX = 100;
    const centerY = 100;

    const startX = centerX + radius * Math.cos(startAngle);
    const startY = centerY + radius * Math.sin(startAngle);

    const endX = centerX + radius * Math.cos(endAngle);
    const endY = centerY + radius * Math.sin(endAngle);

    const largeArcFlag = endAngle - startAngle <= Math.PI ? 0 : 1;

    const pathData = [
      `M ${centerX} ${centerY}`,
      `L ${startX} ${startY}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
      'Z'
    ].join(' ')

    element.querySelector('path').setAttribute('d', pathData)
  }
  
}
