import { Button, InputNumber, Modal, Popconfirm, Table, message } from "antd";

import utils from "src/utils/Index";
import { em_order_status } from "src/types/Constants";
import { IHCInboundOrder, IHCInboundOrderDetail } from "src/interfaces/interface";
import { CloseCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import { OrderStatus } from "src/types/enum";

interface InboundDetailProps {
    order: IHCInboundOrder;
    orderList: IHCInboundOrder[];
    setOrderList: (orderList: IHCInboundOrder[]) => void;
    HandleOrderDetailClose: (orderDetail: IHCInboundOrderDetail) => void
    HandleOrderDetailRemove: (orderDetail: IHCInboundOrderDetail) => void
}

export default function InboundDetail(props: InboundDetailProps) {
    const [curAllocateQty, setCurAllocateQty] = useState<number>(0);
    const [showSetCurAllocateQtyModal, setShowSetCurAllocateQtyModal] = useState<boolean>(false);
    const [curInboundOrderDetail, setCurInboundOrderDetail] = useState<IHCInboundOrderDetail>();

    const HandleViewInventoryItem = (record: IHCInboundOrderDetail) => {
        localStorage.setItem("openKeys", JSON.stringify(["/console/inventory"]));
        localStorage.setItem("selectedKeys", JSON.stringify(["/console/inventory/items"]));
        window.location.href = `/console/inventory/items?itemCode=${record.item_code}`
    };

    const onFilterDisabledStatus = (record: IHCInboundOrderDetail) => {
        return em_order_status[record.order_status] in [
            em_order_status[OrderStatus.CLOSED],
            em_order_status[OrderStatus.DELETED],
            em_order_status[OrderStatus.DONE],
            em_order_status[OrderStatus.IGNORED],
        ] ? true : false;
    };

    const ShowSetCurAllocateQtyModal = (_order_detail: IHCInboundOrderDetail) => {
        if (_order_detail.order_status === OrderStatus.CLOSED) {
            message.warning('该订单行已关闭们无法分配');
            return;
        }
        setCurInboundOrderDetail(_order_detail);
        setShowSetCurAllocateQtyModal(true);
    }

    const SetOrderDetailCurrentAllocateQty = () => {
        if (curAllocateQty < 0) {
            message.warning('本次分配的数量不能小于0！');
            setCurAllocateQty(0);
            return;
        }

        if (curAllocateQty + props.order.order_allocated_qty > props.order.order_qty) {
            message.warning('本次分配的数量加上已分配的数量已超过订单数量，已自动分配最大可分配数量！');
            setCurAllocateQty(props.order.order_qty - props.order.order_allocated_qty);
        }

        setCurInboundOrderDetail({ ...curInboundOrderDetail, cur_order_allocated_qty: curAllocateQty } as IHCInboundOrderDetail);
        const _orderDetailList = props.order.order_details.map((value, _index, _arr) => {
            if (value.line_no === curInboundOrderDetail?.line_no) {
                value.cur_order_allocated_qty = curAllocateQty;
            }
            return value;
        });
        const _orderList = props.orderList.map((value, _index, _arr) => {
            if (value.order_code === props.order.order_code) {
                value.order_details = _orderDetailList;
            }
            return value;
        });
        props.order.order_details = _orderDetailList;
        props.setOrderList(_orderList);
        setShowSetCurAllocateQtyModal(false);
        setCurAllocateQty(0);
    }

    return <>
        <Table
            className="virtual-table"
            bordered
            rowKey={(_record) => utils.generateElementKey()}
            dataSource={props.order.order_details}
            pagination={false}
            scroll={{ x: 960, y: 300 }}
            style={{ marginLeft: "65px" }}
            columns={[
                // { title: 'key', dataIndex: '[key', key: '[key', align: 'center', width: '120px', },
                { title: '订单行号', dataIndex: 'line_no', key: 'line_no', align: 'center', width: '120px', fixed: 'left', },
                // { title: '明细号', dataIndex: 'order_detail_id', key: 'order_detail_id', align: 'center', width: '120px', },
                // { title: 'order_code', dataIndex: 'order_code', key: 'order_code', align: 'center', width: '120px', },
                {
                    title: '订单行状态', dataIndex: 'order_status', key: 'order_status', align: 'center', width: '120px', render: (value, _record, _index) => {
                        return em_order_status[value];
                    }
                },
                { title: '物品码', dataIndex: 'item_code', key: 'item_code', align: 'center', width: '120px', },
                { title: '供应商码', dataIndex: 'supplier_code', key: 'supplier_code', align: 'center', width: '120px', },
                // { title: '包材单位', dataIndex: 'package_unit', key: 'package_unit', align: 'center', width: '120px', },
                // { title: '入库日期', dataIndex: 'storage_date', key: 'storage_date', align: 'center', width: '120px', },
                // { title: '生产日期', dataIndex: 'production_date', key: 'production_date', align: 'center', width: '120px', },
                { title: '订单数量', dataIndex: 'order_qty', key: 'order_qty', align: 'center', width: '120px', },
                { title: '已分配数量', dataIndex: 'order_allocated_qty', key: 'order_allocated_qty', align: 'center', width: '120px', },
                { title: '已完成数量', dataIndex: 'order_finished_qty', key: 'order_finished_qty', align: 'center', width: '120px', },
                { title: '本次分配数量', dataIndex: 'cur_order_allocated_qty', key: 'cur_order_allocated_qty', align: 'center', width: '120px', },
                // { title: '创建时间', dataIndex: 'created_time', key: 'created_time', align: 'center', width: '120px', },
                // { title: '创建人员', dataIndex: 'created_operator', key: 'created_operator', align: 'center', width: '120px', },
                // { title: '有效日期', dataIndex: 'expiry_date', key: 'expiry_date', align: 'center', width: '120px', },
                // { title: '更新时间', dataIndex: 'last_updated_time', key: 'last_updated_time', align: 'center', width: '120px', },
                // { title: '更新人员', dataIndex: 'last_updated_operator', key: 'last_updated_operator', align: 'center', width: '120px', },
                // { title: '属性插槽1', dataIndex: 'lot_prop1', key: 'lot_prop1', align: 'center', width: '120px', },
                // { title: '属性插槽2', dataIndex: 'lot_prop2', key: 'lot_prop2', align: 'center', width: '120px', },
                // { title: '属性插槽3', dataIndex: 'lot_prop3', key: 'lot_prop3', align: 'center', width: '120px', },
                {
                    title: '操作', dataIndex: 'operation', key: 'operation', align: 'center', width: '210px', fixed: 'right', render: (_value: any, record: IHCInboundOrderDetail, _number) => {
                        return <>
                            <Button type='primary' disabled={onFilterDisabledStatus(record)} style={{ width: '170px' }} onClick={() => { ShowSetCurAllocateQtyModal(record); }}>设置本次分配数量</Button>
                            <Button type='primary' icon={<CloseCircleOutlined />} style={{ width: '170px', marginTop: '5px' }} onClick={() => { HandleViewInventoryItem(record); }}>查看库存</Button>
                            <Popconfirm title="确定关闭吗?" onConfirm={() => props.HandleOrderDetailClose(record)}>
                                <Button type='primary' icon={<CloseCircleOutlined />} danger style={{ marginTop: '5px', marginBottom: '5px' }} >关闭</Button>
                            </Popconfirm>
                            <Popconfirm title="确定移除吗?" onConfirm={() => props.HandleOrderDetailRemove(record)}>
                                <Button type='default' icon={<DeleteOutlined />} danger style={{ marginLeft: '5px' }}>移除</Button>
                            </Popconfirm>
                        </>
                    }
                },
            ]}
        />
        <Modal
            title="设置本次入库数量"
            open={showSetCurAllocateQtyModal}
            okText="确认设置"
            cancelText="取消设置"
            onOk={() => { SetOrderDetailCurrentAllocateQty() }}
            onCancel={() => { setShowSetCurAllocateQtyModal(false) }}
            width={"60%"}
        >
            <label>请输入本次入库数量：</label>
            <InputNumber value={curAllocateQty} min={0} onChange={(value: number | null) => { setCurAllocateQty(value || 0); }} />
        </Modal>
    </>
}