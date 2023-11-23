export class VisualClock extends HTMLElement {

  static observedAttributes = ["data-progress", "data-divisions", "data-fill"]

  anglePad = 3.4
  color1
  color2
  componentId

  constructor() {
    super()
    this.componentId = `nspace${Math.floor(Math.random() * 1000)}`
  }

  connectedCallback() {
    this.color1 = getComputedStyle(document.body).getPropertyValue('--c5')
    this.color2 = getComputedStyle(document.body).getPropertyValue('--c4')
    this.render()
  }

  generateWedge(startAngle, endAngle, color){
    var x1 = (50 * Math.sin(Math.PI * startAngle/180)) + 50
    var y1 = (50 * -Math.cos(Math.PI * startAngle/180)) + 50
    
    var x2 = (50 * Math.sin(Math.PI * endAngle/180)) + 50
    var y2 = (50 * -Math.cos(Math.PI * endAngle/180)) + 50

    return `<path d="M50 50 L${x1} ${y1} A50 50 0 0 0 ${x2} ${y2} z" fill="${color}" />`
  }

  colorFill(progress, idx) {
    if (progress > idx) {
      return this.color2
    } else {
      return this.color1
    }
  }

  colorNoFill(progress, idx, divisions) {
    if (progress === idx) {
      return this.color2
    } else if (progress === 0 && idx === divisions) {
      return this.color2
    } else {
      return this.color1
    }
  }

  drawTimeUnits() {
    const divisions = Number(this.dataset.divisions)
    const colorFunc = this.dataset.fill === undefined ? this.colorNoFill.bind(this) : this.colorFill.bind(this)
    // Calculate starting/stopping angles based on divisions
    const angle = 360 / divisions
    let paths = ""
    // Return a number of paths using these angles
    for (let i = 0; i < divisions; i++) {
      const angleEnd = angle * i
      const angleStart = angleEnd + angle - this.anglePad
      const progress = Number(this.dataset.progress)
      paths += this.generateWedge(angleStart, angleEnd, colorFunc(progress, i, divisions))
    }
    return paths
  }

  render() {
    this.innerHTML = `
      <svg width="100%" height="100%" viewBox="0 0 100 100">
        <mask id="${this.componentId}">
          <circle cx="50" cy="50" r="50" fill="white" />
          <circle cx="50" cy="50" r="44" fill="black" />
        </mask>
        <g mask="url(#${this.componentId})">
          ${ this.drawTimeUnits() }
        </g>
      </svg>
    `
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch(name) {
      case "data-progress":
        this.render()
        break
      case "data-divisions":
        if (oldValue !== newValue) {
          this.render()
        }
        break
    }
  } 

}
