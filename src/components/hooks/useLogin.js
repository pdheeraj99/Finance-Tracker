import { useState } from 'react';
import { projectAuth } from '../firebase/config';
import { AuthContextConsumer } from '../context/AuthContext';

export const useLogin = () => {
  // const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = AuthContextConsumer();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      // login
      const res = await projectAuth.signInWithEmailAndPassword(email, password);

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user });

      // if (!isCancelled) {
      setIsPending(false);
      setError(null);
      // }
    } catch (err) {
      // if (!isCancelled) {
      setError(err.message);
      setIsPending(false);
      // }
    }
  };

  // useEffect(() => {
  //   return () => setIsCancelled(true);
  // }, []);

  return { login, isPending, error };
};
