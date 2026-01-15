import { useState, useEffect } from 'react';

export default function AlarmClock() {
  const [alarmTime, setAlarmTime] = useState('');
  const [alarms, setAlarms] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      
      alarms.forEach(alarm => {
        if (alarm.time === now.toTimeString().slice(0, 5) && !alarm.triggered) {
          alert('⏰ Alarm!');
          alarm.triggered = true;
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [alarms]);

  const addAlarm = () => {
    if (alarmTime) {
      setAlarms([...alarms, { time: alarmTime, triggered: false }]);
      setAlarmTime('');
    }
  };

  const removeAlarm = (index) => {
    setAlarms(alarms.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-pink-200">
      <h2 className="text-4xl font-extrabold mb-6 text-purple-700 drop-shadow">Alarm Clock</h2>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <div className="text-5xl font-mono font-bold text-purple-600">
            {currentTime.toLocaleTimeString()}
          </div>
        </div>
        <div className="flex gap-2 mb-4">
          <input
            type="time"
            value={alarmTime}
            onChange={(e) => setAlarmTime(e.target.value)}
            className="flex-1 px-4 py-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:border-purple-500"
          />
          <button
            onClick={addAlarm}
            className="px-6 py-2 rounded-lg bg-purple-500 text-white font-semibold shadow hover:bg-purple-600 transition"
          >
            Add
          </button>
        </div>
        <div className="space-y-2">
          {alarms.map((alarm, index) => (
            <div key={index} className="flex justify-between items-center bg-purple-50 p-3 rounded-lg">
              <span className="font-mono text-lg font-semibold">{alarm.time}</span>
              <button
                onClick={() => removeAlarm(index)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
