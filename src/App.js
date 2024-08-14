
import './App.css';
import {useRoutes} from "react-router-dom";
import {Routes} from "./router"
import './index.css'

function App() {
  return (
    useRoutes(Routes)
  );
}

export default App;
