import { getState, setState } from "../../modules/state.js"

export class WTSet extends HTMLElement {

  state

  constructor() {
    super()
  }
  
  connectedCallback() {
    this.state = getState()

    this.render()
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
      </form>
    `
    this.querySelector('form').addEventListener('change', this.handleChange.bind(this))
  }
  
  handleChange(event) {
    setState({
      worktime: this.querySelector('#worktime').value,
      breaktime: this.querySelector('#breaktime').value,
      intervals: this.querySelector('#intervals').value
    })
  }  
}

