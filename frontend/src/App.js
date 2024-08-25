import './App.css';
import { BrowserRouter , Route , Routes } from 'react-router-dom';
import Home from './component/LandingPage/LandingPage';
import Login from './component/LoginPage/LoginPage';
import Signup from './component/SignupPage/SignupPage'
function App() {
  return (
    <div className="Pages">
      {/* <h1>Hello</h1> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
