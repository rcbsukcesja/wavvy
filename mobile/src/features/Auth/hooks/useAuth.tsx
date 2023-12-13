import { signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useCombinedStore } from 'src/store';
import { getStorageItem, removeStorageItem, setStorageItem } from 'src/utils/storage';

const userTokenStorageKey = 'USER_TOKEN';

type AuthReqestState = 'IDLE' | 'LOADING' | 'FINISHED';

export const useAuth = () => {
  const [authReqState, setAuthReqState] = useState<AuthReqestState>('IDLE');
  const handleSetStoreIsLoggedIn = useCombinedStore(state => state.handleLogin);
  const handleSetStoreIsLoggedOut = useCombinedStore(state => state.handleLogout);
  const isLogged = useCombinedStore(state => state.isLogged);
  const setUserId = useCombinedStore(state => state.setUserId);

  const setUserLoggedIn = async (token: string) => {
    setAuthReqState('LOADING');

    await setStorageItem(userTokenStorageKey, token).finally(() => setAuthReqState('FINISHED'));

    handleSetStoreIsLoggedIn();
  };

  const setUserLogout = () => {
    removeStorageItem(userTokenStorageKey);
    setUserId('');
    handleSetStoreIsLoggedOut();
  };

  useEffect(() => {
    if (isLogged) return;

    const getTokenFormStorage = async () => {
      try {
        const token = await getStorageItem<string>(userTokenStorageKey);
        if (!token) return;

        setUserLoggedIn(token);
      } catch (err) {
        console.log(err);
      }
    };

    getTokenFormStorage();
  }, [isLogged]);

  return { authReqState, setUserLoggedIn, setUserLogout, isLogged };
};
