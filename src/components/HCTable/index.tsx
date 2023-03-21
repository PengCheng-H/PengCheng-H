import React from "react";
import { EditableProTable, ProColumns } from '@ant-design/pro-components';


declare type DataSourceType = {

};

interface HCTableProps {
    columns?: ProColumns<any>[];
    dataSource?: any[];
    maxLength?: number;
    title?: string;
    rowKey?: string;
}

type HCTableState = {
    columns: ProColumns<any>[];
    dataSource: any[];
    maxLength: number;
    title: string;
    rowKey: string;
}

export default class HCTable extends React.Component<HCTableProps, HCTableState>{
    constructor(props: HCTableProps) {
        super(props)
        this.state = {
            columns: this.props.columns || [
                {
                    key: 'order_code',
                    title: 'WMS订单号',
                    dataIndex: 'order_code',
                    // width: "160px",
                    fixed: 'left',
                    align: "center",
                    sorter: (a, b) => a.order_code.localeCompare(b.order_code, "en"),
                },
                {
                    key: 'external_order_code',
                    title: 'ERP订单号',
                    dataIndex: 'external_order_code',
                    // width: "160px",
                    align: "center",
                    sorter: (a, b) => a.external_order_code.localeCompare(b.external_order_code, "en"),
                },
                {
                    key: 'related_code1',
                    title: '关联编号1',
                    dataIndex: 'related_code1',
                    // width: "160px",
                    align: "center",
                    sorter: (a, b) => a.related_code1.localeCompare(b.related_code1, "en"),
                },
                {
                    key: 'related_code2',
                    title: '关联编号2',
                    // width: "120px",
                    dataIndex: 'related_code2',
                },
                {
                    key: 'order_type_code',
                    title: '订单类型',
                    dataIndex: 'order_type_code',
                    // width: "60px",
                },
                {
                    key: 'order_status',
                    title: '状态',
                    dataIndex: 'order_status',
                    // width: "110px",
                    align: "center",
                    sorter: (a, b) => a.order_status.localeCompare(b.order_status, "en"),
                    // render: (value: string) => { return em_order_status[`${value}`]; }
                },
                {
                    key: 'created_operator',
                    title: '创建人员',
                    dataIndex: 'created_operator',
                    // width: "60px",
                },
                {
                    key: 'order_qty',
                    title: '订单数量',
                    dataIndex: 'order_qty',
                    // width: "120px",
                    align: "center",
                    sorter: (a, b) => a.order_qty - b.order_qty,
                    render: value => { return <span style={{ color: '#3284cd', fontSize: '18px', fontWeight: 'bold' }}>{Number(value)}</span>; }
                },
                {
                    key: 'order_allocated_qty',
                    title: '已分配数量',
                    dataIndex: 'order_allocated_qty',
                    // width: "120px",
                    align: "center",
                    sorter: (a, b) => a.order_allocated_qty - b.order_allocated_qty,
                    render: value => { return <span style={{ color: '#3284cd', fontSize: '18px', fontWeight: 'bold' }}>{Number(value)}</span>; }
                },
                {
                    key: 'order_finished_qty',
                    title: '已入库数量',
                    dataIndex: 'order_finished_qty',
                    // width: "120px",
                    align: "center",
                    sorter: (a, b) => a.order_finished_qty - b.order_finished_qty,
                    render: value => { return <span style={{ color: '#3284cd', fontSize: '18px', fontWeight: 'bold' }}>{Number(value)}</span>; }
                },
                {
                    key: 'order_cur_allocate_qty',
                    title: '本次分配数量',
                    dataIndex: 'order_cur_allocate_qty',
                    // width: "150px",
                    align: "center",
                    sorter: (a, b) => a.order_cur_allocate_qty - b.order_cur_allocate_qty,
                    render: value => { value = value || 0; return <span style={{ color: '#f1b334', fontSize: '18px', fontWeight: 'bold' }}>{Number(value)}</span>; },
                },
                {
                    key: 'order_time',
                    title: '订单时间',
                    dataIndex: 'order_time',
                    // width: "180px",
                    align: "center",
                    sorter: (a, b) => Date.parse(a.order_time.toString()) - Date.parse(b.order_time.toString()),
                },
                {
                    key: 'created_time',
                    title: '创建时间',
                    dataIndex: 'created_time',
                    // width: "180px",
                    align: "center",
                    sorter: (a, b) => Date.parse(a.order_time.toString()) - Date.parse(b.order_time.toString()),
                },
                {
                    key: 'created_time',
                    title: '创建时间',
                    dataIndex: 'created_time',
                    align: "center",
                }
            ],
            dataSource: this.props.dataSource || [
                {

                }
            ],
            maxLength: this.props.maxLength || 20,
            title: this.props.title || "",
            rowKey: this.props.rowKey || "id",
        };
    }

    render(): React.ReactNode {
        return <div>
            <EditableProTable
                expandable={{ defaultExpandAllRows: true }}
                rowKey={this.state.rowKey}
                manualRequest={true}
                headerTitle={this.state.title}
                maxLength={this.state.maxLength}
                columns={this.state.columns}
                dataSource={this.state.dataSource}
                recordCreatorProps={{
                    position: 'bottom',
                    newRecordType: 'dataSource',
                    record: () => ({ id: (Math.random() * 10000000).toFixed(0) })
                }}
            />
        </div>;
    }

}