import React from "react";
import Slider from "@mui/material/Slider";

export default function SettingsDialog({ closeSettingsDialog }) {
  return (
    <>
      <div className="dialog-background" onClick={closeSettingsDialog}></div>
      <div className="dialog-card">
        <p className="dialog-heading">Settings</p>

        <div className="input-group">
          <p className="input-label">Focus duration</p>
          <Slider
            step={5}
            min={5}
            max={60}
            defaultValue={25}
            track={false}
            valueLabelDisplay="auto"
            marks={[
              { value: 5, label: "5 min" },
              { value: 25, label: "25 min" },
              { value: 60, label: "60 min"}
            ]}
          />
        </div>

        <div className="input-group">
          <p className="input-label">Short break duration</p>
          <Slider
            step={1}
            min={1}
            max={15}
            defaultValue={5}
            track={false}
            valueLabelDisplay="auto"
            marks={[
              { value: 1, label: "1 min" },
              { value: 5, label: "5 min" },
              { value: 15, label: "15 min"}
            ]}
          />
        </div>

        <div className="input-group">
          <p className="input-label">Long break duration</p>
          <Slider
            step={5}
            min={5}
            max={30}
            defaultValue={15}
            track={false}
            valueLabelDisplay="auto"
            marks={[
              { value: 5, label: "5 min" },
              { value: 15, label: "15 min" },
              { value: 30, label: "30 min"}
            ]}
          />
        </div>

        <button onClick={closeSettingsDialog}>Close</button>
      </div>
    </>
  );
}
