import { Navigate } from "react-router";
import React from "react";

import { useLocation } from "react-router-dom";

import { useSelector } from "react-redux";
import { ROUTES } from "shared/lib";

import { selectIsAuth } from "entities/auth/model";

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

const PrivateRoute = ({ onlyUnAuth, children }: ProtectedRouteProps) => {
  const isAuthenticated = useSelector(selectIsAuth);
  const location = useLocation();

  if (!onlyUnAuth && isAuthenticated) {
    return <Navigate replace to={location.state?.from || "/"} />;
  }

  if (onlyUnAuth && !isAuthenticated) {
    return <Navigate replace to={`/` + ROUTES.auth} state={location.state} />;
  }

  return children;
};

export { PrivateRoute };
