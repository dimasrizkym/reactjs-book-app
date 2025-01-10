import { Navigate } from "react-router-dom";

const GuestRoute = ({ children }) => {
  const isAuth = localStorage.getItem("auth");

  if (isAuth) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default GuestRoute;
