import React from "react";
import { Link } from "react-router-dom";
import { Button, Steps, message } from "antd";

import '../index.css';
import HCInboundTaskGuideSearch from "./step_search";



export default class HCInboundTaskGuide extends React.Component {
    state = {
        current: 0,
        steps: [
            {
                title: '第一步',
                description: '输入来货信息',
                content: <HCInboundTaskGuideSearch ref={child => this.child_search = child} />
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
        item_code: "",
        item_list: []
    };
    child_search: HCInboundTaskGuideSearch | null | undefined;

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
        if (this.state.current === 0) {
            if (!this.child_search?.confirm()) {
                message.error("参数有误，请核对参数后再次重试！");
                return
            }
            this.setState({
                item_code: this.child_search.state.cur_item_code,
                item_list: this.child_search.state.item_list
            });
        }
        else if (this.state.current === 1) { }
        else if (this.state.current === 2) { }

        this.setState({ current: this.state.current + 1 })
    }

    done() {
        message.success("建单成功!");
    }
}