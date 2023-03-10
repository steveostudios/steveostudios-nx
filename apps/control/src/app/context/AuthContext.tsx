import * as React from "react";
import { createUser, login, logout, auth } from "@nx/firebase";
import { onAuthStateChanged } from "firebase/auth";
import firebase from "firebase/auth"

type User = firebase.User | null;
type ContextState = { 
  user: User, 
  login: (email: string, password: string) => void, 
  createUser: (email: string, password: string) => void,
  logout: () => void
};

type IProvider = {
  children: React.ReactNode;
}

const AuthContext =
  React.createContext<ContextState | undefined>(undefined);

const AuthContextProvider = ({children}: IProvider) => {
  const [user, setUser] = React.useState<User | null>(null);
  const value = { user, createUser, login, logout };

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setUser(currentUser)
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

function useFirebaseAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      "useFirebaseAuth must be used within a FirebaseAuthProvider"
    );
  }
  return context;
}

export { AuthContextProvider, useFirebaseAuth };
 