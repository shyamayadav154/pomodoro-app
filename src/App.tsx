import { memo, useCallback, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import usePomodoro from "./hooks/use-pomodoro";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

function App() {
    return (
        <main className="grid place-content-center h-[80vh]">
            <PomodoroTimer />
        </main>
    );
}

type SessionType = "work" | "break" | "longbreak";

const PomodoroTimer = () => {
    const { sessionType, time, isRunning, formatTime, reset, stop, pause } =
        usePomodoro();

    return (
        <div>
            <h1>Pomodoro Timer</h1>
            <h2>{sessionType}</h2>
            <h3>{formatTime(time)}</h3>
        </div>
    );
};

const Wrapper = (
    { duration, onComplete }: { duration: number; onComplete: () => void },
) => {
    return (
        <CountdownCircleTimer
            isPlaying={!!duration}
            duration={duration}
            colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
            colorsTime={[7, 5, 2, 0]}
            onComplete={() => {
                onComplete();
                return {
                    shouldRepeat: true,
                    delay: 1,
                };
            }}
        >
            {({ remainingTime }) => (
                <div>
                    {remainingTime}/
                    {duration}
                </div>
            )}
        </CountdownCircleTimer>
    );
};

export default App;
