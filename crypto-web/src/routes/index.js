import UserProvider from "../provider/user";
import Favourties from "../views/favourite";
import Home from "../views/home";
import Login from "../views/login";
import Register from "../views/register";

const { createBrowserRouter } = require("react-router-dom");

const router = createBrowserRouter([
    {
        element: <UserProvider />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/favourite',
                element: <Favourties />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            }
        ]
    }
])

export default router
