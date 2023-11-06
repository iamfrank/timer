export class VisualClock extends HTMLElement {

  static observedAttributes = ["data-progress", "data-divisions", "data-fill"];

  anglePad = 3
  color1 = 'hsl(300,33%,15%)'
  color2 = 'hsl(100,100%,50%)'

  constructor() {
    super()
  }

  connectedCallback() {
    this.render()
  }

  generateWedge(startAngle, endAngle, color){
    var x1 = 50 + (50 * Math.cos(Math.PI * startAngle/180))
    var y1 = 50 + (50 * Math.sin(Math.PI * startAngle/180))
    var x2 = 50 + (50 * Math.cos(Math.PI * endAngle/180))
    var y2 = 50 + (50 * Math.sin(Math.PI * endAngle/180))

    return `<path id="" d="M50 50 L${x1} ${y1} A50 50 0 0 1 ${x2} ${y2} z" fill="${color}" />`
  }

  drawTimeUnits() {
    // Calculate starting/stopping angles based on divisions
    const angle = 360 / this.dataset.divisions
    let paths = ""
    // Return a number of paths using these angles
    for (let i = 1; i <= this.dataset.divisions; i++) {
      const angleEnd = angle * i
      const angleStart = angleEnd - angle + this.anglePad
      let color = this.color1
      if (this.dataset.progress < i) {
        color = this.color2
      }
      paths += this.generateWedge(angleStart, angleEnd, color)
    }
    return paths
  }

  render() {
    this.innerHTML = `
      <svg class="visual-clock" width="100%" height="100%" viewBox="0 0 100 100">
        <defs>
          <mask id="negativespace">
            <circle cx="50" cy="50" r="50" fill="white" />
            <circle cx="50" cy="50" r="42" fill="black" />
          </mask>
        </defs>
        <g mask="url(#negativespace)">
          ${ this.drawTimeUnits() }
        </g>
      </svg>
    `
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch(name) {
      case "data-progress":
        if (oldValue !== newValue) {
          this.render()
        }
        break
    }
  } 

}
