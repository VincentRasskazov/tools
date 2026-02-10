// time-zone-converter.js
// Simple time zone converter (demo, limited zones)

document.addEventListener('DOMContentLoaded', () => {
  const fromTz = document.getElementById('from-tz');
  const toTz = document.getElementById('to-tz');
  const btn = document.getElementById('convert-btn');
  const result = document.getElementById('tz-result');
  const zones = [
    {name: 'UTC', offset: 0},
    {name: 'US/Eastern', offset: -5},
    {name: 'US/Central', offset: -6},
    {name: 'US/Mountain', offset: -7},
    {name: 'US/Pacific', offset: -8},
    {name: 'Europe/London', offset: 0},
    {name: 'Europe/Berlin', offset: 1},
    {name: 'Asia/Tokyo', offset: 9},
    {name: 'Asia/Kolkata', offset: 5.5}
  ];
  zones.forEach(z => {
    fromTz.innerHTML += `<option value='${z.offset}'>${z.name}</option>`;
    toTz.innerHTML += `<option value='${z.offset}'>${z.name}</option>`;
  });
  fromTz.value = '0';
  toTz.value = '9';
  btn.onclick = () => {
    const dt = document.getElementById('datetime-input').value;
    const from = parseFloat(fromTz.value);
    const to = parseFloat(toTz.value);
    if (!dt) {
      result.textContent = 'Enter a date and time.';
      return;
    }
    const date = new Date(dt + 'Z');
    const utc = date.getTime() + from * -3600000;
    const target = new Date(utc + to * 3600000);
    result.textContent = `Converted: ${target.toLocaleString()}`;
  };
});
