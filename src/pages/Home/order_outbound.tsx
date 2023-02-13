import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Component, ReactNode } from "react";



interface IHCOutboundOrderDetailLotProps {
    production_date: string
    supplier_code: string
    storage_date: string
    expiry_date: string
    lot_prop1: string
    lot_prop2: string
    lot_prop3: string
}

interface IHCOutboundOrderDetail {
    order_qty: number
    expiry_date: string
    order_allocated_qty: number
    lot_prop1: string
    order_finished_qty: number
    lot_prop2: string
    order_status: string
    lot_prop3: string
    order_detail_id: number
    production_date: string
    created_time: string
    order_code: string
    supplier_code: string
    last_updated_time: string
    line_no: number
    storage_date: string
    created_operator: string
    item_code: string
    last_updated_operator: string
    lot_props: IHCOutboundOrderDetailLotProps
}

interface IHCOutboundOrder {
    external_order_code: string
    related_code1: string
    order_time: string
    order_status: string
    order_allocated_qty: number
    created_time: string
    created_operator: string
    created_from: string
    related_code2: string
    order_code: string
    order_type_code: string
    order_qty: number
    order_finished_qty: number
    receiver_name: string
    receiver_contact_tel: string
    receiver_contact_name: string
    last_updated_time: string
    last_updated_operator: string
    order_details: IHCOutboundOrderDetail[]
}

const outbound_order_headers: ColumnsType<IHCOutboundOrder> = [
    {
        key: 'order_code',
        title: '订单编号',
        dataIndex: 'order_code',
        width: 150,
        fixed: 'left',
        sorter: (a, b) => a.order_code.localeCompare(b.order_code, "en"),
    },
    {
        key: 'external_order_code',
        title: '外部编号',
        dataIndex: 'external_order_code',
        width: 120,
        sorter: (a, b) => a.external_order_code.localeCompare(b.external_order_code, "en"),
    },
    {
        key: 'related_code1',
        title: '关联编号1',
        dataIndex: 'related_code1',
        width: 120,
        sorter: (a, b) => a.related_code1.localeCompare(b.related_code1, "en"),
    },
    {
        key: 'related_code2',
        title: '关联编号2',
        dataIndex: 'related_code2',
        width: 120,
    },
    {
        key: 'order_time',
        title: '订单时间',
        dataIndex: 'order_time',
        width: 180,
        sorter: (a, b) => Date.parse(a.order_time.toString()) - Date.parse(b.order_time.toString()),
    },
    {
        key: 'order_status',
        title: '状态',
        dataIndex: 'order_status',
        width: 60,
    },
    {
        key: 'order_allocated_qty',
        title: '分配数量',
        dataIndex: 'order_allocated_qty',
        width: 60,
    },
    {
        key: 'created_time',
        title: '创建时间',
        dataIndex: 'created_time',
        width: 180,
        sorter: (a, b) => a.created_time.localeCompare(b.created_time, "en"),
    },
    {
        key: 'created_operator',
        title: '创建人员',
        dataIndex: 'created_operator',
        width: 60,
    },
    {
        key: 'created_from',
        title: '创建来源',
        dataIndex: 'created_from',
        width: 60,
    },
    {
        key: 'order_type_code',
        title: '订单类型',
        dataIndex: 'order_type_code',
        width: 60,
    },
    {
        key: 'order_qty',
        title: '订单数量',
        dataIndex: 'order_qty',
        width: 60,
    },
    {
        key: 'order_finished_qty',
        title: '完成数量',
        dataIndex: 'order_finished_qty',
        width: 60,
    },
    {
        key: 'last_updated_time',
        title: '最近操作时间',
        dataIndex: 'last_updated_time',
        width: 180,
    },
    {
        key: 'last_updated_operator',
        title: '最近操作人',
        dataIndex: 'last_updated_operator',
        width: 60,
        fixed: 'right',
    },
];

