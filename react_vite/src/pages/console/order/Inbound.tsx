import { useEffect, useState } from "react";
import { Button, Cascader, Row, Select, Table, message } from "antd";

import api from "src/utils/api";
import utils from "src/utils/Index";
import InboundDetail from "./InboundDetail";
import { IHCInboundOrder } from "src/interfaces/interface";
import { DefaultOptionType } from "antd/es/select";
import { OrderStatus, OrderTypes } from "src/types/enum";
import { DEFAULT_PAGE_NO, DEFAULT_PAGE_SIZE } from "src/types/Constants";
import './index.css';

export default function OrderInbound() {
    const [timestamp, setTimestamp] = useState<number>(0)
    const [orderList, setOrderList] = useState<IHCInboundOrder[]>([])
    const [total, setTotal] = useState<number>(0)
    const [pageSize, setPageSize] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [itemCode, setItemCode] = useState<string>(new URLSearchParams(window.location.search).get("itemCode") || "")
    const [itemOptions, setItemOptions] = useState<DefaultOptionType[]>([]);
    const [supplierCode, setSupplierCode] = useState<string>(new URLSearchParams(window.location.search).get("supplierCode") || "")
    const [supplierOptions, setSupplierOptions] = useState<DefaultOptionType[]>([]);
    const [orderStatus, setOrderStatusList] = useState<OrderStatus[]>([])
    const orderStatusOptions = [
        { label: "已创建", value: OrderStatus.CREATED },
        { label: "已激活", value: OrderStatus.ACTIVATED },
        { label: "已暂停", value: OrderStatus.PAUSED },
        { label: "工作中", value: OrderStatus.WORKING },
        { label: "已完成", value: OrderStatus.DONE },
        { label: "已关闭", value: OrderStatus.CLOSED },
        { label: "已忽略", value: OrderStatus.IGNORED },
        { label: "已删除", value: OrderStatus.DELETED },
    ];

    useEffect(() => {
        getOrderList();
    }, [currentPage, pageSize, timestamp]);

    async function getOrderList() {
        const result = await api.OrderInboundFind(itemCode, supplierCode, orderStatus, currentPage || DEFAULT_PAGE_NO, pageSize || DEFAULT_PAGE_SIZE);
        if (!result || result.result_code !== 0) {
            message.error(`获取订单列表失败！error_msg: ${result.result_msg}`);
            return;
        }

        setTotal(result.data.total_count);
        setOrderList(result.data.data_list.sort((a, b) => { return a.order_code < b.order_code ? -1 : 1 }));

        if (result.data.page_size !== pageSize) { setPageSize(result.data.page_size); }
        if (result.data.page_no !== currentPage) { setCurrentPage(result.data.page_no); }
    }

    const handlePaginationChange = (page: number, pageSize?: number) => {
        setCurrentPage(page);
        if (pageSize) {
            setPageSize(pageSize);
        }
    };

    async function onItemOptionSearch(item_code: string) {
        if (!item_code) {
            setItemOptions([]);
            return;
        }

        const get_items_result = await api.ItemListGet(item_code);
        if (get_items_result.result_code !== 0) {
            message.error(`搜索物品失败！err_msg: ${get_items_result.result_msg}`);
            return;
        }

        const item_options: DefaultOptionType[] = [];
        for (const item of get_items_result.data.data_list) {
            const item_label = `[${item.item_code}]-[${item.item_extend_code1}]-[${item.item_name}]`;
            item_options.push({
                label: item_label,
                value: item.item_code
            });
        }

        setItemOptions(item_options);
    }

    async function onSupplierOptionSearch(supplier_code: string) {
        if (!supplier_code) {
            setSupplierOptions([]);
            return;
        }

        const get_suppliers_result = await api.SupplierListGet(supplier_code);
        if (get_suppliers_result.result_code !== 0) {
            message.error(`搜索供应商失败！err_msg: ${get_suppliers_result.result_msg}`);
            return;
        }

        const supplier_options: DefaultOptionType[] = [];
        for (const supplier of get_suppliers_result.data.data_list) {
            const supplier_label = `[${supplier.supplier_code}]-[${supplier.supplier_name}]`;
            supplier_options.push({
                label: supplier_label,
                value: supplier.supplier_code
            });
        }

        setSupplierOptions(supplier_options);
    }

    function expandedRowRender(record: IHCInboundOrder) {
        return <InboundDetail orderDetailList={record.order_details} />
    }

    return <>
        <div style={{ marginBottom: 10, marginLeft: 10 }}>
            <Row style={{ marginTop: '10px', lineHeight: "40px" }}>
                <label>物品编号：</label>
                <Cascader
                    className="search_text"
                    options={itemOptions}
                    placeholder="请输入物品码/物品名称/物品别名（必填）"
                    showSearch={{ filter: utils.onOptionFilter }}
                    onChange={value => { const _item_code = value ? value[0] : ""; setItemCode(_item_code as string); }}
                    onSearch={onItemOptionSearch}
                />
                <label style={{ marginLeft: "30px" }}>供应商码：</label>
                <Cascader
                    className="search_text"
                    options={supplierOptions}
                    placeholder="请输入供应商码、供应商名称（选填）"
                    showSearch={{ filter: utils.onOptionFilter }}
                    onChange={value => { const _supplier_code = value ? value[0] : ""; setSupplierCode(_supplier_code as string); }}
                    onSearch={onSupplierOptionSearch}
                />
            </Row>
            <Row style={{ marginTop: '10px', lineHeight: '40px' }}>
                <label>订单状态：</label>
                <Select
                    mode="multiple"
                    style={{ width: 400, marginRight: 16 }}
                    placeholder="请选择订单状态"
                    options={orderStatusOptions}
                    value={orderStatus}
                    onChange={(value) => { setOrderStatusList(value) }}
                />
                <Button onClick={() => { setTimestamp(Date.now()); }} style={{ width: "200px", background: "#ea6", marginLeft: '15px' }}>搜索</Button>
            </Row >
        </div >
        <div style={{ width: '85vw', height: '90vh' }}>
            <Table<IHCInboundOrder>
                sticky
                className="virtual-table"
                scroll={{ x: '100%', y: '100%' }}
                bordered
                expandable={{ expandedRowRender }}
                dataSource={orderList}
                rowKey={(record) => record.order_code}
                pagination={{
                    total,
                    pageSize,
                    current: currentPage,
                    onChange: handlePaginationChange,
                    showTotal: (total, range) => `共 ${total} 条记录`,
                    style: { float: 'left' },
                }}
                columns={[
                    // { title: 'key', dataIndex: 'key', key: 'key', },
                    { title: '订单编号', dataIndex: 'order_code', key: 'order_code', width: '120px', fixed: 'left', },
                    {
                        title: '订单类型', dataIndex: 'order_type_code', key: 'order_type_code', width: '120px', render: (value, record, index) => {
                            return Object.keys(OrderTypes)[Object.values(OrderTypes).indexOf(value)] || "入库单";
                        }
                    },
                    {
                        title: '订单状态', dataIndex: 'order_status', key: 'order_status', width: '120px', render: (value, record, index) => {
                            return Object.keys(OrderStatus)[Object.values(OrderStatus).indexOf(value)]
                        }
                    },
                    { title: '扩展编号', dataIndex: 'external_order_code', key: 'external_order_code', width: '120px', },
                    // { title: '仓库码', dataIndex: 'warehouse_code', key: 'warehouse_code', width: '120px', },
                    { title: '入库总数', dataIndex: 'order_qty', key: 'order_qty', width: '120px', },
                    { title: '已分配数量', dataIndex: 'order_allocated_qty', key: 'order_allocated_qty', width: '120px', },
                    { title: '已完成数量', dataIndex: 'order_finished_qty', key: 'order_finished_qty', width: '120px', },
                    { title: '订单时间', dataIndex: 'order_time', key: 'order_time', width: '120px', },
                    // { title: '关联编号1', dataIndex: 'related_code1', key: 'related_code1', width: '120px', },
                    // { title: '关联编号2', dataIndex: 'related_code2', key: 'related_code2', width: '120px', },
                    // { title: '创建来源', dataIndex: 'created_from', key: 'created_from', width: '120px', },
                    // { title: '创建时间', dataIndex: 'created_time', key: 'created_time', width: '120px', },
                    // { title: '创建人员', dataIndex: 'created_operator', key: 'created_operator', width: '120px', },
                    // { title: '更新时间', dataIndex: 'last_updated_time', key: 'last_updated_time', width: '120px', },
                    // { title: '更新人员', dataIndex: 'last_updated_operator', key: 'last_updated_operator', width: '120px', },
                    // {
                    //     title: '操作', dataIndex: 'oper', key: 'oper', width: '120px', fixed: 'right', render: (value, record, index) => {
                    //         return <>
                    //             {/* <Button onClick={(e) => { handleModify(value, record, index) }}>修改</Button> */}
                    //             {/* <Button onClick={(e) => { handleViewInventoryBox(value, record, index) }} style={{ marginTop: 5 }}>查看料箱库存</Button> */}
                    //         </>
                    //     }
                    // },
                ]}
            />
        </div>
    </>
}