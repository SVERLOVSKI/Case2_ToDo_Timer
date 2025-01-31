import React, { useEffect, useState} from 'react'
import './Timer.css'

export default function Timer() {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(() => {
        const savedSeconds = localStorage.getItem('seconds');
        return savedSeconds ? JSON.parse(savedSeconds) : 0;
      });
    const [isActive, setIsActive] = useState(() => {
        const savedisActive = localStorage.getItem('savedisActive');
        return savedisActive ? JSON.parse(savedisActive) : false;
      });
    const [isPaused, setIsPaused] = useState(() => {
        const savedisPaused = localStorage.getItem('savedisPaused');
        return savedisPaused ? JSON.parse(savedisPaused) : false;
      });

    useEffect(() => {
        let interval = null;

        if (isActive && seconds > 0) {
            interval = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds - 1);
            }, 1000);
        } else if (seconds === 0) {
            clearInterval(interval);
            setIsActive(false);
        }

        return () => clearInterval(interval);
    }, [isActive, seconds]);

    // useEffect(() => {
    //     localStorage.setItem('minutes', JSON.stringify(minutes));
    // }, [minutes]);

    useEffect(() => {
        localStorage.setItem('seconds', JSON.stringify(seconds));
    }, [seconds]);

    useEffect(() => {
        localStorage.setItem('savedisActive', JSON.stringify(isActive));
    }, [isActive]);

    useEffect(() => {
        localStorage.setItem('savedisPaused', JSON.stringify(isPaused));
    }, [isPaused]);

    const startTimer = () => {
        if (minutes > 0) {
            setSeconds(minutes * 60);
            setIsActive(true);
            setIsPaused(false);
        }
    };

    const stopTimer = () => {
        setIsActive(false);
        setIsPaused(true);
    };

    const resetTimer = () => {
        if (isPaused) {
            setMinutes(minutes);
            setSeconds(0);
            setIsActive(false);
            setIsPaused(false);
        }
    }

    const continueTimer = () => {
        if (isPaused) {
            setMinutes(minutes);
            setSeconds(seconds);
            setIsPaused(false);
            setIsActive(true);
        }
    }

    const handleInputChange = (e) => {
        setMinutes(e.target.value);
        if (e.target.value === '') {
            setMinutes(0);
        }
    };

    const formatTime = (totalSeconds) => {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };

    return (
        <div className='timer-wrapper'>
            <h1 className="service-name">Timer</h1>
            <input
                className='timer-input'
                type="text"
                onChange={handleInputChange}
                placeholder="Время (мин.)"
                min="0"
            />
            <div className='buttons-wrapper'>
                <button className={isActive || minutes <= 0 || isPaused ? 'timer-button timer-button__disabled' : 'timer-button'} onClick={startTimer} disabled={isActive || minutes <= 0 || isPaused}>
                    Запустить
                </button>
                <button className={!isActive ? 'timer-button timer-button__disabled' : 'timer-button'} onClick={stopTimer} disabled={!isActive}>
                    Остановить
                </button>
                <button className={!isPaused ? 'timer-button timer-button__disabled' : 'timer-button'} onClick={continueTimer} disabled={!isPaused}>
                    Продолжить
                </button>
                <button className={!isPaused ? 'timer-button timer-button__disabled' : 'timer-button'} onClick={resetTimer} disabled={!isPaused}>
                    Сбросить
                </button>
            </div>
            <h2 className='timer-section'>{isActive || isPaused ? formatTime(seconds) : `${minutes}:00`}</h2>
        </div>
    );
}
