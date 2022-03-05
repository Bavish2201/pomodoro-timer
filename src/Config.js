import React, { useState, createContext } from "react";

export const ConfigContext = createContext();

export const ConfigProvider = (props) => {
  const [config, setConfig] = useState({
    focus: 25,
    break: 5,
    longbreak: 15,
    num_sessions: 4,
    show_notification: true,
  });

  return (
    <ConfigContext.Provider value={[config, setConfig]}>
      {props.children}
    </ConfigContext.Provider>
  );
};
