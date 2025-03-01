
import {createBrowserRouter} from "react-router-dom";
import Layout from "app/layout";
import {PrivateRoutes, PublicRoutes} from "app/routers/routes";

  const AppRouter = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [...PublicRoutes, ...PrivateRoutes],
    },
]);
export {AppRouter};