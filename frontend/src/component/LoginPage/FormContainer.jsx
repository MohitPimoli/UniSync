import React from 'react';
import SocialContainer from './SocialContainer';
const FormContainer = () => {
  return (
    <>
      <div className="form-container sign-up-container">
        <form action="/">
          <h1>Create Account</h1>
          <SocialContainer />
          <span>or use your email for registration</span>
          <input type="text" placeholder="Name" />
          <input type="text" placeholder="UserName" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Enter new Password" />
          <input type="password" placeholder="Confirm yourPassword" />
          <button>Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form action="#">
          <h1>Sign in</h1>
          <SocialContainer />
          <span>or use your account</span>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <a href="#">Forgot your password?</a>
          <button>Sign In</button>
        </form>
      </div>
    </>
  );
};

export default FormContainer;
