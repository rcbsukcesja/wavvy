import {
  Auth,
  deleteUser,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { useToast } from 'native-base';
import { useState } from 'react';
import { useCombinedStore } from 'src/store';

import { useAuth } from './useAuth';

export const useEmailAndPasswordAuth = (auth: Auth) => {
  const [isLoadingSignIn, setIsLoadingSignIn] = useState(false);
  const { authReqState, setUserLoggedIn, setUserLogout } = useAuth();
  const setUserId = useCombinedStore(state => state.setUserId);
  const setUserEmail = useCombinedStore(state => state.setUserEmail);
  const toast = useToast();

  const signInWithEmailAndPassword = async ({ email, password }: { email: string; password: string }) => {
    setIsLoadingSignIn(true);

    try {
      const response = await firebaseSignInWithEmailAndPassword(auth, email, password);

      const token = await response.user.getIdToken();
      const { uid, email: userEmail } = response.user;

      setUserEmail(userEmail);
      setUserId(uid);
      setUserLoggedIn(token);
    } catch (err) {
      toast.show({
        description: 'Niepoprawne hasło',
      });
    } finally {
      setIsLoadingSignIn(false);
    }
  };

  const resetPassword = (email: string) =>
    sendPasswordResetEmail(auth, email).then(() => {
      setUserLogout();
    });

  const deleteAccount = () =>
    deleteUser(auth.currentUser).then(() => {
      setUserLogout();
    });

  return { signInWithEmailAndPassword, resetPassword, deleteAccount, authReqState, isLoadingSignIn };
};
