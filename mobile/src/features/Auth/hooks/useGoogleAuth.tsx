import * as Google from 'expo-auth-session/providers/google';
import { Auth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { ANDROID_STANDALONE_APP_CLIENT_ID, CLIENT_ID, IOS_STANDALONE_APP_CLIENT_ID } from 'firebaseConfig';
import { useEffect, useState } from 'react';
import { useCombinedStore } from 'src/store';

import { useAuth } from './useAuth';

export const useGoogleAuth = (auth: Auth) => {
  const [isLoadingSignIn, setIsLoadingSignIn] = useState(false);
  const { authReqState, setUserLoggedIn } = useAuth();
  const [, googleResponse, googlePromptAsync] = Google.useAuthRequest({
    androidClientId: ANDROID_STANDALONE_APP_CLIENT_ID,
    iosClientId: IOS_STANDALONE_APP_CLIENT_ID,
    clientId: CLIENT_ID,
  });
  const setUserId = useCombinedStore(state => state.setUserId);

  useEffect(() => {
    if (googleResponse?.type === 'success') {
      setIsLoadingSignIn(true);

      const signInWithGoogle = async () => {
        const { id_token } = googleResponse.params;
        const credential = GoogleAuthProvider.credential(id_token);

        try {
          const response = await signInWithCredential(auth, credential);

          const token = await response.user.getIdToken();
          const uid = await response.user.uid;

          setUserId(uid);
          setUserLoggedIn(token);
        } catch (err) {
          console.log(err);
        } finally {
          setIsLoadingSignIn(false);
        }
      };

      signInWithGoogle();
    }
  }, [googleResponse]);

  return { googlePromptAsync, authReqState, isLoadingSignIn };
};
