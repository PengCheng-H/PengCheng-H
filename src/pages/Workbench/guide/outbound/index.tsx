import React from "react";
import { Link } from "react-router-dom";
import { Button, Modal, StepProps, Steps, message } from "antd";

import api from "../../../../utils/api";
import * as IHttpRes from "../../../../types/http_response.interface";
import HCOutboundOrderInfo from "./step_info";
import HCOutboundOrderAllocate from "./step_allocate";
import '../index.css';



export default class HCOutboundTaskGuide extends React.Component<{}, {}> {
    state = {
        current: 0,
        item_code: "",
        item_quantity: 0,
        item_list: [],
        supplier_code: "",
        sipplier_list: [],
        modal_msg: "",
        modal_is_open: false,
        items: [
            {
                title: '第一步',
                description: '输入出库订单信息',
                content: <HCOutboundOrderInfo ref={child => this.child_info = child} />
            },
            {
                title: '第二步',
                description: '分配出库物品数量',
                content: <HCOutboundOrderAllocate ref={child => this.child_allocate = child} />
            }
        ]
    }
    child_info: HCOutboundOrderInfo | any;
    child_allocate: HCOutboundOrderAllocate | any;

    render() {
        return <div className="content">
            <Link to={{ pathname: "/workbench/" }}>
                <Button type="primary" style={{ width: "200px", height: "50px", margin: "10px", fontSize: "1.5em" }}>返回工作台</Button>
            </Link>
            <Steps current={this.state.current} items={this.state.items} className="hc_panel steps" />
            <div className="hc_panel">{this.state.items[this.state.current].content}</div>
            <div className="hc_panel">
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
            if (!this.child_info?.confirm_item_code()) {
                message.error("物品编码不能为空！");
                return
            }

            if (!this.child_info?.confirm_item_quantity()) {
                message.error("物品数量不能为空！");
                return
            }

            this.setState({
                item_code: this.child_info.state.cur_item_code,
                item_list: this.child_info.state.cur_item_list,
                item_quantity: this.child_info.state.cur_item_quantity,
                supplier_code: this.child_info.state.cur_supplier_code,
                sipplier_list: this.child_info.state.cur_supplier_list,
            }, this.allocate_orders);
        }
        else if (this.state.current === 1) { }
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

    async quick_add_orders() {
        const result = await api.QuickAddOutboundOrder([
            {
                supplier_code: this.state.supplier_code,
                item_code: this.state.item_code,
                quantity: this.state.item_quantity
            }
        ]);

        if (!result || result.result_code != 0) {
            message.error(`快速建单失败！供应商: ${this.state.supplier_code}, 物品: ${this.state.item_code}, 数量: ${this.state.item_quantity}。`);
            return;
        }

        await this.allocate_orders(true);
    }

    async allocate_orders(from_quikc_add_order: boolean = false) {
        const get_result: IHttpRes.IHCGetOutboundOrdersRes = await api.GetOutboundOrders(this.state.item_code, this.state.supplier_code, [0, 1, 2, 3])

        if (!get_result || get_result.result_code != 0) {
            message.warning(`分配物品数量到出库单失败！物品: ${this.state.item_code}, 数量: ${this.state.item_quantity}。`);
            message.error(`错误代码：${get_result.result_code}，错误消息：${get_result.result_msg}。`);
            return;
        }

        if (!from_quikc_add_order && (!get_result.data.data_list || get_result.data.data_list.length <= 0)) {
            this.quick_add_orders();
            return;
        } else if (!get_result.data || !get_result.data.data_list || get_result.data.data_list.length <= 0) {
            message.error(`未找到出库单！ err_code: ${get_result.result_code}, err_msg: ${get_result.result_msg}`);
            return;
        }

        this.child_allocate.set_outbound_order_list(get_result.data.data_list, this.state.item_code, this.state.item_quantity);
    }

    async activate_task() {
        const activate_result: IHttpRes.HttpResponse = await api.ActivateWorkbenchWcsTask();
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

    // async activate_task(outbound_order_code: string) {
    //     const result = await api.ActivateOutboundOrder(outbound_order_code);
    //     if (result && result.result_code == 0) {
    //         this.setState({
    //             modal_msg: `activate outbound order fail! ${result.result_code}: ${result.result_msg}`,
    //             modal_is_open: true,
    //         });
    //     } else {
    //         this.setState({
    //             modal_msg: `activate outbound order success. result_code: ${result.result_code}`,
    //             modal_is_open: true,
    //         });
    //     }
    // }
}


