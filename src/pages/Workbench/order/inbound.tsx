import React from "react";
import Cascader, { DefaultOptionType } from "antd/es/cascader";
import { Button, Table, TableColumnType, message } from "antd";

import hc_config from "../../../config/index.json";
import order_list from '../../../mocks/inbound_order.20230321.mock';
import { IHCInboundOrder, IHCInboundOrderDetail } from "../../../types/interface";
import "../index.css";


interface HCTableProps {
    title?: string;
    rowKey?: string;
    maxLength?: number;
    columns?: TableColumnType<any>[];
    child_columns?: TableColumnType<any>[];
    dataSource?: IHCInboundOrder[];
}

interface HCTableState {
    title: string;
    rowKey: string;
    maxLength: number;
    item_options: DefaultOptionType[];
    supplier_options: DefaultOptionType[];
    columns: TableColumnType<any>[];
    dataSource: IHCInboundOrder[];
    child_columns: TableColumnType<any>[];
    item_code: string
    supplier_code: string
}

export default class HCOrderInbound extends React.Component<HCTableProps, HCTableState>{
    constructor(props: HCTableProps) {
        super(props)

        this.state = {
            title: this.props.title || "入库单",
            rowKey: this.props.rowKey || "order_code",
            maxLength: this.props.maxLength || 20,
            item_code: "",
            supplier_code: "",
            item_options: [
                {
                    label: "I001-物品1",
                    value: "I001",
                },
                {
                    label: "I002-物品2",
                    value: "I002",
                },
                {
                    label: "I003-物品3",
                    value: "I003",
                }
            ],
            supplier_options: [
                {
                    label: "S001-供应商1",
                    value: "S001",
                },
                {
                    label: "S002-供应商2",
                    value: "S002",
                },
                {
                    label: "S003-供应商3",
                    value: "S003",
                }
            ],
            columns: [
                { title: '序号', dataIndex: 'key', key: 'key', align: 'center', width: "70px", fixed: 'left' },
                // { title: 'WMS单号', dataIndex: 'order_code', key: 'order_code', align: 'center', width: "150px", fixed: 'left' },
                { title: '订单号', dataIndex: 'external_order_code', key: 'external_order_code', align: 'center', width: "150px", fixed: 'left' },
                { title: '关联单号1', dataIndex: 'related_code1', key: 'related_code1', align: 'center', width: "150px", },
                // { title: '关联单号2', dataIndex: 'related_code2', key: 'related_code2', align: 'center', width: "150px", },
                { title: '订单状态', dataIndex: 'order_status', key: 'order_status', align: 'center', width: "130px", },
                { title: '订单类型', dataIndex: 'order_type_code', key: 'order_type_code', align: 'center', width: "130px", },
                { title: '订单数量', dataIndex: 'order_qty', key: 'order_qty', align: 'center', width: "130px", },
                { title: '已完成数量', dataIndex: 'order_finished_qty', key: 'order_finished_qty', align: 'center', width: "130px", },
                { title: '已分配数量', dataIndex: 'order_allocated_qty', key: 'order_allocated_qty', align: 'center', width: "130px", },
                { title: '本次分配数量', dataIndex: 'order_cur_allocate_qty', key: 'order_cur_allocate_qty', align: 'center', width: "130px", },
                { title: '订单时间', dataIndex: 'order_time', key: 'order_time', align: 'center', width: "130px", },
                { title: '创建时间', dataIndex: 'created_time', key: 'created_time', align: 'center', width: "130px", },
                { title: '创建来源', dataIndex: 'created_from', key: 'created_from', align: 'center', width: "130px", },
                // { title: '创建人', dataIndex: 'created_operator', key: 'created_operator', align: 'center', width: "130px", },
                { title: '最近操作时间', dataIndex: 'last_updated_time', key: 'last_updated_time', align: 'center', width: "130px", },
                // { title: '最近操作人', dataIndex: 'last_updated_operator', key: 'last_updated_operator', align: 'center', width: "130px", },
                {
                    title: '操作', key: 'operation', align: 'center', width: "100px", fixed: 'right', render: (value: any, record: IHCInboundOrder, index: number) =>
                        <Button type="primary" onClick={this.onBtnOrderCloseClick.bind(this, record)}>关闭</Button>
                },
            ],
            child_columns: [
                { title: '序号', dataIndex: 'key', key: 'key', align: 'center', width: '70px', fixed: 'left' },
                { title: '行号', dataIndex: 'line_no', key: 'line_no', align: 'center', width: '100px', fixed: 'left' },
                // { title: 'WMS单号', dataIndex: 'order_code', key: 'order_code', align: 'center', width: '130px' },
                // { title: '订单状态', dataIndex: 'order_status', key: 'order_status', align: 'center', width: '130px' },
                { title: '物品编码', dataIndex: 'item_code', key: 'item_code', align: 'center', width: '130px' },
                { title: '供应商', dataIndex: 'supplier_code', key: 'supplier_code', align: 'center', width: '130px' },
                { title: '订单数量', dataIndex: 'order_qty', key: 'order_qty', align: 'center', width: '130px' },
                { title: '已完成数量', dataIndex: 'order_finished_qty', key: 'order_finished_qty', align: 'center', width: '130px' },
                { title: '已分配数量', dataIndex: 'order_allocated_qty', key: 'order_allocated_qty', align: 'center', width: '130px' },
                // { title: '创建时间', dataIndex: 'created_time', key: 'created_time', align: 'center', width: '130px' },
                // { title: '创建人', dataIndex: 'created_operator', key: 'created_operator', align: 'center', width: '130px' },
                { title: '更新时间', dataIndex: 'last_updated_time', key: 'last_updated_time', align: 'center', width: '130px' },
                // { title: '操作人', dataIndex: 'last_updated_operator', key: 'last_updated_operator', align: 'center', width: '130px' },
                // { title: '产品日期', dataIndex: 'production_date', key: 'production_date', align: 'center', width: '130px' },
                // { title: '存储日期', dataIndex: 'storage_date', key: 'storage_date', align: 'center', width: '130px' },
                // { title: '截止日期', dataIndex: 'expiry_date', key: 'expiry_date', align: 'center', width: '130px' },
                {
                    title: '操作', key: 'operation', align: 'center', width: '100px', fixed: 'right', render: (value: any, record: IHCInboundOrderDetail, index: number) =>
                        <Button type="default" onClick={this.onBtnOrderDetailCloseClick.bind(this, record)}>关闭</Button>
                },
            ],
            dataSource: []
        };
    }

