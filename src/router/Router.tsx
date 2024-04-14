import {
    createBrowserRouter,
} from "react-router-dom";
import Home from "../Home/Home";
import Dashboard from "../pages/dashboard/Dashboard";
import AddPost from "../pages/dashboard/components/AddPost";
export const router = createBrowserRouter([
    {
        path: "/",
        Component: Home,
    },
    {
        path: "/dashboard",
        Component: Dashboard,
    },
    {
        path: "/addpost",
        Component: AddPost,
    },
]);