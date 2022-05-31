import { useState } from 'react';
import { projectAuth } from '../firebase/config';
import { AuthContextConsumer } from '../context/AuthContext';

const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(null);
  const { dispatch } = AuthContextConsumer();

  const signup = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);

    try {
      // Signup user
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      if (!res) {
        throw new Error('Could not complete sign up');
      }

      // add display name to user
      await res.user.updateProfile({ displayName });

      //dispatch Login
      dispatch({
        type: 'LOGIN',
        payload: res.user,
      });

      setIsPending(false);
      setError(null);
    } catch (err) {
      console.log(err);
      setError(err.message);
      setIsPending(false);
    }
  };

  return { error, isPending, signup };
};

export default useSignup;
