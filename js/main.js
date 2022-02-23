(function() {


    // Properties

    let global_state = getState()

    const ui_timer = document.querySelector('#timer'),
          ui_start_btn = document.querySelector('.timer--btn-start'),
          ui_stop_btn = document.querySelector('.timer--btn-stop'),
          ui_resume_btn = document.querySelector('.timer--btn-resume'),
          ui_clear_btn = document.querySelector('.timer--btn-clear'),
          ui_sec_el = document.querySelector('.timer-time--seconds'),
          ui_min_el = document.querySelector('.timer-time--minutes'),
          ui_hrs_el = document.querySelector('.timer-time--hours'),
          ui_marker = document.querySelector('.timer--marker-live'),
          update_event = new CustomEvent("timerupdate", {
            detail: {
                state: global_state
            }
          })


    // Methods

    function startTimer() {
        setState({
            engaged: true,
            started: Date.now(),
            local_elapsed: 0,
            elapsed: 0
        })
        ticktock()
        ui_start_btn.style.display = 'none'
        ui_stop_btn.style.display = 'block'
    }

    function resumeTimer() {
        var state = getState()
        state.engaged = true
        state.started = Date.now()
        setState(state)
        updateTime(state.elapsed)
        ticktock()
        ui_start_btn.style.display = 'none'
        ui_resume_btn.style.display = 'none'
        ui_clear_btn.style.display = 'none'
        ui_stop_btn.style.display = 'block'
    }

    function stopTimer() {
        var state = getState()
        state.engaged = false
        state.elapsed = state.elapsed + ( Date.now() - state.started )
        setState(state)
        ui_start_btn.style.display = 'none'
        ui_stop_btn.style.display = 'none'
        ui_resume_btn.style.display = 'block'
        ui_clear_btn.style.display = 'block'
    }

    function clearTimer() {
        var state = {
            engaged: false,
            started: null,
            elapsed: 0,
            local_elapsed: 0
        }
        setState(state)
        updateTime(0)
        ui_resume_btn.style.display = 'none'
        ui_clear_btn.style.display = 'none'
        ui_start_btn.style.display = 'block'
    }

    function updateTime(elapsed) {
        const time = Math.floor( elapsed / 1000 ),
              secs = time % 60,
              mins = Math.floor( time / 60) % 60,
              hrs = Math.floor( time / 3600 )
        ui_sec_el.innerHTML = dispNum(secs)
        ui_min_el.innerHTML = dispNum(mins)
        ui_hrs_el.innerHTML = dispNum(hrs)
        ui_marker.style.transform = `rotate(${ secs * 6 }deg)`
    }

    function ticktock() {
        if (global_state.engaged) {
            global_state.local_elapsed = Date.now() - global_state.started
            updateTime(( global_state.elapsed + global_state.local_elapsed ))
            setTimeout(function() {
                ticktock()
            }, 200)
        } else {
            return false
        }
    }

    function dispNum(num) {
        var s = num + ""
        while (s.length < 2) s = "0" + s
        return s
    }

    function setState(state) {
        global_state = state
        localStorage.setItem('timerstate', JSON.stringify(state))
        document.dispatchEvent(update_event)
    }

    function getState() {
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

    function init() {
        global_state = getState()
        if (global_state.engaged === true) {
            ui_start_btn.style.display = 'none'
            ui_resume_btn.style.display = 'none'
            ui_clear_btn.style.display = 'none'
            ui_stop_btn.style.display = 'block'
            global_state.local_elapsed = Date.now() - global_state.started
            setState(global_state)
            updateTime(global_state.elapsed)
            ticktock()
        } else if (global_state.elapsed) {
            ui_start_btn.style.display = 'none'
            ui_stop_btn.style.display = 'none'
            ui_resume_btn.style.display = 'block'
            ui_clear_btn.style.display = 'block'
            updateTime(global_state.elapsed)
        } else {
            ui_stop_btn.style.display = 'none'
            ui_resume_btn.style.display = 'none'
            ui_clear_btn.style.display = 'none'
            ui_start_btn.style.display = 'block'
        }
    }


    // Initialise

    ui_start_btn.addEventListener('click', function() { startTimer() })
    ui_stop_btn.addEventListener('click', function() { stopTimer() })
    ui_resume_btn.addEventListener('click', function() { resumeTimer() })
    ui_clear_btn.addEventListener('click', function() { clearTimer() })

    for (let i = 0; i < 60; i++) {
        let notch = document.createElement('span')
        notch.setAttribute('class', 'timer--marker')
        notch.style.transform = `rotate(${ i * 6 }deg)`
        ui_timer.appendChild(notch)
    }

    init()

})()