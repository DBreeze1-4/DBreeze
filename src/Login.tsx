import React, { useState } from 'react';
import './loginStyles.css';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { signIn, signUp } from '../backend/firebase/login';

const SignInForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn(email, password);
  };

  return (
    <form onSubmit={handleSignIn}>
      <h1 className='login-h1'>Sign In</h1>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button type="submit">Sign In</button>
    </form>
  );
};

const SignUpForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('User');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    await signUp(name, email, password, role);
  };

  return (
    <form onSubmit={handleSignUp}>
      <h1 className='login-h1'>Create Account</h1>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <span>Role:</span>
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="User">User</option>
        <option value="Boss">Boss</option>
      </select>
      <br />
      <button type="submit">Sign Up</button>
    </form>
  );
};

const LoginPage: React.FC = () => {
  const [isActive, setIsActive] = useState(false);

  const handleLoginClick = () => setIsActive(true);
  const handleRegisterClick = () => setIsActive(false);

  return (
    <div className='login-body'>
      <div className={`container ${isActive ? 'active' : ''}`} id="container">
      <div className="signIn">
        <SignInForm />
      </div>
      <div className="signIn">
        <SignUpForm />
      </div>
      <div className="overlap">
        <div className="toggle">
          <div className="overlap-right">
            <h1 className='login-h1'>Hello, Friend!</h1>
            <p>Register your personal details to use all of site features</p>
            <button id="login" onClick={handleLoginClick}>Sign Up</button>
          </div>
          <div className="overlap-left">
            <h1 className='login-h1'>Welcome back!</h1>
            <p>Enter your personal details to use all of site features</p>
            <button id="register" onClick={handleRegisterClick}>Sign In</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default LoginPage;