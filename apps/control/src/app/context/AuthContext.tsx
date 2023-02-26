import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User} from 'firebase/auth'
import { auth } from "../integrations/firebase";

type IUserContext = {
  user: User | null | undefined;
  createUser: (email: string, password: string) => void;
  logout: () => void;
  login: (email: string, password: string) => void;
}

export function createCtx<ContextType>() {
  const ctx = React.createContext<ContextType | undefined>(undefined);
  function useCtx() {
    const c = React.useContext(ctx);
    if (!c) throw new Error("useCtx must be inside a Provider with a value");
    return c;
  }
  return [useCtx, ctx.Provider] as const;
}

// const defaultState = {
//   user: null,
//   createUser: () => {},
//   logout: () => {},
//   login: () => {}
// }

export const [UserAuth, CtxProvider] = createCtx<IUserContext>()

type IProvider = {
  children: ReactNode;
}


export const AuthContextProvider = ({children}: IProvider) => {
  const [user, setUser] = useState<User | null>()

  console.log(user)

  const createUser = (email:string, password:string) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const logout = () => {
    return signOut(auth)
  }

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("-- Auth Changed --")
      console.log(currentUser)
      setUser(currentUser)
    })
    return unsubscribe()
  }, [])

  return (
    <CtxProvider value={{user, createUser, logout, login}}>
      {children}
    </CtxProvider>
)}

// export const UserAuth = () => {
//   return useContext(UserContext)
// }