import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login/Login";
import Purchases from "../pages/Purchases/Purchases";
import ProtectedRoute from "../components/common/ProtectedRoute/ProtectedRoute";
import Profile from "../pages/Profile/Profile";
import Home from "../pages/Home/Home";
import { homeLoader } from "./loaders/homeLoader";
import ProductDetail from "../pages/ProductDetail/ProductDetail";

export const router = createBrowserRouter([
    {
        element: <App/>,
        children: [
            {
                path: "/login",
                element: <Login/>
            },
            {
                path: "/",
                loader: homeLoader,
                element: <Home />
            },
            {
                path: "/purchases",
                element: (
                    <ProtectedRoute>
                        <Purchases/>
                    </ProtectedRoute>
                )
            },
            {
                path: "/profile",
                element: (
                    <ProtectedRoute>
                        <Profile/>
                    </ProtectedRoute>
                )
            },
            {
                path: "/product/:productId",
                element: <ProductDetail/>
            }
        ]
    },
    {
        path: "*",
        element: <p>Page was not founded 404</p>
    }
])