import './App.css';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './component/LandingPage/LandingPage';
import Login from './component/LoginPage/LoginPage';
import LoadingScreen from './component/LoadingScrean/LoadingScreen';
import Forget from './component/LoginPage/ForgetPassword';
import ResetPassword from "./component/LoginPage/ResetPassword";
import AboutUs from "./component/Aboutus/AboutUs";
import ConnectionRequests from './component/ConnectionReq/ConnectionReq';
import ContactUs from './component/ContactUS/Contactus';
import { AuthProvider, AuthContext } from './context/AuthContext';
import ProtectedRoute from './component/Protected/ProtectedRoute';
import CreateNewPost from './component/CreatePost/CreateNewPost.jsx';
import GenerateQuere from './component/CreateQuery/GenerateQuere';
import ErrorBoundary from './component/ErrorBoundary.jsx';
import Notification from './component/Notification/Notification.jsx';
import { useContext } from 'react';
import Post from './component/CreateCode/CreateCode.jsx'
function App() {
  const { token, isLoading } = useContext(AuthContext);

  const closePost = () => {

    console.log("Post closed");
  };
  const closeQuery = () => {
    console.log("Query closed");
  };
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <AuthProvider>
          <ErrorBoundary> {isLoading && <LoadingScreen />}
            <div className="Pages">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forget" element={<Forget />} />
                <Route path="/forget/:token" element={<ResetPassword />} />
                <Route path="/Aboutus" element={<AboutUs />} />
                <Route path="/ConnectionReq" element={<ConnectionRequests />} />
                <Route path="/ContactUs" element={<ContactUs />} />
                <Route path="/Post" element={<Post />} />
                <Route path="/Notification" element={<Notification/>} />
                {/* Protected Route */}
                <Route
                  path="/create-post"
                  element={
                    <ProtectedRoute>
                      <CreateNewPost closePost={closePost} token={token} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/create-query"
                  element={
                    <ProtectedRoute>
                      <GenerateQuere closeQuery={closeQuery} token={token} />
                    </ProtectedRoute>
                  }
                />
                {/* Add other protected routes similarly */}
              </Routes>
            </div>
          </ErrorBoundary>
        </AuthProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
