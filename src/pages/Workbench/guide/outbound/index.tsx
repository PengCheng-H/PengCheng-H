import React from "react";
import { Link } from "react-router-dom";
import { Button, StepProps, Steps, message } from "antd";
import '../index.css';

export default class HCOutboundTaskGuide extends React.Component {
    state: { current: number, items: StepProps[] | any[] } = {
        current: 0,
        items: [
            {
                title: '第一步',
                description: '搜索订单数据',
                content: ""
            },
            {
                title: '第二步',
                description: '分配订单数量',
                content: ""
            },
            {
                title: '第三步',
                description: '确认分配结果',
                content: ""
            }
        ]
    }

    render() {
        return <div className="content">
            <Link to={{ pathname: "/workbench/" }}>
                <Button type="primary" style={{ width: "200px", height: "50px", margin: "10px", fontSize: "1.5em" }}>返回工作台</Button>
            </Link>
            <Steps current={this.state.current} items={this.state.items} className="hc_panel steps" />
            <div className="hc_panel">{this.state.items[this.state.current].content}</div>
            <div>
                {this.state.current > 0 && (
                    <Button type="default" onClick={this.prev.bind(this)} style={{ float: "left", marginLeft: "10px" }}>上一步</Button>
                )}
                {this.state.current < this.state.items.length - 1 && (
                    <Button type="primary" onClick={this.next.bind(this)} style={{ float: "right", marginRight: "10px" }}>下一步</Button>
                )}
                {this.state.current === this.state.items.length - 1 && (
                    <Button type="primary" onClick={this.done.bind(this)} style={{ float: "right", marginRight: "10px" }}>确认建单</Button>
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