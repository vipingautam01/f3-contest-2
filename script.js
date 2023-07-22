const no_alarm_msg = document.getElementById('current-timers');
const audioElement = document.getElementById('alarm-tone');
audioElement.style.display = 'none';
// buttons
const set_alarm_btn = document.getElementById('set-btn');

const timers = [];
let seconds; // Initial time in seconds
let alarms = 0;


// 1st functionality - display all timers

set_alarm_btn.addEventListener('click', (event) => {
    // alarm inputs
    let hours = parseInt(document.getElementById('hour').textContent);
    let min = parseInt(document.getElementById('min').textContent);
    let sec = parseInt(document.getElementById('sec').textContent);
    // console.log(hours);
    // console.log(min);
    // console.log(sec);

    // convert hours, min, sec ---> seconds
    seconds = hours * 60 * 60 + min * 60 + sec;
    // console.log(seconds);
    event.preventDefault();
    console.log('set btn hit');
    ifValidTimer(event, min, sec);
});

    function ifValidTimer(event, min, sec) {
        console.log('if valid timer func run');
        // startCountdown();

        if (min >= 0 && min < 60 && sec >= 0 && sec < 60) {
            // valid time
            // console.log(event);
            // Call this function to start the countdown
            // startCountdown();
            timers.push({name:timers.length + 1, duration: seconds});
            console.log(timers);
            initializeTimers(timers[timers.length - 1]);
        }
        else alert('Please enter valid time!!!! ex -> 00:00:05');
}

const timersList = document.getElementById('timers-list');
function initializeTimers(timer) {
    // timersList.innerHTML = '';

        var alarmBox = document.createElement('div');
        alarmBox.setAttribute('id', timer.name);
        alarmBox.className = 'timer-div';

        alarmBox.innerHTML = `
        `;
    
        timersList.appendChild(alarmBox);
        handleTimer(timer);

        alarms++;
}



// 2nd functionality - stop timer


function updateTimerDisplay(timer) {
    if (document.getElementById(timer.name)) {
        const timerElement = document.getElementById(timer.name);
        timerElement.innerHTML = `
        <div class="display-flex-row-center gap-2rem timer-box">
        <p id="set-time">Time Left  :</p>
        <div id="time-count-active" class="display-flex-row-center">
            <p id="hour">${Math.floor(timer.duration / 3600).toString().padStart(2, '0')}</p>
            <p>:</p>
            <p id="min">${Math.floor((timer.duration % 3600) / 60).toString().padStart(2, '0')}</p>
            <p>:</p>
            <p id="sec">${Math.floor(timer.duration % 60).toString().padStart(2, '0')}</p>
        </div>
        <div id="set-btn" onClick="deleteAlarm(${timer.name})">Delete</div>
    </div>
        `;
    }
    
}

function handleTimer(timer) {
    updateTimerDisplay(timer);
    timer.interval = setInterval(function() {
        timer.duration--;
        updateTimerDisplay(timer);
        if (timer.duration <= 0) {
            clearInterval(timer.interval);
            // alert(timer.alarmMessage);
            if (document.getElementById(timer.name)) {
                const timerElement = document.getElementById(timer.name);
                timerElement.className = 'timer-div-finished';
                timerElement.innerHTML = `
                <div class="display-flex-row-center gap-2rem timer-box-finished">
                <p id="set-time-finished">Set Time :</p>
                <div id="time-count-finished" class="display-flex-row-center">
                    <p>Timer is Up!</p>
                </div>
                <div id="set-btn-finished" onClick="deleteAlarm(${timer.name})">Stop</div>
            </div>
                `;

                playMusic();
            }
        }
    }, 1000);
}

function deleteAlarm(elementId) {
    // console.log(event.target);
    timersList.removeChild(document.getElementById(`${elementId}`));
    timers.splice(elementId - 1, 1);
    alarms--;
    console.log(alarms);
    stopMusic();
}



function noAlarmOnScreen() {
    
    // display message
    if (alarms === 0) {
        no_alarm_msg.style.display = 'block';
        console.log('tst');
    }
    else {
        no_alarm_msg.style.display = 'none';
    }
}


function playMusic() {
    console.log('music played');
    audioElement.play();
}

function stopMusic() {
    console.log('music stopd');
    audioElement.pause();
    audioElement.currentTime = 0;
}

setInterval(noAlarmOnScreen, 100);