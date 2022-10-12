import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Home from './components/Home';
function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/home' element={<Home />}></Route>
        {/* <Route path='/login' element={<Home />}></Route> */}
        {/* <Route path='/register' element={<Home />}></Route> */}
      </Routes>
    </Router>
    </div>
  );
}

export default App;
