import { useEffect, useState } from "react";

const usePomodoro = () => {
    const [sessionType, setSessionType] = useState("work");
    const [time, setTime] = useState(25 * 60); // Initial time set to 25 minutes
    const [sessionsCompleted, setSessionsCompleted] = useState(0);
    const [isRunning, setIsRunning] = useState(true);

    useEffect(() => {
        let timer;

        if (isRunning) {
            timer = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
        }

        if (time === 0) {
            clearInterval(timer);
            handleSessionComplete();
        }

        return () => clearInterval(timer!);
    }, [time, isRunning]);

    const handleSessionComplete = () => {
        if (sessionType === "work") {
            if (sessionsCompleted === 3) {
                setSessionType("longBreak");
                setTime(15 * 60); // Long break set to 15 minutes
                setSessionsCompleted(0);
            } else {
                setSessionType("break");
                setTime(5 * 60); // Break set to 5 minutes
                setSessionsCompleted((prevSessionsCompleted) =>
                    prevSessionsCompleted + 1
                );
            }
        } else {
            setSessionType("work");
            setTime(25 * 60); // Work session set to 25 minutes
        }
    };

    const formatTime = (timeInSeconds: number) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")
            }`;
    };

    const reset = () => {
        setSessionType("work");
        setTime(25 * 60);
        setSessionsCompleted(0);
        setIsRunning(false);
    };

    const stop = () => {
        setSessionType("work");
        setTime(25 * 60);
        setSessionsCompleted(0);
        setIsRunning(false);
    };

    const pause = () => {
        setIsRunning(false);
    };

    const play = () => {
        setIsRunning(true);
    };

    return {
        sessionType,
        time,
        formatTime,
        reset,
        stop,
        pause,
        play,
        isRunning,
    };
};

export default usePomodoro;
