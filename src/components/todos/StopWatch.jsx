import { useEffect, useState } from "react"


export default function StopWatch(){

    const [time, setTime] = useState(0);

  // state to check stopwatch running or not
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);
  
  const startAndStop = () => {
    setIsRunning(!isRunning);
  };

  const reset = () => {
    setTime(0);
  };

    return(
        <div className="grid grid-row gap-4 items-center justify-center py-4 bg-cyan-200 w-1/5 mx-auto">
            <div className="">
                <p className="font-bold text-xl">Timer : <span className="py-1 px-4 rounded">{time}</span></p>
            </div>
            <div className="flex gap-2">
                <button onClick={startAndStop} className={`py-1 px-4 ${isRunning ? 'bg-red-700' : 'bg-sky-900'} text-white rounded`}>{isRunning ? 'Stop' : 'Start'}</button>
                <button onClick={reset} className="py-1 px-4 bg-violet-700 text-white rounded">Reset</button>
            </div>
        </div>
    )
}