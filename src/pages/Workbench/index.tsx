import React from "react";

import HCWorkbenchTask from "./task";
import HCWorkbenchGuide from "./guide";
import './index.css';



export default class HCWorkbench extends React.Component {
    render(): React.ReactNode {
        return <div>
            <HCWorkbenchGuide />
            <HCWorkbenchTask />
        </div>;
    }
}