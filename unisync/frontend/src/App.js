import './App.css';
import React from 'react';
import { BrowserRouter , Route , Routes } from 'react-router-dom';
import Home from './component/Home'
import Login from './component/Login'
import Register from './component/Register';
function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <div className="App">
          <div className='pages'>
            <Routes>
              <Route path="/" Component={<Home />} />
              <Route path="/Login" Component={<Login />} />
              <Route path="/Register" Component={<Register />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
