import { ReactFragment, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

interface Props {
  children: any;
}

const ProtectedRoute: React.FC<Props> = ({children}) => {
  const {user} = UserAuth()
  console.log(user)

  if (!user) {
    return <Navigate to="/" />
  } 

  return children
};

export default ProtectedRoute;