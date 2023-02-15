import React from "react";
import { Button, Col, Row, message } from "antd";
import { Link } from "react-router-dom";

export default class HCTaskGuide extends React.Component {
    state: {} = {}

    render() {
        return (
            <div>
                <Row style={{ margin: "50px auto" }}>
                    <Col span={12} offset={9}>
                        <Link to={{ pathname: '/guide/inbound' }}>
                            <Button type="primary" onClick={this.onBtnInboundClick} style={{ width: "50%", height: '5em', fontSize: "20px" }}>入库</Button>
                        </Link>
                    </Col>
                </Row>
                <Row style={{ margin: "50px auto" }}>
                    <Col span={12} offset={9}>
                        <Link to={{ pathname: '/guide/outbound' }}>
                            <Button type="primary" onClick={this.onBtnOutboundClick} style={{ width: "50%", height: '5em', fontSize: "20px" }}>出库</Button>
                        </Link>
                    </Col>
                </Row>
            </div>
        );
    }

    onBtnInboundClick() {
        message.info("入库");
    }
    onBtnOutboundClick() {
        message.info("出库");
    }

}