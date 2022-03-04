import React, { useState, useRef, useEffect } from "react";
import {
  BsPlayCircle,
  BsPauseCircle,
  BsChevronBarRight,
  BsArrowCounterclockwise,
  BsFillGearFill,
} from "react-icons/bs";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import SettingsDialog from "./Settings";

export default function Pomodoro() {
  const counter_init_vals = {
    focus: 25 * 60,
    break: 5 * 60,
    longbreak: 15 * 60,
  };

  const [counter, setCounter] = useState(counter_init_vals["focus"]);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerMode, setTimerMode] = useState("focus"); // focus | break | long-break
  const [totalSessions, setTotalSessions] = useState(3);
  const [currentSession, setCurrentSession] = useState(1);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);

  const timer = useRef(null);
  const firstRender = useRef(true);

  const getMinutes = (c) => {
    const minutes = Math.floor(c / 60);
    return minutes < 10 ? `0${minutes}` : minutes;
  };

  const getSeconds = (c) => {
    const seconds = Math.round(c % 60);
    return seconds < 10 ? `0${seconds}` : seconds;
  };

  const tick = () => {
    setCounter((c) => {
      if (c === 0) {
        return 0;
      } else {
        return c - 1;
      }
    });
  };

  const startTimer = () => {
    setTimerRunning(true);
    if (timer.current) {
      clearInterval(timer.current);
    }
    timer.current = setInterval(tick, 1000);
  };

  const stopTimer = () => {
    setTimerRunning(false);
    clearInterval(timer.current);
  };

  const resetTimer = () => {
    stopTimer();
    setTimerMode("focus");
    setCurrentSession(1);
    setCounter(counter_init_vals["focus"]);
  };

  const nextSession = () => {
    setTimerMode((m) => {
      if (m === "focus") {
        if (currentSession === totalSessions) {
          return "longbreak";
        } else {
          return "break";
        }
      } else {
        if (m === "break") {
          setCurrentSession(currentSession + 1);
        } else {
          setCurrentSession(1);
        }
        return "focus";
      }
    });
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      setCounter(counter_init_vals[timerMode]);
      // if (!timerRunning)
      //   startTimer();
    }
  }, [timerMode]);

  useEffect(() => {
    if (counter === 0) {
      setTimeout(() => {
        nextSession();
      }, 1000);
    }
  }, [counter]);

  return (
    <>
      <div className="timer">
        <CircularProgressbar
          value={counter}
          maxValue={counter_init_vals[timerMode]}
          text={`${getMinutes(counter)}:${getSeconds(counter)}`}
          strokeWidth={2}
          counterClockwise={true}
          styles={buildStyles({
            textColor: "#2b2c2c",
            pathColor: "#5e5e5e",
          })}
        />
      </div>

      <div className="timer-controls">
        <button className="control-button" onClick={resetTimer}>
          <BsArrowCounterclockwise className="button-icon" />
        </button>
        {timerRunning ? (
          <button
            className="control-button control-button-main"
            onClick={stopTimer}
          >
            <BsPauseCircle className="button-icon" />
          </button>
        ) : (
          <button
            className="control-button control-button-main"
            onClick={startTimer}
          >
            <BsPlayCircle className="button-icon" />
          </button>
        )}
        <button className="control-button" onClick={nextSession}>
          <BsChevronBarRight className="button-icon" />
        </button>
      </div>

      <div className="toolbar-tray">
        <button className="control-button settings-button" onClick={() => setShowSettingsDialog(true)}>
          <BsFillGearFill className="button-icon" />
        </button>
      </div>

      {showSettingsDialog ? (
        <SettingsDialog
          closeSettingsDialog={() => {
            setShowSettingsDialog(false);
          }}
        />
      ) : null}
    </>
  );
}
