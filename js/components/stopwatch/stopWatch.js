export class StopWatch extends HTMLElement {

    // Properties
    global_state
    ui_timer
    ui_start_btn
    ui_stop_btn
    ui_resume_btn
    ui_clear_btn
    ui_sec_el
    ui_min_el
    ui_hrs_el
    ui_marker
    update_event = new CustomEvent("timerupdate", {
      detail: {
        state: this.global_state
      }
    })

    constructor() {
      super()
      this.global_state = this.getState()
    }

    connectedCallback() {

      this.render()

      this.ui_timer = document.querySelector('#timer')
      this.ui_start_btn = document.querySelector('.timer--btn-start')
      this.ui_stop_btn = document.querySelector('.timer--btn-stop')
      this.ui_resume_btn = document.querySelector('.timer--btn-resume')
      this.ui_clear_btn = document.querySelector('.timer--btn-clear')
      this.ui_sec_el = document.querySelector('.timer-time--seconds')
      this.ui_min_el = document.querySelector('.timer-time--minutes')
      this.ui_hrs_el = document.querySelector('.timer-time--hours')
      this.ui_marker = document.querySelector('.timer--marker-live')

      this.ui_start_btn.addEventListener('click', function() { this.startTimer() })
      this.ui_stop_btn.addEventListener('click', function() { this.stopTimer() })
      this.ui_resume_btn.addEventListener('click', function() { this.resumeTimer() })
      this.ui_clear_btn.addEventListener('click', function() { this.clearTimer() })

      for (let i = 0; i < 60; i++) {
        let notch = document.createElement('span')
        notch.setAttribute('class', 'timer--marker')
        notch.style.transform = `rotate(${ i * 6 }deg)`
        this.ui_timer.appendChild(notch)
      }

      if (this.global_state.engaged === true) {
        this.ui_start_btn.style.display = 'none'
        this.ui_resume_btn.style.display = 'none'
        this.ui_clear_btn.style.display = 'none'
        this.ui_stop_btn.style.display = 'block'
        this.global_state.local_elapsed = Date.now() - this.global_state.started
        this.setState(this.global_state)
        this.updateTime(this.global_state.elapsed)
        this.ticktock()
      } else if (this.global_state.elapsed) {
        this.ui_start_btn.style.display = 'none'
        this.ui_stop_btn.style.display = 'none'
        this.ui_resume_btn.style.display = 'block'
        this.ui_clear_btn.style.display = 'block'
        this.updateTime(this.global_state.elapsed)
      } else {
        this.ui_stop_btn.style.display = 'none'
        this.ui_resume_btn.style.display = 'none'
        this.ui_clear_btn.style.display = 'none'
        this.ui_start_btn.style.display = 'block'
      }
    }

    render() {
      this.innerHTML = `
        <article id="timer">

          <h1>Stopwatch</h1>

          <p class="timer-time">
            <span class="timer-time--hours" title="hours">00</span>
            <span class="timer-time--minutes" title="minutes">00</span>
            <span class="timer-time--seconds" title="seconds">00</span>
          </p>

          <button class="timer--btn-start">Start</button>
          <button class="timer--btn-stop" style="display: none;">Stop</button>
          <div style="display: flex; flex-flow: row nowrap; justify-content: space-between; align-items: center;">
            <button class="timer--btn-resume" style="display: none;">Resume</button>
            <button class="timer--btn-clear" style="display: none;">Clear</button>
          </div>

          <span class="timer--marker-live"></span>

        </article>
      `
    }

    startTimer() {
      this.setState({
          engaged: true,
          started: Date.now(),
          local_elapsed: 0,
          elapsed: 0
      })
      this.ticktock()
      this.ui_start_btn.style.display = 'none'
      this.ui_stop_btn.style.display = 'block'
    }

    resumeTimer() {
      var state = this.getState()
      state.engaged = true
      state.started = Date.now()
      this.setState(state)
      this.updateTime(state.elapsed)
      this.ticktock()
      this.ui_start_btn.style.display = 'none'
      this.ui_resume_btn.style.display = 'none'
      this.ui_clear_btn.style.display = 'none'
      this.ui_stop_btn.style.display = 'block'
    }

    stopTimer() {
      var state = this.getState()
      state.engaged = false
      state.elapsed = state.elapsed + ( Date.now() - state.started )
      this.setState(state)
      this.ui_start_btn.style.display = 'none'
      this.ui_stop_btn.style.display = 'none'
      this.ui_resume_btn.style.display = 'block'
      this.ui_clear_btn.style.display = 'block'
    }

    clearTimer() {
      var state = {
          engaged: false,
          started: null,
          elapsed: 0,
          local_elapsed: 0
      }
      this.setState(state)
      this.updateTime(0)
      this.ui_resume_btn.style.display = 'none'
      this.ui_clear_btn.style.display = 'none'
      this.ui_start_btn.style.display = 'block'
    }

    updateTime(elapsed) {
      const time = Math.floor( elapsed / 1000 ),
            secs = time % 60,
            mins = Math.floor( time / 60) % 60,
            hrs = Math.floor( time / 3600 )
      this.ui_sec_el.innerHTML = this.dispNum(secs)
      this.ui_min_el.innerHTML = this.dispNum(mins)
      this.ui_hrs_el.innerHTML = this.dispNum(hrs)
      this.ui_marker.style.transform = `rotate(${ secs * 6 }deg)`
    }

    ticktock() {
      if (this.global_state.engaged) {
        this.global_state.local_elapsed = Date.now() - this.global_state.started
        this.updateTime(( this.global_state.elapsed + this.global_state.local_elapsed ))
          setTimeout(function() {
            this.ticktock()
          }, 200)
      } else {
          return false
      }
    }

    dispNum(num) {
      var s = num + ""
      while (s.length < 2) s = "0" + s
      return s
    }

    setState(state) {
      this.global_state = state
      localStorage.setItem('timerstate', JSON.stringify(state))
      document.dispatchEvent(this.update_event)
    }

    getState() {
      var state = JSON.parse(localStorage.getItem('timerstate'))
      if (!state) {
          state = {
              engaged: false,
              started: null,
              elapsed: 0,
              local_elapsed: 0
          }
      }        
      return state
    }
}