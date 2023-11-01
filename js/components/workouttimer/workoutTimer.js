import { WTReady } from './wtReady.js'
import { WTWork } from './wtWork.js'
import { WTSet } from './wtSet.js'

customElements.define('wt-ready', WTReady)
customElements.define('wt-work', WTWork)
customElements.define('wt-set', WTSet)

export class WorkoutTimer extends HTMLElement {

  constructor() {
    super()
  }
  
  connectedCallback() {
    this.render()
  }

  render() {
    this.innerHTML = `
      <wt-ready></wt-ready>
      <wt-set hidden></wt-set>
      <wt-work hidden></wt-work>
    `
  }
  
}
