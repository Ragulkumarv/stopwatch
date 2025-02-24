import { useEffect, useRef, useState } from "react";

const Stopwatch = () => {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  //   const [intervalId, setIntervalId] = useState(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimer((prev) => prev + 10);
      }, 10); //10 ms
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const formatTime = (ms) => {
    // const hours = Math.floor(seconds / 3600);
    // const mins = Math.floor(seconds / 60) % 60;
    // const secs = Math.floor(seconds % 60);
    const mins = Math.floor(ms / 60000);
    const secs = Math.floor((ms % 60000) / 1000);
    const milli = Math.floor((ms % 1000) / 10);

    return {
      mins: String(mins).padStart(2, "0"),
      secs: String(secs).padStart(2, "0"),
      milli: String(milli).padStart(2, "0"),
    };
  };

  const toggleHandler = () => {
    if (!isRunning) {
      setTimer((prev) => prev + 1);
    }
    setIsRunning(!isRunning);
  };

  const resetHandler = () => {
    clearInterval(intervalRef.current);
    setTimer(0);
    setIsRunning(false);
  };

  const { mins, secs, milli } = formatTime(timer);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-lg font-bold text-white mb-3">StopWatch</h1>
      <div className={`mb-3 ${isRunning && timer > 0 && "animate-pulse"}`}>
        <span>{mins} : </span>
        <span>{secs} : </span>
        <span>{milli}</span>
      </div>

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
