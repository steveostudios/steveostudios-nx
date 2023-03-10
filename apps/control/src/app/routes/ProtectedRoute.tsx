import { ReactFragment, ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContextProvider, useFirebaseAuth } from "../context/AuthContext";

interface Props {
  children: any;
}

const ProtectedRoute: React.FC<Props> = ({children}) => {
  const {user} = useFirebaseAuth()
  console.log(user)

  if (user === undefined) {
    return <Navigate to="/" />
  } 

  return children
};

export default ProtectedRoute;