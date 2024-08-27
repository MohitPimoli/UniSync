import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './component/LandingPage/LandingPage';
import Login from './component/LoginPage/LoginPage';
import Forget from './component/LoginPage/ForgetPassword'
import ResetPassword from "./component/LoginPage/ResetPassword";
function App() {
  return (
    <div className="Pages">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forget" element={<Forget />} />
          <Route path="/forget/:token" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
