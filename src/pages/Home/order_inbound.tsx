import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Component, ReactNode } from "react";



interface IHCInboundOrderDetailLotProps {
    production_date: string
    supplier_code: string
    storage_date: string
    expiry_date: string
    lot_prop1: string
    lot_prop2: string
    lot_prop3: string
}

interface IHCInboundOrderDetail {
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
    lot_props: IHCInboundOrderDetailLotProps
}

interface IHCInboundOrder {
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
    last_updated_time: string
    last_updated_operator: string
    order_details: IHCInboundOrderDetail[]
}

const inbound_order_headers: ColumnsType<IHCInboundOrder> = [
    {
        key: 'order_code',
        title: '订单编号',
        dataIndex: 'order_code',
        width: "150px",
        fixed: true,
        sorter: (a, b) => a.order_code.localeCompare(b.order_code, "en"),
    },
    {
        key: 'external_order_code',
        title: '外部编号',
        dataIndex: 'external_order_code',
        width: "150px",
        sorter: (a, b) => a.external_order_code.localeCompare(b.external_order_code, "en"),
    },
    {
        key: 'related_code1',
        title: '关联编号1',
        dataIndex: 'related_code1',
        width: "120px",
        sorter: (a, b) => a.related_code1.localeCompare(b.related_code1, "en"),
    },
    {
        key: 'related_code2',
        title: '关联编号2',
        width: "120px",
        dataIndex: 'related_code2',
    },
    {
        key: 'order_time',
        title: '订单时间',
        dataIndex: 'order_time',
        width: "180px",
        sorter: (a, b) => Date.parse(a.order_time.toString()) - Date.parse(b.order_time.toString()),
    },
    {
        key: 'order_status',
        title: '状态',
        dataIndex: 'order_status',
        width: "60px",
    },
    {
        key: 'order_allocated_qty',
        title: '分配数量',
        dataIndex: 'order_allocated_qty',
        width: "60px",
    },
    {
        key: 'created_time',
        title: '创建时间',
        dataIndex: 'created_time',
        width: "180px",
        sorter: (a, b) => a.created_time.localeCompare(b.created_time, "en"),
    },
    {
        key: 'created_operator',
        title: '创建人员',
        dataIndex: 'created_operator',
        width: "60px",
    },
    {
        key: 'created_from',
        title: '创建源',
        dataIndex: 'created_from',
        width: "60px",
    },
    {
        key: 'order_type_code',
        title: '订单类型',
        dataIndex: 'order_type_code',
        width: "60px",
    },
    {
        key: 'order_qty',
        title: '订单数量',
        dataIndex: 'order_qty',
        width: "60px",
    },
    {
        key: 'order_finished_qty',
        title: '完成数量',
        dataIndex: 'order_finished_qty',
        width: "60px",
    },
    {
        key: 'last_updated_time',
        title: '最近操作时间',
        dataIndex: 'last_updated_time',
        width: "180px",
    },
    {
        key: 'last_updated_operator',
        title: '最近操作人',
        dataIndex: 'last_updated_operator',
        width: "60px",
    },
];

const inbound_order_list: IHCInboundOrder[] = [
    {
        "external_order_code": "R2023021100001",
        "related_code1": "",
        "order_time": "2023-02-11T23:38:35",
        "order_status": "0",
        "order_allocated_qty": 0,
        "created_time": "2023-02-11T23:38:35",
        "created_operator": "",
        "created_from": "1",
        "related_code2": "",
        "order_code": "R2023021100001",
        "order_type_code": "IN",
        "order_qty": 100,
        "order_finished_qty": 0,
        "last_updated_time": "2023-02-11T23:38:35",
        "last_updated_operator": "",
        "order_details": [
            {
                "order_qty": 100,
                "expiry_date": "",
                "order_allocated_qty": 0,
                "lot_prop1": "",
                "order_finished_qty": 0,
                "lot_prop2": "",
                "order_status": "0",
                "lot_prop3": "",
                "order_detail_id": 1,
                "production_date": "",
                "created_time": "2023-02-11T23:38:35",
                "order_code": "R2023021100001",
                "supplier_code": "inbound",
                "last_updated_time": "2023-02-11T23:38:35",
                "line_no": 1,
                "storage_date": "",
                "created_operator": "",
                "item_code": "I001",
                "last_updated_operator": "",
                "lot_props": {
                    "production_date": "",
                    "supplier_code": "inbound",
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
        "external_order_code": "R2023021100002",
        "related_code1": "",
        "order_time": "2023-02-11T23:39:16",
        "order_status": "0",
        "order_allocated_qty": 0,
        "created_time": "2023-02-11T23:39:16",
        "created_operator": "",
        "created_from": "1",
        "related_code2": "",
        "order_code": "R2023021100002",
        "order_type_code": "IN",
        "order_qty": 120,
        "order_finished_qty": 0,
        "last_updated_time": "2023-02-11T23:39:16",
        "last_updated_operator": "",
        "order_details": [
            {
                "order_qty": 120,
                "expiry_date": "",
                "order_allocated_qty": 0,
                "lot_prop1": "",
                "order_finished_qty": 0,
                "lot_prop2": "",
                "order_status": "0",
                "lot_prop3": "",
                "order_detail_id": 2,
                "production_date": "",
                "created_time": "2023-02-11T23:39:16",
                "order_code": "R2023021100002",
                "supplier_code": "inbound",
                "last_updated_time": "2023-02-11T23:39:16",
                "line_no": 1,
                "storage_date": "",
                "created_operator": "",
                "item_code": "I001",
                "last_updated_operator": "",
                "lot_props": {
                    "production_date": "",
                    "supplier_code": "inbound",
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
        "external_order_code": "R2023021100003",
        "related_code1": "",
        "order_time": "2023-02-11T23:39:21",
        "order_status": "0",
        "order_allocated_qty": 0,
        "created_time": "2023-02-11T23:39:21",
        "created_operator": "",
        "created_from": "1",
        "related_code2": "",
        "order_code": "R2023021100003",
        "order_type_code": "IN",
        "order_qty": 150,
        "order_finished_qty": 0,
        "last_updated_time": "2023-02-11T23:39:21",
        "last_updated_operator": "",
        "order_details": [
            {
                "order_qty": 150,
                "expiry_date": "",
                "order_allocated_qty": 0,
                "lot_prop1": "",
                "order_finished_qty": 0,
                "lot_prop2": "",
                "order_status": "0",
                "lot_prop3": "",
                "order_detail_id": 3,
                "production_date": "",
                "created_time": "2023-02-11T23:39:21",
                "order_code": "R2023021100003",
                "supplier_code": "inbound",
                "last_updated_time": "2023-02-11T23:39:21",
                "line_no": 1,
                "storage_date": "",
                "created_operator": "",
                "item_code": "I001",
                "last_updated_operator": "",
                "lot_props": {
                    "production_date": "",
                    "supplier_code": "inbound",
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

export default class HCInboundOrder extends Component {
    render(): ReactNode {
        return <div style={{ width: window.innerWidth - 40 }}>
            <Table columns={inbound_order_headers} dataSource={inbound_order_list} pagination={{ pageSize: 3 }} scroll={{ x: 1250, y: 220, scrollToFirstRowOnChange: true }} />

            {/* return <div> */}
            {/* return <div style={{ width: "90em", margin: "0.5em" }}> */}
            {/* <Table columns={inbound_order_headers} dataSource={inbound_order_list} pagination={{ pageSize: 3 }} scroll={{ x: 500, y: 220, scrollToFirstRowOnChange: true }} /> */}
        </div>;
    }

}