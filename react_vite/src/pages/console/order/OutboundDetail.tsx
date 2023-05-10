import { Button, Popconfirm, Table } from "antd";

import utils from "src/utils/Index";
import { OrderStatus } from "src/types/enum";
import { IHCOutboundOrderDetail } from "src/interfaces/interface";
import { CloseCircleOutlined, DeleteOutlined } from "@ant-design/icons";

interface OutboundDetailProps {
    orderDetailList: IHCOutboundOrderDetail[];
    HandleOrderDetailClose: (orderDetail: IHCOutboundOrderDetail) => void
    HandleOrderDetailRemove: (orderDetail: IHCOutboundOrderDetail) => void
}

export default function OutboundDetail(props: OutboundDetailProps) {
    const handleViewInventorySummary = (record: IHCOutboundOrderDetail) => {
        localStorage.setItem("openKeys", JSON.stringify(["/console/inventory"]));
        localStorage.setItem("selectedKeys", JSON.stringify(["/console/inventory/summary"]));
        window.location.href = `/console/inventory/summary?itemCode=${record.item_code}`
    };

    return <Table
        className="virtual-table"
        bordered
        rowKey={(record) => utils.generateElementKey()}
        dataSource={props.orderDetailList}
        pagination={false}
        scroll={{ x: 960, y: 300 }}
        style={{ marginLeft: "65px" }}
        columns={[
            // { title: 'key', dataIndex: '[key', key: '[key', align: 'center', width: '120px', },
            { title: '行号', dataIndex: 'line_no', key: 'line_no', align: 'center', width: '120px', fixed: 'left', },
            { title: '明细号', dataIndex: 'order_detail_id', key: 'order_detail_id', align: 'center', width: '120px', },
            // { title: 'order_code', dataIndex: 'order_code', key: 'order_code', align: 'center', width: '120px', },
            {
                title: '订单行状态', dataIndex: 'order_status', key: 'order_status', align: 'center', width: '120px', render: (value, record, index) => {
                    return Object.keys(OrderStatus)[Object.values(OrderStatus).indexOf(value)]
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
            { title: '创建时间', dataIndex: 'created_time', key: 'created_time', align: 'center', width: '120px', },
            // { title: '创建人员', dataIndex: 'created_operator', key: 'created_operator', align: 'center', width: '120px', },
            // { title: '有效日期', dataIndex: 'expiry_date', key: 'expiry_date', align: 'center', width: '120px', },
            { title: '更新时间', dataIndex: 'last_updated_time', key: 'last_updated_time', align: 'center', width: '120px', },
            // { title: '更新人员', dataIndex: 'last_updated_operator', key: 'last_updated_operator', align: 'center', width: '120px', },
            // { title: '属性插槽1', dataIndex: 'lot_prop1', key: 'lot_prop1', align: 'center', width: '120px', },
            // { title: '属性插槽2', dataIndex: 'lot_prop2', key: 'lot_prop2', align: 'center', width: '120px', },
            // { title: '属性插槽3', dataIndex: 'lot_prop3', key: 'lot_prop3', align: 'center', width: '120px', },
            {
                title: '操作', dataIndex: 'operation', key: 'operation', align: 'center', width: '120px', fixed: 'right', render: (value: any, record: IHCOutboundOrderDetail, number) => {
                    return <>
                        <Button icon={<CloseCircleOutlined />} type='primary' style={{ marginLeft: '-10px' }} onClick={() => { handleViewInventorySummary(record); }}>查看库存</Button>
                        <Popconfirm title="确定关闭吗?" onConfirm={() => props.HandleOrderDetailClose(record)}>
                            <Button icon={<CloseCircleOutlined />} type='primary' danger style={{ marginTop: '5px', marginBottom: '5px' }} >关闭</Button>
                        </Popconfirm>
                        <Popconfirm title="确定移除吗?" onConfirm={() => props.HandleOrderDetailRemove(record)}>
                            <Button icon={<DeleteOutlined />} danger>移除</Button>
                        </Popconfirm>
                    </>
                }
            },
        ]}
    />;
}