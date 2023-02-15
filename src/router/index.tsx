
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import HCWorkbench from "../pages/Workbench";
import HCWorkbenchGuide from "../pages/Workbench/guide";
import HCWorkbenchInboundGuide from "../pages/Workbench/guide/inbound";
import HCWorkbenchOutboundGuide from "../pages/Workbench/guide/outbound";
import HCWorkbenchTask from "../pages/Workbench/task";
import HCTestPage from "../pages/test";



export default class HCRouter extends React.Component {
    render(): React.ReactNode {
        const router = createBrowserRouter([
            { path: "workbench", element: <HCWorkbench /> },
            { path: "workbench/guide", element: <HCWorkbenchGuide /> },
            { path: "workbench/guide/inbound", element: <HCWorkbenchInboundGuide /> },
            { path: "workbench/guide/outbound", element: <HCWorkbenchOutboundGuide /> },
            { path: "workbench/task", element: <HCWorkbenchTask /> },
            { path: "test", element: <HCTestPage /> },
            { path: "*", element: <HCWorkbench /> }
        ], { basename: "" });

        return (
            <RouterProvider router={router} ></RouterProvider>
        );
    }
}