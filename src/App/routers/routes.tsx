import React, { lazy } from "react";
import PrivateRoute from "shared/private-route";

import iRoute from "app/routers/lib/types";
import { ROUTES } from "shared/lib";

const HomePage = lazy(() => import("pages/home"));
const AuthPage = lazy(() => import("pages/ auth"));

export const PublicRoutes: iRoute[] = [
  {
    path: `${ROUTES.auth}`,
    element: <PrivateRoute onlyUnAuth={false} children={<AuthPage />} />,
  },
];

export const PrivateRoutes: iRoute[] = [
  {
    path: `${ROUTES.home}`,
    element: <PrivateRoute onlyUnAuth={true} children={<HomePage />} />,
  },
];
