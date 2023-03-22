import React from "react";
import { Link } from "react-router-dom";
import { Button, Col, Row } from "antd";



export default class HCOrder extends React.Component {
    render(): React.ReactNode {
        return <div className="hc_panel">
            <Row>
                <Col span={6} offset={4}>
                    <Link to={{ pathname: "/workbench/order/inbound" }}>
                        <Button type="primary" style={{ width: "100%", height: "100px", margin: "10px auto", fontSize: "3em" }}>入库</Button>
                    </Link>
                </Col>
                <Col span={6} offset={4}>
                    <Link to={{ pathname: "/workbench/order/outbound" }}>
                        <Button type="primary" style={{ width: "100%", height: "100px", margin: "10px auto", fontSize: "3em" }}>出库</Button>
                    </Link>
                </Col>
            </Row>
        </div>;
    }
}
