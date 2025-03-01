
import {PrivateRoute} from "shared/private-route";
import {Auth} from "features/auth";
import {HomePage} from "pages/home";
import iRoute from "app/routers/lib/types";

import {ROUTES} from "shared/lib";


export const PublicRoutes: iRoute[] = [
    {
        path: `${ROUTES.auth}`,
        element: <PrivateRoute onlyUnAuth={false}  children={<Auth/>}/>,
    },

];


export const PrivateRoutes: iRoute[] = [
    {
        path: `${ROUTES.home}`,
        element:<PrivateRoute onlyUnAuth={true}  children={<HomePage/>}/>,
    },
]
