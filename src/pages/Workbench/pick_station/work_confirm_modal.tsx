import React from "react";
import { CheckCircleOutlined } from '@ant-design/icons';
import { Button, InputNumber, Modal, Row, message } from "antd";

import api from "../../../utils/api";
import { IHCBoxDetail, IHCItem, IHCPickStation } from "../../../types/interface";


interface WorkConfirmModalProps {
    pick_station: IHCPickStation;
}

interface WorkConfirmModalState {
    box_code: string;
    task_type: string;
    modal_open: boolean;
    pick_station: IHCPickStation;
    box_details: IHCBoxDetail[];
    loadding: boolean;
}

export default class WorkConfirmModal extends React.Component<WorkConfirmModalProps, WorkConfirmModalState> {

    constructor(props: WorkConfirmModalProps) {
        super(props);
        this.state = {
            box_code: this.props.pick_station.box_code,
            task_type: "",
            modal_open: false,
            pick_station: this.props.pick_station,
            box_details: [],
            loadding: false
        };
    }

    render(): React.ReactNode {
        return <div>
            <Button icon={<CheckCircleOutlined />} type="primary" onClick={this.showModal.bind(this)}>作业详情确认</Button>
            <Modal title="作业详情" open={this.state.modal_open} okText="作业完成确认" cancelText="取消" onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)} confirmLoading={this.state.loadding}>
                <Row><span>料箱编号：</span>{this.state.box_code}</Row>
                <Row><span>任务类型：</span>{this.state.task_type == "0" ? "入库" : "出库"}</Row>
                {this.state.box_details.length ? this.state.box_details.map(box_detail => {
                    return <div key={box_detail.key}>
                        <hr />
                        <Row><label>料箱分区：</label><span>{box_detail.box_region_id}</span></Row>
                        <Row><label>物料编码：</label><span>{box_detail.item_code}</span></Row>
                        <Row><label>物料存货码：</label><span>{box_detail.item_detail?.item_external_code1}</span></Row>
                        <Row><label>物料名称：</label><span>{box_detail.item_detail?.item_name}</span></Row>
                        <Row><label>物料数量：</label><InputNumber defaultValue={box_detail.quantity} onInput={this.handleItemQuantityChanged.bind(this, box_detail.key)}></InputNumber></Row>
                    </div>
                }) : null}
            </Modal>
        </div >
    }

    async showModal() {
        const result = await api.WorbenchTaskDetailView(this.state.pick_station.box_code);
        if (!result || result.result_code != 0) {
            message.error(`获取料箱详情失败！料箱编号: ${this.state.box_code}`);
            return;
        }

        const box_details = result.data.region_task_details;

        for (let box_detail of box_details) {
            box_detail.key = box_detail.item_code;
            box_detail.item_detail = {} as IHCItem;
            box_detail.item_detail.key = box_detail.item_detail.item_code;
            const get_item_detail_result = await api.ItemDetailGet(box_detail.item_code);
            if (get_item_detail_result && get_item_detail_result.result_code == 0) {
                box_detail.item_detail = get_item_detail_result.data;
            }
        }

        this.setState({
            box_code: result.data.box_code,
            task_type: result.data.task_type,
            box_details: box_details,
            modal_open: true
        });
    }

    handleItemQuantityChanged(key: any, value: any) {
        const box_details: IHCBoxDetail[] = [...this.state.box_details];
        box_details.map(box_detail => {
            if (box_detail.key == key) {
                box_detail.quantity = parseInt(value);
            }
        });

        this.setState({
            box_details: box_details
        });
    }

    async handleOk() {
        this.setState({ loadding: true });
        let details: { item_code: string, box_region_id: number, actual_quantity: number }[] = [];

        this.state.box_details.map(item => {
            details.push({
                item_code: item.item_code,
                box_region_id: item.box_region_id,
                actual_quantity: item.quantity
            });
        });

        const result = await api.WorkbenchTaskDetailConfirm(this.state.box_code, details);

        if (!result || result.result_code != 0) {
            message.error(`作业失败! err_msg: ${result.result_msg}.`);
            return;
        }


        this.setState({
            modal_open: false,
            loadding: false
        }, () => {
            setTimeout(window.location.reload, 1000)
        });
    }

    handleCancel() {
        this.setState({
            modal_open: false
        }, () => {
            setTimeout(window.location.reload, 1000)
        });
    }
}