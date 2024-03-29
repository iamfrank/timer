import { WTReady } from './wtReady.js'
import { WTWork } from './wtWork.js'
import { WTSet } from './wtSet.js'
import { getState } from "../../modules/state.js"

customElements.define('wt-ready', WTReady)
customElements.define('wt-work', WTWork)
customElements.define('wt-set', WTSet)

export class WorkoutTimer extends HTMLElement {

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
      <visual-clock data-divisions="${ this.state.worktime }" data-progress="0" data-fill></visual-clock>
      <wt-ready></wt-ready>
      <wt-work hidden></wt-work>
    `
  }
  
}
