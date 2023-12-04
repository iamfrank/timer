import { getState, setState } from "../../modules/state.js"

export class WTSet extends HTMLElement {

  state

  constructor() {
    super()
  }
  
  connectedCallback() {
    this.state = getState()

    this.render()

    window.addEventListener('statechange', this.handleStateChange.bind(this))
  }

  disconnectedCallback() {
    window.removeEventListener('statechange', this.handleStateChange)
  }

  render() {
    this.innerHTML = `
      <form>
        <fieldset>
          <label for="worktime">Workout duration</label>
          <input id="worktime" type="number" value="${ this.state.worktime }">
        </fieldset>
        <fieldset>
          <label for="breaktime">Pause duration</label>
          <input id="breaktime" type="number" value="${ this.state.breaktime }">
        </fieldset>
        <fieldset>
          <label for="intervals">Sets</label>
          <input id="intervals" type="number" value="${ this.state.intervals }">
        </fieldset>
        <fieldset class="timer-save-button">
          <button id="saveBtn" class="primary">Save</button>
        </fieldset>
      </form>
    `
    this.querySelector('form').addEventListener('submit', this.handleSave.bind(this))
  }
  
  handleSave(event) {
    event.preventDefault()
    setState({
      worktime: this.querySelector('#worktime').value,
      breaktime: this.querySelector('#breaktime').value,
      intervals: this.querySelector('#intervals').value
    })
    document.querySelector('wt-set').hidden = true
    document.querySelector('wt-ready').hidden = false
    document.querySelector('wt-ready').render()
  }

  handleStateChange(event) {
    this.state = getState()
    this.render()
  }
  
}

