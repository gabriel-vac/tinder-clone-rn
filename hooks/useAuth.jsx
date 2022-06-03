import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react';
import * as Google from 'expo-google-app-auth';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
} from 'firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext({});

const config = {
  androidClientId:
    '754283445780-9vq411mu07pmhau8dolr0o4v8fdkhh6i.apps.googleusercontent.com',
  iosClientId:
    '754283445780-4bpdb6tdb770lnm0npqmv3mkubagdlro.apps.googleusercontent.com',
  scopes: ['profile', 'email'],
  permissions: ['public_profile', 'email', 'gender', 'location'],
};

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(
    () =>
      onAuthStateChanged(auth, (usuario) => {
        if (usuario) {
          // logged In
          setUser(usuario);
        } else {
          // Not logged in
          setUser(null);
        }

        setLoadingInitial(false);
      }),
    []
  );

  const signInWithGoogle = async () => {
    setLoading(true);
    await Google.logInAsync(config)
      .then(async (logInResult) => {
        if (logInResult.type === 'success') {
          const { idToken, accessToken } = logInResult;
          const credential = GoogleAuthProvider.credential(
            idToken,
            accessToken
          );

          await signInWithCredential(auth, credential);
        }
        return Promise.reject();
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  };

  const logout = () => {
    setLoading(true);
    signOut(auth)
      .catch((err) => setError(err))
      .finally(setLoading(false));
  };

  // its a cache
  // only gonna update the information if user change, loading change or error change
  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      error,
      signInWithGoogle,
      logout,
    }),
    [user, loading, error]
  );

  return (
    <AuthContext.Provider
      // if any of these change, it causes everything (user, error, etc) re-render, we need to use useMemo
      value={memoedValue}
    >
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
