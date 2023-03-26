
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import HCHome from "../pages/Home";
import HCWorkbench from "../pages/Workbench";
import HCWorkbenchTask from "../pages/Workbench/task";
import HCOrder from "../pages/Workbench/order";
import HCOrderInbound from "../pages/Workbench/order/inbound";
import HCOrderInboundQuickAdd from "../pages/Workbench/order/inbound_quick_add";
import HCOrderOutbound from "../pages/Workbench/order/outbound";
import HCOrderOutboundQuickAdd from "../pages/Workbench/order/outbound_quick_add";


export default class HCRouter extends React.Component {
    render(): React.ReactNode {
        const router = createBrowserRouter([
            { path: "home", element: <HCHome /> },
            { path: "workbench", element: <HCWorkbench /> },
            { path: "workbench/task", element: <HCWorkbenchTask /> },
            { path: "workbench/order", element: <HCOrder /> },
            { path: "workbench/order/inbound", element: <HCOrderInbound /> },
            { path: "workbench/order/inbound/quick_add", element: <HCOrderInboundQuickAdd /> },
            { path: "workbench/order/outbound", element: <HCOrderOutbound /> },
            { path: "workbench/order/outbound/quick_add", element: <HCOrderOutboundQuickAdd /> },
            { path: "*", element: <HCWorkbench /> }
        ], { basename: "" });

        return (
            <RouterProvider router={router} ></RouterProvider>
        );
    }
}