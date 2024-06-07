import {
    createBrowserRouter,
} from "react-router-dom";
import Home from "../Home/Home";
import Dashboard from "../pages/dashboard/Dashboard";
import AddPost from "../pages/dashboard/components/AddPost";
import PushNotification from "../pages/dashboard/components/PushNotification";
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
    {
        path: "/push-notifications",
        Component: PushNotification,
    },
]);