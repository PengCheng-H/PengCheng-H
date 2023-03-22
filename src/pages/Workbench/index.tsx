import React from "react";

import HCOrder from "./order";
import HCPickStation from "./pick_station";
import HCWorkbenchTask from "./task";
import HCWorkbenchGuide from "./guide";
import './index.css';



export default class HCWorkbench extends React.Component {
    render(): React.ReactNode {
        return <div>
            <HCOrder />
            <hr style={{ marginBottom: 35 }} />
            <HCPickStation />
            <hr style={{ marginBottom: 35 }} />
            <HCWorkbenchTask />
            <hr style={{ marginBottom: 35 }} />
        </div>;
    }
}