import './App.css';
import ShowData from "./pages/ShowData";

import "./css/index.css"
import 'bootstrap/dist/css/bootstrap.min.css';

import { algorithm } from './algo/algotithm';
import { get_day_temp } from './api/API';


function App() {
  // console.log(get_day_temp(12))
  algorithm(12, 18)

  return (
      <>
        <h1 className={"title"}>Personal Sauna</h1>
        <ShowData />
      </>
  );
}

export default App;
