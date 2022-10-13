import './App.css';
import ShowData from "./pages/ShowData";
import Navbar from "./components/Navbar"

import "./css/index.css"
import 'bootstrap/dist/css/bootstrap.min.css';

import { getData } from './algo/algotithm';


function App() {
  return (
      <>
        <div
          style={{
            backgroundColor: '#F4F4F4',
            backgroundSize: 'cover',
            minHeight:'100%'
          }}
        >
        
        <Navbar/>
        <ShowData />
        </div>
      </>
  );
}

export default App;
