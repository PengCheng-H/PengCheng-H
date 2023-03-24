
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import HCHome from "../pages/Home";
import HCWorkbench from "../pages/Workbench";
import HCWorkbenchTask from "../pages/Workbench/task";
import HCWorkbenchGuide from "../pages/Workbench/guide";
import HCWorkbenchInboundGuide from "../pages/Workbench/guide/inbound";
import HCWorkbenchOutboundGuide from "../pages/Workbench/guide/outbound";
import HCOrder from "../pages/Workbench/order";
import HCOrderInbound from "../pages/Workbench/order/inbound";
import HCOrderInboundQuickAdd from "../pages/Workbench/order/inbound_quick_add";
import HCOrderOutbound from "../pages/Workbench/order/outbound";
import HCOrderOutboundQuickAdd from "../pages/Workbench/order/outbound_quick_add";
import HCTestIndex from "../components/HCTest";


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
            { path: "workbench/guide", element: <HCWorkbenchGuide /> },
            { path: "workbench/guide/inbound", element: <HCWorkbenchInboundGuide /> },
            { path: "workbench/guide/outbound", element: <HCWorkbenchOutboundGuide /> },
            { path: "test", element: <HCTestIndex /> },
            { path: "*", element: <HCWorkbench /> }
        ], { basename: "" });

        return (
            <RouterProvider router={router} ></RouterProvider>
        );
    }
}