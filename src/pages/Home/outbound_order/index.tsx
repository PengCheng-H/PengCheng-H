import { ColumnsType } from 'antd/es/table';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Table } from 'antd';
import { Component, ReactNode } from "react";

import utils from '../../../utils';
import outbound_order_list from '../../../mocks/outbound_order.mock';
import { IHCOutboundOrder } from '../../../types/interface';



outbound_order_list.map((value, index, arr) => {
    value.key = value.key | index + Date.now();
});

const outbound_order_headers: ColumnsType<IHCOutboundOrder> = [
    {
        key: 'order_code',
        title: 'WMS订单号',
        dataIndex: 'order_code',
        width: "150px",
        fixed: 'left',
        sorter: (a, b) => a.order_code.localeCompare(b.order_code, "en"),
    },
    {
        key: 'external_order_code',
        title: 'ERP订单号',
        dataIndex: 'external_order_code',
        width: "150px",
        sorter: (a, b) => a.external_order_code.localeCompare(b.external_order_code, "en"),
    },
    {
        key: 'related_code1',
        title: '关联编号1',
        dataIndex: 'related_code1',
        width: "150px",
        sorter: (a, b) => a.related_code1.localeCompare(b.related_code1, "en"),
    },
    // {
    //     key: 'related_code2',
    //     title: '关联编号2',
    //     dataIndex: 'related_code2',
    //     width: "120px",
    // },
    // {
    //     key: 'order_type_code',
    //     title: '订单类型',
    //     dataIndex: 'order_type_code',
    //     width: "60px",
    // },
    {
        key: 'order_status',
        title: '状态',
        dataIndex: 'order_status',
        width: "80px",
        sorter: (a, b) => a.order_status.localeCompare(b.order_status, "en"),
    },
    {
        key: 'order_qty',
        title: '订单数量',
        dataIndex: 'order_qty',
        width: "120px",
        sorter: (a, b) => a.order_qty - b.order_qty,
        render: value => { return Number(value); }
    },
    {
        key: 'order_allocated_qty',
        title: '已分配数量',
        dataIndex: 'order_allocated_qty',
        width: "120px",
        sorter: (a, b) => a.order_allocated_qty - b.order_allocated_qty,
        render: value => { return Number(value); }
    },
    {
        key: 'order_finished_qty',
        title: '已出库数量',
        dataIndex: 'order_finished_qty',
        width: "120px",
        sorter: (a, b) => a.order_finished_qty - b.order_finished_qty,
        render: value => { return Number(value); }
    },
    {
        key: 'order_cur_allocate_qty',
        title: '本次分配数量',
        dataIndex: 'order_cur_allocate_qty',
        width: "150px",
        sorter: (a, b) => a.order_cur_allocate_qty - b.order_cur_allocate_qty,
        render: value => { value = value || 0; return Number(value); },
    },
    {
        key: 'order_time',
        title: '订单时间',
        dataIndex: 'order_time',
        width: "180px",
        sorter: (a, b) => Date.parse(a.order_time.toString()) - Date.parse(b.order_time.toString()),
        render: utils.formatTime
    },
    {
        key: 'created_time',
        title: '创建时间',
        dataIndex: 'created_time',
        width: "180px",
        sorter: (a, b) => Date.parse(a.order_time.toString()) - Date.parse(b.order_time.toString()),
        render: utils.formatTime
    },
    // {
    //     key: 'created_operator',
    //     title: '创建人员',
    //     dataIndex: 'created_operator',
    //     width: "60px",
    // },
    // {
    //     key: 'created_from',
    //     title: '创建来源',
    //     dataIndex: 'created_from',
    //     width: "60px",
    // },
    // {
    //     key: 'last_updated_time',
    //     title: '最近操作时间',
    //     dataIndex: 'last_updated_time',
    //     width: "180px",
    //     render: utils.formatTime
    // },
    // {
    //     key: 'last_updated_operator',
    //     title: '最近操作人',
    //     dataIndex: 'last_updated_operator',
    //     width: "60px",
    //     fixed: 'right',
    // },
    {
        key: 'operations',
        title: '操作',
        dataIndex: 'operations',
        width: "120px",
        fixed: 'right',
    },
];

export default class HCOutboundOrder extends Component {
    state: { curSearchText: string } = { curSearchText: "" }

    render(): ReactNode {
        return <div>
            <Input type='search' id='txtSearchOutboundOrder' placeholder='请输入物料编码/名称/规格' className='search_input' />
            <Button id='btnSearchOutboundOrder' type='primary' icon={<SearchOutlined />} className='search_button'>搜索出库单</Button>
            <Table columns={outbound_order_headers} dataSource={outbound_order_list} pagination={{ pageSize: 10 }} scroll={{ x: 1250, y: 200, scrollToFirstRowOnChange: true }} className='table' />;
        </div>
    }

    onInpSearchChange(event: { target: { value: any; }; }) {
        this.setState({ curSearchText: event.target.value });
    }

    onBtnSearchClick() {
        console.log(this.state.curSearchText);
    }
}