const outbound_order_list: IHCOutboundOrder[] = [
    {
        "external_order_code": "S2023021200001",
        "related_code1": "",
        "order_time": "2023-02-12T20:49:40",
        "order_qty": 100,
        "order_finished_qty": 0,
        "receiver_name": "",
        "receiver_contact_tel": "",
        "last_updated_time": "2023-02-12T20:49:40",
        "last_updated_operator": "",
        "order_code": "S2023021200001",
        "related_code2": "",
        "order_type_code": "OUT",
        "order_allocated_qty": 0,
        "order_status": "0",
        "receiver_contact_name": "",
        "created_time": "2023-02-12T20:49:40",
        "created_operator": "",
        "created_from": "1",
        "order_details": [
            {
                "item_code": "I001",
                "expiry_date": "",
                "order_qty": 100,
                "lot_prop1": "",
                "order_allocated_qty": 0,
                "lot_prop2": "",
                "order_finished_qty": 0,
                "lot_prop3": "",
                "order_status": "0",
                "created_time": "2023-02-12T20:49:40",
                "order_detail_id": 4,
                "production_date": "",
                "last_updated_time": "2023-02-12T20:49:40",
                "line_no": 1,
                "supplier_code": "string",
                "created_operator": "",
                "order_code": "S2023021200001",
                "storage_date": "",
                "last_updated_operator": "",
                "lot_props": {
                    "production_date": "",
                    "supplier_code": "string",
                    "storage_date": "",
                    "expiry_date": "",
                    "lot_prop1": "",
                    "lot_prop2": "",
                    "lot_prop3": ""
                }
            }
        ]
    },
    {
        "external_order_code": "S2023021200002",
        "related_code1": "",
        "order_time": "2023-02-12T20:49:43",
        "order_qty": 120,
        "order_finished_qty": 0,
        "receiver_name": "",
        "receiver_contact_tel": "",
        "last_updated_time": "2023-02-12T20:49:43",
        "last_updated_operator": "",
        "order_code": "S2023021200002",
        "related_code2": "",
        "order_type_code": "OUT",
        "order_allocated_qty": 0,
        "order_status": "0",
        "receiver_contact_name": "",
        "created_time": "2023-02-12T20:49:43",
        "created_operator": "",
        "created_from": "1",
        "order_details": [
            {
                "item_code": "I001",
                "expiry_date": "",
                "order_qty": 120,
                "lot_prop1": "",
                "order_allocated_qty": 0,
                "lot_prop2": "",
                "order_finished_qty": 0,
                "lot_prop3": "",
                "order_status": "0",
                "created_time": "2023-02-12T20:49:43",
                "order_detail_id": 5,
                "production_date": "",
                "last_updated_time": "2023-02-12T20:49:43",
                "line_no": 1,
                "supplier_code": "string",
                "created_operator": "",
                "order_code": "S2023021200002",
                "storage_date": "",
                "last_updated_operator": "",
                "lot_props": {
                    "production_date": "",
                    "supplier_code": "string",
                    "storage_date": "",
                    "expiry_date": "",
                    "lot_prop1": "",
                    "lot_prop2": "",
                    "lot_prop3": ""
                }
            }
        ]
    },
    {
        "external_order_code": "S2023021200003",
        "related_code1": "",
        "order_time": "2023-02-12T20:49:45",
        "order_qty": 150,
        "order_finished_qty": 0,
        "receiver_name": "",
        "receiver_contact_tel": "",
        "last_updated_time": "2023-02-12T20:49:45",
        "last_updated_operator": "",
        "order_code": "S2023021200003",
        "related_code2": "",
        "order_type_code": "OUT",
        "order_allocated_qty": 0,
        "order_status": "0",
        "receiver_contact_name": "",
        "created_time": "2023-02-12T20:49:45",
        "created_operator": "",
        "created_from": "1",
        "order_details": [
            {
                "item_code": "I001",
                "expiry_date": "",
                "order_qty": 150,
                "lot_prop1": "",
                "order_allocated_qty": 0,
                "lot_prop2": "",
                "order_finished_qty": 0,
                "lot_prop3": "",
                "order_status": "0",
                "created_time": "2023-02-12T20:49:45",
                "order_detail_id": 6,
                "production_date": "",
                "last_updated_time": "2023-02-12T20:49:45",
                "line_no": 1,
                "supplier_code": "string",
                "created_operator": "",
                "order_code": "S2023021200003",
                "storage_date": "",
                "last_updated_operator": "",
                "lot_props": {
                    "production_date": "",
                    "supplier_code": "string",
                    "storage_date": "",
                    "expiry_date": "",
                    "lot_prop1": "",
                    "lot_prop2": "",
                    "lot_prop3": ""
                }
            }
        ]
    }
];

export default class HCOrderOutbound extends Component {
    render(): ReactNode {
        return <div style={{ width: window.innerWidth - 40 }}>
            <Table columns={outbound_order_headers} dataSource={outbound_order_list} pagination={{ pageSize: 2 }} scroll={{ x: "800px", y: 300, scrollToFirstRowOnChange: true }} />
        </div>;
    }
}