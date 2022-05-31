import React, { useState } from 'react';
import styles from './Signup.module.css';
import useSignUp from '../../hooks/useSignup';

const Signup = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, isPending, error } = useSignUp();

  const signUpHandler = (event) => {
    event.preventDefault();
    signup(email, password, displayName);
  };

  return (
    <form onSubmit={signUpHandler} className={styles['signup-form']}>
      <h2>Sign Up</h2>
      <label>
        <span>Display Name:</span>
        <input
          type='text'
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>
      <label>
        <span>Email:</span>
        <input
          type='email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>Password:</span>
        <input
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      {!isPending && <button className='btn'>Sign Up</button>}
      {isPending && (
        <button className='btn' disabled>
          loading
        </button>
      )}
      {error && <p>{error}</p>}
    </form>
  );
};

export default Signup;
