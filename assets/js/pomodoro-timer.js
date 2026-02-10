// pomodoro-timer.js
// Simple Pomodoro timer logic

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('pomodoro-app');
  app.innerHTML = `
    <div>
      <span id="timer-label">Work</span>
      <span id="timer">25:00</span>
    </div>
    <button id="start">Start</button>
    <button id="reset">Reset</button>
  `;
  let workTime = 25 * 60, breakTime = 5 * 60, time = workTime, interval, isWork = true;
  const timer = document.getElementById('timer');
  const label = document.getElementById('timer-label');
  function update() {
    const min = String(Math.floor(time / 60)).padStart(2, '0');
    const sec = String(time % 60).padStart(2, '0');
    timer.textContent = `${min}:${sec}`;
    label.textContent = isWork ? 'Work' : 'Break';
  }
  function tick() {
    if (time > 0) {
      time--;
      update();
    } else {
      isWork = !isWork;
      time = isWork ? workTime : breakTime;
      update();
    }
  }
  document.getElementById('start').onclick = () => {
    clearInterval(interval);
    interval = setInterval(tick, 1000);
  };
  document.getElementById('reset').onclick = () => {
    clearInterval(interval);
    isWork = true;
    time = workTime;
    update();
  };
  update();
});
