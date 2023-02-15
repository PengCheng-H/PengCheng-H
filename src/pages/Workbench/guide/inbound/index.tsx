import React from "react";
import { Link } from "react-router-dom";
import { Button, Steps, message } from "antd";
import '../index.css';

export default class HCInboundTaskGuide extends React.Component {
    state = {
        current: 0,
        steps: [
            {
                title: '第一步',
                description: '输入来货信息',
                content: ""
            },
            {
                title: '第二步',
                description: '分配物品数量',
                content: ""
            },
            {
                title: '第三步',
                description: '确认分配结果',
                content: ""
            }
        ],
        inbound_items: {

        }
    };

    render() {
        return <div>
            <Link to={{ pathname: "/workbench/" }}>
                <Button type="primary" style={{ width: "200px", height: "50px", margin: "10px", fontSize: "1.5em" }}>返回工作台</Button>
            </Link>
            <Steps current={this.state.current} items={this.state.steps} className="hc_panel steps" />
            <div className="hc_panel">{this.state.steps[this.state.current].content}</div>
            <div className="hc_panel">
                {this.state.current > 0 && (
                    <Button type="default" onClick={this.prev.bind(this)} style={{ float: "left" }}>上一步</Button>
                )}
                {this.state.current < this.state.steps.length - 1 && (
                    <Button type="primary" onClick={this.next.bind(this)} style={{ float: "right" }}>下一步</Button>
                )}
                {this.state.current === this.state.steps.length - 1 && (
                    <Button type="primary" onClick={this.done.bind(this)} style={{ float: "right" }}>确认建单</Button>
                )}
            </div>
        </div>;
    }

    prev() {
        this.setState({ current: this.state.current - 1 })
    }

    next() {
        this.setState({ current: this.state.current + 1 })
    }

    done() {
        message.success("建单成功!");
    }
}