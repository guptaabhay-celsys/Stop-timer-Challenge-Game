import { useRef, useState } from "react"
import ResultModal from "./ResultModal.jsx";

export default function TimeChallenge({title, targetTime}){
    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000)
    const timer = useRef();
    const dialog = useRef();

    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

    if(timeRemaining <= 0){
        dialog.current.open();
        clearInterval(timer.current);
        
    }

    function handleResetTime(){
        setTimeRemaining(targetTime * 1000)
    }

    function handleStart(){
        timer.current = setInterval(() => {
            setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10)
        }, 10);
    }

    function handleStop(){
        dialog.current.open();
        clearInterval(timer.current);
    }
    return <section className="challenge">
        <ResultModal ref = {dialog} targetTime={targetTime} remainingTime = {timeRemaining} onReset = {handleResetTime} />
        <h2>{title}</h2>
        <p className="challenge-time">
            {targetTime} second{targetTime > 1 ? 's' : ''}
        </p>
        <p>
            <button onClick={timerIsActive ? handleStop : handleStart}>
                {timerIsActive ? 'Stop':'Start'} Challenge
            </button>
        </p>
        <p className={timerIsActive ? 'active': undefined}>
            {timerIsActive ? 'Time is running...' : 'Timer inactive'}
        </p>
    </section>

}