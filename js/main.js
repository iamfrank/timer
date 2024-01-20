import { WorkoutTimer } from './components/workouttimer/workoutTimer.js'
import { StopWatch } from './components/stopwatch/stopWatch.js'
import { VisualClock } from './components/visualclock/visualClock.js'

customElements.define('visual-clock', VisualClock)
customElements.define('workout-timer', WorkoutTimer)
customElements.define('stopwatch-timer', StopWatch)

const stopwatchButton = document.querySelector('[title="Stopwatch"]')
const stopwatchElement = document.querySelector('stopwatch-timer')
const workoutButton = document.querySelector('[title="Workout timer"]')
const workoutElement = document.querySelector('workout-timer')

stopwatchButton.addEventListener('click', function(event) {
  workoutElement.hidden = true
  stopwatchElement.hidden = false
})

workoutButton.addEventListener('click', function(event) {
  stopwatchElement.hidden = true
  workoutElement.hidden = false
})
