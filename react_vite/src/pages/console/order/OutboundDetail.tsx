import { Table } from "antd";

import utils from "src/utils/Index";
import { IHCOutboundOrderDetail } from "src/interfaces/interface";

interface OutboundDetailProps {
    orderDetailList: IHCOutboundOrderDetail[]
}

export default function OutboundDetail(props: OutboundDetailProps) {
    console.log(props);
    return <Table
        className="virtual-table"
        bordered
        rowKey={(record) => utils.generateElementKey()}
        dataSource={props.orderDetailList}
        pagination={false}
        scroll={{ x: 960, y: 300 }}
        style={{ marginLeft: "65px" }}
        columns={[
            // { title: 'key', dataIndex: '[key', key: '[key', width: '120px', },
            { title: '行号', dataIndex: 'line_no', key: 'line_no', width: '120px', fixed: 'left', },
            // { title: 'order_code', dataIndex: 'order_code', key: 'order_code', width: '120px', },
            // { title: 'order_status', dataIndex: 'order_status', key: 'order_status', width: '120px', },
            { title: '物品码', dataIndex: 'item_code', key: 'item_code', width: '120px', },
            { title: '供应商码', dataIndex: 'supplier_code', key: 'supplier_code', width: '120px', },
            // { title: '包材单位', dataIndex: 'package_unit', key: 'package_unit', width: '120px', },
            // { title: '入库日期', dataIndex: 'storage_date', key: 'storage_date', width: '120px', },
            // { title: '生产日期', dataIndex: 'production_date', key: 'production_date', width: '120px', },
            { title: '订单数量', dataIndex: 'order_qty', key: 'order_qty', width: '120px', },
            { title: '已分配数量', dataIndex: 'order_allocated_qty', key: 'order_allocated_qty', width: '120px', },
            { title: '已完成数量', dataIndex: 'order_finished_qty', key: 'order_finished_qty', width: '120px', },
            { title: '创建时间', dataIndex: 'created_time', key: 'created_time', width: '120px', },
            // { title: '创建人员', dataIndex: 'created_operator', key: 'created_operator', width: '120px', },
            // { title: '有效日期', dataIndex: 'expiry_date', key: 'expiry_date', width: '120px', },
            { title: '更新时间', dataIndex: 'last_updated_time', key: 'last_updated_time', width: '120px', },
            // { title: '更新人员', dataIndex: 'last_updated_operator', key: 'last_updated_operator', width: '120px', },
            // { title: '属性插槽1', dataIndex: 'lot_prop1', key: 'lot_prop1', width: '120px', },
            // { title: '属性插槽2', dataIndex: 'lot_prop2', key: 'lot_prop2', width: '120px', },
            // { title: '属性插槽3', dataIndex: 'lot_prop3', key: 'lot_prop3', width: '120px', },
        ]}
    />;
}