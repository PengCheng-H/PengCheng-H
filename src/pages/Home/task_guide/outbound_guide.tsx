import { Button, StepProps, Steps, message, theme } from "antd";
import React from "react";

export default class HCOutboundTaskGuide extends React.Component {
    state: { current: number, items: StepProps[], contents: { body: any }[] } = {
        current: 0,
        items: [
            {
                title: '第一步',
                description: '选择订单类型',
            },
            {
                title: '第二步',
                description: '搜索订单数据',
            },
            {
                title: '第三步',
                description: '分配订单数量',
            },
            {
                title: '第四步',
                description: '确认分配结果',
            },
        ],
        contents: [
            { body: "First content" },
            { body: "Second content" },
            { body: "Third content" },
            { body: "Fourth content" },
        ]
    }

    render() {
        // const { token } = theme.useToken();
        const contentStyle: React.CSSProperties = {
            // height: '20em',
            // lineHeight: '260px',
            textAlign: 'center',
            // color: token.colorTextTertiary,
            // backgroundColor: token.colorFillAlter,
            // borderRadius: token.borderRadiusLG,
            // border: `1px dashed ${token.colorBorder}`,
            border: '1px dashed #666',
            marginTop: 16,
        };

        return <div className="content">
            <Steps current={this.state.current} items={this.state.items} />
            <div style={contentStyle}>{this.state.contents[this.state.current].body}</div>
            <div style={{ marginTop: 24 }}>
                {this.state.current > 0 && (
                    <Button type="default" onClick={this.prev.bind(this)} style={{ float: "left" }}>上一步</Button>
                )}
                {this.state.current < this.state.items.length - 1 && (
                    <Button type="primary" onClick={this.next.bind(this)} style={{ float: "right" }}>下一步</Button>
                )}
                {this.state.current === this.state.items.length - 1 && (
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