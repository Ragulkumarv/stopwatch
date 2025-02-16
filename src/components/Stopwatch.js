import { useEffect, useState } from "react";

const Stopwatch = () => {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    if (isRunning) {
      const id = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
      setIntervalId(id);
    } else {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const toggleHandler = () => {
    if (!isRunning) {
      setTimer((prev) => prev + 1);
    }
    setIsRunning(!isRunning);
  };

  const resetHandler = () => {
    clearInterval(intervalId);
    setTimer(0);
    setIsRunning(false);
    setIntervalId(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-lg font-bold text-white mb-3">
        {timer} {timer > 0 ? `secs` : `sec`}
      </h1>
      <div className="flex gap-3">
        {!isRunning && timer === 0 && (
          <button
            className="px-6 py-2 rounded-lg ripple-btn bg-blue-500 hover:bg-gray-300"
            onClick={() => toggleHandler()}
          >
            Start
          </button>
        )}
        {timer > 0 && (
          <>
            <button
              className={`px-6 py-2 rounded-lg ripple-btn hover:bg-gray-300 ${
                isRunning ? `bg-yellow-500` : `bg-green-500`
              }`}
              onClick={() => toggleHandler()}
            >
              {isRunning ? `Pause` : `Resume`}
            </button>
            <button
              className="px-6 py-2 rounded-lg ripple-btn bg-red-500 hover:bg-gray-300"
              onClick={() => resetHandler()}
            >
              Stop
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Stopwatch;
