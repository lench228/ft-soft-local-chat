import { lazy } from "react";
import { PrivateRoute } from "shared/private-route";

import iRoute from "app/routers/lib/types";
import { ROUTES } from "shared/lib";

const ChatPage = lazy(() => import("pages/chat"));
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
  {
    path: `${ROUTES.chat}`,
    element: <PrivateRoute onlyUnAuth={true} children={<ChatPage />} />,
  },
];
