import React from "react";
import { Button, Input, InputNumber, Modal, message } from "antd";

import api from "../../../utils/api";
import { IHCBoxDetail, IHCPickStation } from "../../../types/interface";


interface WorkConfirmModalProps {
    pick_station: IHCPickStation
}

interface WorkConfirmModalState {
    box_code: string
    task_type: string
    modal_open: boolean
    pick_station: IHCPickStation
    region_task_details: IHCBoxDetail[]
}

export default class WorkConfirmModal extends React.Component<WorkConfirmModalProps, WorkConfirmModalState> {
    state: WorkConfirmModalState = {
        box_code: this.props.pick_station.box_code,
        task_type: "",
        modal_open: false,
        pick_station: this.props.pick_station,
        region_task_details: [] as IHCBoxDetail[],
    };

    constructor(props: { pick_station: IHCPickStation }) {
        super(props);
    }

    render(): React.ReactNode {
        return <div>
            <Button type="primary" onClick={this.showModal.bind(this)}>作业详情确认</Button>
            <Modal title="作业详情" open={this.state.modal_open} okText="作业完成确认" cancelText="取消" onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}>
                <p><span>料箱编号：</span>{this.state.box_code}</p>
                <p><span>任务类型：</span>{this.state.task_type == "0" ? "入库" : "出库"}</p>
                {this.state.region_task_details.map(item => {
                    return <div>
                        <p><label>物品编码：</label><span>{item.item_code}</span></p>
                        <p><label>拣选数量：</label><InputNumber defaultValue={item.quantity} onInput={this.handleItemQuantityChanged.bind(this)}></InputNumber></p>
                    </div>;
                })}
            </Modal>
        </div >
    }

    async showModal() {
        const result = await api.GetBoxDetail(this.state.pick_station.box_code);
        if (!result || result.result_code != 0) {
            message.error(`获取料箱详情失败！料箱编号: ${this.state.box_code}`);
            return;
        }

        this.setState({
            box_code: result.data.box_code,
            task_type: result.data.task_type,
            region_task_details: result.data.region_task_details,
            modal_open: true
        });
    }

    handleItemQuantityChanged(value: any) {
        if (typeof (value) != "number") { return; }
        this.setState({
        });
    }

    async handleOk() {
        let details: { item_code: string, box_region_id: number, actual_quantity: number }[] = [];

        this.state.region_task_details.map(item => {
            details.push({
                item_code: item.item_code,
                box_region_id: item.box_region_id,
                actual_quantity: item.quantity
            });
        });

        const result = await api.FinishWorkbenchWcsTask(this.state.box_code, details);

        if (!result || result.result_code != 0) {
            message.error(`作业失败！err_msg: ${result.result_msg}.`);
            return;
        }

        this.setState({
            modal_open: false
        }, () => {
            message.success(`作业成功。料箱编码：${this.state.box_code}, 物品数量: ${this.state.region_task_details[0].quantity}。`);
        });
    }

    handleCancel() {
        this.setState({
            modal_open: false
        });
    }
}