import { ColumnsType } from 'antd/es/table';
import { SearchOutlined } from '@ant-design/icons';
import { Component, ReactNode } from "react";
import { Button, Input, Select, SelectProps, Table, message } from 'antd';

import utils from '../../../utils';
import { IHCOutboundOrder } from '../../../types/interface';
import { HttpResponse } from '../../../types/http_response.interface';
import api from '../../../utils/api';




export default class HCOutboundOrder extends Component {
    state: { item_code: string, supplier_code: string, order_states: number[], order_list: IHCOutboundOrder[] } = { item_code: "", supplier_code: "", order_states: [], order_list: [] };

    render(): ReactNode {
        const options: SelectProps['options'] = [
            { label: "已创建", value: 0 },
            { label: "已激活", value: 1 },
            { label: "已暂停", value: 2 },
            { label: "进行中", value: 3 },
            { label: "已完成", value: 4 },
            { label: "异常", value: 5 },
        ];

        return <div>
            <Input type='search' placeholder='请输入物料编码/名称/规格' onChange={this.onTxtItemCodeChange.bind(this)} className='search_input' />
            <Input type='search' placeholder='请输入物料批次号/供应商名称' onChange={this.onTxtSupplierCodeChange.bind(this)} className='search_input' />
            <Select
                mode="multiple"
                allowClear
                style={{ width: '30%' }}
                placeholder="请选择订单状态(可多选)"
                defaultValue={[]}
                onChange={this.onArrOrderStatesChange.bind(this)}
                options={options}
                className='search_input'
            />
            <Button type='primary' icon={<SearchOutlined />} onClick={this.onBtnSearchClick.bind(this)} className='search_button'>搜索出库单</Button>
            <Table columns={outbound_order_headers} dataSource={this.state.order_list} pagination={{ pageSize: 10 }} scroll={{ x: 1250, y: 200, scrollToFirstRowOnChange: true }} className='table' />
        </div>
    }

    onTxtItemCodeChange(event: { target: { value: any; }; }) {
        this.setState({ item_code: event.target.value });
    }

    onTxtSupplierCodeChange(event: { target: { value: any; }; }) {
        this.setState({ supplier_code: event.target.value });
    }

    onArrOrderStatesChange(value: number[]) {
        this.setState({ order_states: value });
    }

    async onBtnSearchClick() {
        const result: HttpResponse = await api.GetOutboundOrders(this.state.item_code, this.state.supplier_code, this.state.order_states);
        if (!result || result.result_code != 0) {
            message.error(`查询失败，${result.result_msg}。`)
            return;
        }

        // 订单对象没有key这个字段，ts会报错，所以要给个key字段
        result.data.map((val: IHCOutboundOrder) => {
            val.key = val.order_code
        });
        this.setState({ order_list: result.data });
        message.success(`查询成功，共找到 ${result.data.length} 个出库单。`)
    }
}


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
        render: utils.FormatTime
    },
    {
        key: 'created_time',
        title: '创建时间',
        dataIndex: 'created_time',
        width: "180px",
        sorter: (a, b) => Date.parse(a.order_time.toString()) - Date.parse(b.order_time.toString()),
        render: utils.FormatTime
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
