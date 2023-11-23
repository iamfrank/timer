import { WorkoutTimer } from './components/workouttimer/workoutTimer.js'
import { StopWatch } from './components/stopwatch/stopWatch.js'
import { VisualClock } from './components/visualclock/visualClock.js'

customElements.define('visual-clock', VisualClock)
customElements.define('workout-timer', WorkoutTimer)
customElements.define('stopwatch-timer', StopWatch)

const navbarElement = document.querySelector('#navbar')
const stopwatchElement = document.querySelector('stopwatch-timer')
const workoutElement = document.querySelector('workout-timer')

navbarElement.addEventListener('click', function(event) {
  if (event.target.innerText === 'Stopwatch') {
    workoutElement.hidden = true
    stopwatchElement.hidden = false
  } else if (event.target.innerText === 'Workout') {
    stopwatchElement.hidden = true
    workoutElement.hidden = false
  }
})
