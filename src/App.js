import logo from './logo.svg';
import './App.css';
import {
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import Transactions from './components/Transactions';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Transactions/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
