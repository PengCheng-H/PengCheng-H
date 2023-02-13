
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HCHome from "../pages/Home";
import HCUser from "../pages/User";
import HCPDA from "../pages/PDA";
import { Component, ReactNode } from "react";


export default class HCRouter extends Component {
    render(): ReactNode {
        const router = createBrowserRouter([
            { path: "home", element: <HCHome />, },
            { path: "user", element: <HCUser />, },
            { path: "pda", element: <HCPDA />, },
            { path: "*", element: <HCHome />, },
        ], { basename: "" });

        return (
            <RouterProvider router={router} ></RouterProvider>
        );
    }
}
