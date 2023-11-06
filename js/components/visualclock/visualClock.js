export class VisualClock extends HTMLElement {

  anglePad = 3

  style = `
    
    .visual-clock-unit {
      position: absolute;
      top: 0;
      left: 50%;
      margin-left: -.9vmin;
      display: block;
      height: 6vmin;
      width: 1.8vmin;
      background-color: var(--c4);
      transform-origin: 50% 50%;
      z-index: -1;
    }
  `

  constructor() {
    super()
  }

  connectedCallback() {
    this.render()
  }

  generateWedge(startAngle, endAngle){
    var x1 = 50 + (50 * Math.cos(Math.PI * startAngle/180))
    var y1 = 50 + (50 * Math.sin(Math.PI * startAngle/180))
    var x2 = 50 + (50 * Math.cos(Math.PI * endAngle/180))
    var y2 = 50 + (50 * Math.sin(Math.PI * endAngle/180))

    return `<path d="M50 50 L${x1} ${y1} A50 50 0 0 1 ${x2} ${y2} z" fill="pink" />`
  }

  drawTimeUnits() {
    // Calculate starting/stopping angles based on divisions
    const angle = 360 / this.dataset.divisions
    let paths = ""
    // Return a number of paths using these angles
    for (let i = 1; i <= this.dataset.divisions; i++) {
      const angleEnd = angle * i
      const angleStart = angleEnd - angle + this.anglePad
      paths += this.generateWedge(angleStart, angleEnd)
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

}
