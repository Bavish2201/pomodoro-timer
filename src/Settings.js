import React, { useContext } from "react";
import Slider from "@mui/material/Slider";

import { ConfigContext } from "./Config";

export default function SettingsDialog({ closeSettingsDialog }) {

  const [config, setConfig] = useContext(ConfigContext)

  const oldConfig = config;

  return (
    <>
      <div className="dialog-background" onClick={closeSettingsDialog}></div>
      <div className="dialog-card">
        <p className="dialog-heading">Settings</p>

        <button className="dialog-close-button" onClick={closeSettingsDialog}>x</button>

        <div className="input-group">
          <p className="input-label">Focus duration</p>
          <Slider
            step={5}
            min={5}
            max={60}
            defaultValue={oldConfig.focus}
            track={false}
            valueLabelDisplay="auto"
            marks={[
              { value: 5, label: "5 min" },
              { value: 25, label: "25 min" },
              { value: 60, label: "60 min"}
            ]}
            onChangeCommitted={(e, v) => {
              setConfig({...config, focus: v});
            }}
          />
        </div>

        <div className="input-group">
          <p className="input-label">Short break duration</p>
          <Slider
            step={1}
            min={1}
            max={15}
            defaultValue={oldConfig.break}
            track={false}
            valueLabelDisplay="auto"
            marks={[
              { value: 1, label: "1 min" },
              { value: 5, label: "5 min" },
              { value: 15, label: "15 min"}
            ]}
            onChangeCommitted={(e, v) => {
              setConfig({...config, break: v});
            }}
          />
        </div>

        <div className="input-group">
          <p className="input-label">Long break duration</p>
          <Slider
            step={5}
            min={5}
            max={30}
            defaultValue={oldConfig.longbreak}
            track={false}
            valueLabelDisplay="auto"
            marks={[
              { value: 5, label: "5 min" },
              { value: 15, label: "15 min" },
              { value: 30, label: "30 min"}
            ]}
            onChangeCommitted={(e, v) => {
              setConfig({...config, longbreak: v});
            }}
          />
        </div>

        
      </div>
    </>
  );
}
