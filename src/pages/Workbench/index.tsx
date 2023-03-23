import React from "react";

import HCOrder from "./order";
import HCPickStation from "./pick_station";
import HCWorkbenchTask from "./task";
import HCWorkbenchGuide from "./guide";
import './index.css';
import { Col, Row } from "antd";



export default class HCWorkbench extends React.Component {
    render(): React.ReactNode {
        return <div>
            <HCOrder />
            <Row style={{ height: "50px" }}>
                <Col span={11}></Col>
                <Col span={2}>
                    <h1 style={{}}>工 作 台</h1>
                </Col>
                <Col span={11}></Col>
            </Row>
            <HCPickStation />
            <HCWorkbenchTask />
        </div >;
    }
}