import './App.css';
import ShowData from "./pages/ShowData";

import "./css/index.css"
import 'bootstrap/dist/css/bootstrap.min.css';

import { getData } from './algo/algotithm';

function App() {
  return (
      <>
        <h1 className={"title"}>Personal Sauna</h1>
        <ShowData />
      </>
  );
}

export default App;
