import React from "react";
import { Link } from "react-router-dom";
import { Button, Modal, Steps, message } from "antd";

import api from "../../../../utils/api";
import HCInboundTaskGuideSearch from "./step_search";
import HCInboundTaskGuideAllocate from "./step_allocate";
import { IHCGetInboundOrdersRes } from "../../../../types/http_response.interface";
import '../index.css';



export default class HCInboundTaskGuide extends React.Component<{}, {}> {
    state = {
        current: 0,
        item_code: "",
        item_list: [],
        supplier_code: "",
        supplier_list: [],
        item_quantity: 0,
        modal_msg: "",
        modal_is_open: false,
        steps: [
            {
                title: '第一步',
                description: '输入来货信息',
                content: <HCInboundTaskGuideSearch ref={child => this.child_search = child} />
            },
            {
                title: '第二步',
                description: '分配物品数量',
                content: <HCInboundTaskGuideAllocate ref={child => this.child_allocate = child} />
            },
            // {
            //     title: '第三步',
            //     description: '确认分配结果',
            //     content: ""
            // }
        ],
    };
    child_search: HCInboundTaskGuideSearch | null | undefined;
    child_allocate: HCInboundTaskGuideAllocate | any;

    constructor(props: {}) {
        super(props);
    }

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
            <Modal title="激活出库单结果" open={this.state.modal_is_open} onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}>
                <p>{this.state.modal_msg}</p>
            </Modal>
        </div>;
    }

    handleOk() {
        this.setState({
            modal_is_open: false
        }, () => {
            window.location.href = "/workbench";
        });
    }

    handleCancel() {
        this.setState({
            modal_is_open: false
        });
    }

    prev() {
        this.setState({ current: this.state.current - 1 })
    }

    next() {
        if (this.state.current === 0) {
            if (!this.child_search?.confirm_item_code()) {
                message.error("物品码不能为空！");
                return
            }

            if (!this.child_search?.confirm_item_quantity()) {
                message.error("物品数量不能为空！");
                return
            }

            this.setState({
                item_code: this.child_search.state.cur_item_code,
                item_list: this.child_search.state.cur_item_list,
                item_quantity: this.child_search.state.cur_item_quantity,
                supplier_code: this.child_search.state.cur_supplier_code,
                supplier_list: this.child_search.state.cur_supplier_list,
            }, this.allocate_orders);
        }
        else if (this.state.current === 1) {

        }
        else if (this.state.current === 2) { }

        this.setState({ current: this.state.current + 1 })
    }

    async done() {
        for (let [order_code, order_details] of Object.entries(this.child_allocate.child_table.state.allocated_item_details as [])) {
            const allocate_result = await api.AllocateWorkbenchInboundOrder([{ order_code, order_details: [...order_details] }]);
            console.log(allocate_result);
        }

        this.activate_task();
    }

    async allocate_orders() {
        message.info(`入库物品: ${this.state.item_code}, 入库数量: ${this.state.item_quantity}`);
        const get_result: IHCGetInboundOrdersRes = await api.GetInboundOrders(this.state.item_code, this.state.supplier_code, [0, 1, 2, 3, 4, 5])
        if (get_result.data.data_list) {
            this.child_allocate.set_inbound_order_list(get_result.data.data_list, this.state.item_code, this.state.item_quantity);
        }
    }

    async activate_task() {
        const activate_result = await api.ActivateWorkbenchWcsTask();
        if (!activate_result || activate_result.result_code != 0) {
            this.setState({
                modal_msg: `activate wcs task fail! ${activate_result.result_code}: ${activate_result.result_msg}`,
                modal_is_open: true,
            }, () => { });
        } else {
            this.setState({
                modal_msg: `activate wcs task success. result_code: ${activate_result.result_code}`,
                modal_is_open: true,
            }, () => { });
        }
    }
}