    render(): React.ReactNode {
        return <div>
            <Button type="primary" style={{ margin: "10px" }} onClick={() => { window.location.href = "/workbench/order" }}>返回主页</Button>
            <h1>{this.state.title}</h1>
            <div className="hc_panel">
                <div className="search_box">
                    <label>物品编码：</label>
                    <Cascader
                        className="search_text"
                        options={this.state.item_options}
                        placeholder="请输入物品码/物品名称/物品别名"
                        showSearch={{ filter: this.onOptionFilter.bind(this) }}
                        onChange={this.onItemOptionChange.bind(this)}
                        onSearch={this.onItemOptionSearch.bind(this)}
                    />
                    <label style={{ marginLeft: "30px" }}>供应商编码：</label>
                    <Cascader
                        className="search_text"
                        options={this.state.supplier_options}
                        placeholder="请输入供应商码、供应商名称"
                        showSearch={{ filter: this.onOptionFilter.bind(this) }}
                        onChange={this.onSupplierOptionChange.bind(this)}
                        onSearch={this.onSupplierOptionSearch.bind(this)}
                    />
                    <Button type="primary" onClick={this.queryOrderList.bind(this)} style={{ marginLeft: "30px" }}>查询订单</Button>
                    <Button type="primary" onClick={this.confirmInboundOrders.bind(this)} style={{ marginLeft: "30px" }}>确认入库</Button>
                </div>
            </div>
            <div>
                <Table
                    className="hc_panel virtual-table"
                    columns={this.state.columns}
                    expandable={{ expandedRowRender: this.expandedRowRender.bind(this) }}
                    dataSource={this.state.dataSource}
                    scroll={{ x: 960, y: 600 }}
                />
            </div>
        </div>;
    }

    componentDidMount(): void {
        this.setState({ dataSource: order_list })
    }

    expandedRowRender(record: IHCInboundOrder, index: any, indent: any, expanded: any): React.ReactNode {
        return <Table
            columns={this.state.child_columns}
            dataSource={record.order_details || []}
            pagination={false}
            scroll={{ x: 960 }}
        />;
    }

    onOptionFilter(inputValue: string, path: DefaultOptionType[]): boolean {
        return path.some((option) => (option.label as string).toLowerCase().indexOf(inputValue.toLowerCase()) > -1,);
    }

    onItemOptionChange(item_codes: any) {
        this.setState({ item_code: item_codes[0] });
    }

    onItemOptionSearch(item_code: string) {
        if (!item_code) { return; }

        message.info(`search item. ${item_code}`);

        if (hc_config.debug.enable) {
            this.onItemOptionSearchTest(item_code);
            return;
        }
    }

    onItemOptionSearchTest(item_code: string) {
        const item_options: DefaultOptionType[] = [];
        for (let i = 1; i <= Math.floor(Math.random() * 10 + 1); i++) {
            message.warning(i);
            item_options.push({
                label: `Item${i}-物品${i}`,
                value: `Item${i}`
            });
        }

        this.setState({ item_options });
    }

    onSupplierOptionChange(supplier_codes: any) {
        this.setState({ supplier_code: supplier_codes[0] });
    }

    onSupplierOptionSearch(supplier_code: string) {
        if (!supplier_code) { return; }

        message.info(`search supplier_code. ${supplier_code}`);

        if (hc_config.debug.enable) {
            this.onSupplierOptionSearchTest(supplier_code);
            return;
        }
    }

    onSupplierOptionSearchTest(supplier_code: string) {
        const supplier_options: DefaultOptionType[] = [];
        for (let i = 1; i <= Math.floor(Math.random() * 10 + 1); i++) {
            message.warning(i);
            supplier_options.push({
                label: `Supplier${i}-供应商${i}号`,
                value: `Supplier${i}`,
            });
        }

        this.setState({ supplier_options });
    }


    queryOrderList() {
        message.info(`query inbound orders.`);
    }

    confirmInboundOrders() {
        message.info(`confirm inbound orders.`);
    }

    onBtnOrderCloseClick(order: IHCInboundOrder) {
        message.info(`closing order. ${order.order_code}`);
    }

    onBtnOrderDetailCloseClick(order_detail: IHCInboundOrderDetail) {
        message.info(`closing order detail. ${order_detail.line_no}`);
    }



}   