import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './component/LandingPage/LandingPage';
import Login from './component/LoginPage/LoginPage';
import Forget from './component/LoginPage/ForgetPassword'
function App() {
  return (
    <div className="Pages">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forget" element={<Forget />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
