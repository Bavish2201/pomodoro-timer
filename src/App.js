import "./App.css";
import Pomodoro from "./Pomodoro";
import { ConfigProvider } from "./Config";

function App() {
  return (
    <div className="App">
      <ConfigProvider>
        <Pomodoro />
      </ConfigProvider>
    </div>
  );
}

export default App;
