import {
    createBrowserRouter,
} from "react-router-dom";
import Home from "../Home/Home";
import Dashboard from "../component/pages/dashboard";
export const router = createBrowserRouter([
    {
        path: "/",
        Component: Home,
    },
    {
        path: "/dashboard",
        Component: Dashboard,
    },
]);