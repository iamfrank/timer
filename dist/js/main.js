var timer,
    tenthSecsPassed = 0,
    secsPassed = 0,
    minsPassed = 0,
    hoursPassed = 0,
    timerEl = document.getElementById("timer-time");
    timeSpentEl = document.getElementById("timer-spent");
    timeSpentAmountEl = document.getElementById("timer-spent--amount");
    startTimeBtn = document.getElementById("timer-start");
    stopTimeBtn = document.getElementById("timer-stop");
    clearTimeBtn = document.getElementById("timer-clear");

function displayTimePassed() {
    tenthSecsPassed += 1;
    if (tenthSecsPassed > 9) {
        tenthSecsPassed = 0;
        secsPassed += 1;
    }
    if (secsPassed > 59) {
        secsPassed = 0;
        minsPassed += 1;
    }
    if (minsPassed > 59) {
        minsPassed = 0;
        hoursPassed += 1;
    }
    timerEl.innerHTML = hoursPassed + ':' + minsPassed + ':' + secsPassed + ':' + tenthSecsPassed + '0';
}

function startTiming() {
    clearTimeBtn.disabled = true;
    timer = setInterval(displayTimePassed, 100);
    startTimeBtn.hidden = true;
    stopTimeBtn.hidden = false;
}

function stopTiming() {
    clearInterval(timer);
    startTimeBtn.hidden = false;
    stopTimeBtn.hidden = true;
    clearTimeBtn.disabled = false;
    calculateHours();
}


function clearTime() {
    tenthSecsPassed = 0;
    secsPassed = 0;
    minsPassed = 0;
    hoursPassed = 0;
    timerEl.innerHTML = '0:0:0:0';
    timeSpentEl.hidden = true;
    timeSpentAmountEl.innerHTML = 0;
}

function calculateHours() {
    var timeSpent = hoursPassed + (minsPassed / 60) + (secsPassed / 3600);
    timeSpentEl.hidden = false;
    timeSpentAmountEl.innerHTML = Number((timeSpent).toFixed(3));
}


/*
 * Register service worker
 * (Does nothing at present. Is needed to display Chrome install web app banner.)
 */

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('../dist/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch(function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
