import { useEffect, useState } from "react";
import { Button, Cascader, Modal, Popconfirm, Row, Select, Table, message } from "antd";

import api from "src/utils/api";
import utils from "src/utils/Index";
import OutboundDetail from "./OutboundDetail";
import { IHCOutboundOrder, IHCOutboundOrderDetail, IHCOutboundOrderQuickAddItem } from "src/interfaces/interface";
import { DefaultOptionType } from "antd/es/select";
import { OrderStatus, OrderTypes } from "src/types/enum";
import { DEFAULT_PAGE_NO, DEFAULT_PAGE_SIZE } from "src/types/Constants";
import './index.css';
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import OutboundQuickAdd from "./OutboundQuickAdd";

export default function OrderOutbound() {
    const [timestamp, setTimestamp] = useState<number>(0);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [quickAddOutboundItems, setQuickAddOutboundItems] = useState<IHCOutboundOrderQuickAddItem[]>([]);
    const [orderList, setOrderList] = useState<IHCOutboundOrder[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [lastItemCode, setLastItemCode] = useState<string>(new URLSearchParams(window.location.search).get("itemCode") || "");
    const [itemCode, setItemCode] = useState<string>(new URLSearchParams(window.location.search).get("itemCode") || "");
    const [itemOptions, setItemOptions] = useState<DefaultOptionType[]>([]);
    const [supplierCode, setSupplierCode] = useState<string>(new URLSearchParams(window.location.search).get("supplierCode") || "");
    const [lastSupplierCode, setLastSupplierCode] = useState<string>(new URLSearchParams(window.location.search).get("supplierCode") || "");
    const [supplierOptions, setSupplierOptions] = useState<DefaultOptionType[]>([]);
    const [orderStatus, setOrderStatusList] = useState<OrderStatus[]>([OrderStatus.CREATED, OrderStatus.ACTIVATED, OrderStatus.PAUSED, OrderStatus.WORKING]);
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

    const getOrderList = async () => {
        const __current_page_no = itemCode !== lastItemCode || supplierCode !== lastSupplierCode ? 1 : currentPage;
        setLastItemCode(itemCode);
        setLastSupplierCode(supplierCode);

        const result = await api.OrderOutboundFind(itemCode, supplierCode, orderStatus, __current_page_no || DEFAULT_PAGE_NO, pageSize || DEFAULT_PAGE_SIZE);
        if (!result || result.result_code !== 0) {
            message.error(`获取订单列表失败！error_msg: ${result.result_msg}`);
            return;
        }

        setTotal(result.data.total_count);
        setPageSize(result.data.page_size);
        setCurrentPage(result.data.page_no);
        setOrderList(result.data.data_list.sort((a, b) => { return a.order_code < b.order_code ? -1 : 1 }));
    }

    const handlePaginationChange = (page: number, pageSize?: number) => {
        setCurrentPage(page);
        if (pageSize) {
            setPageSize(pageSize);
        }
    };

    const onItemOptionSearch = async (item_code: string) => {
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

    const onSupplierOptionSearch = async (supplier_code: string) => {
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

    const onCreateOrder = async () => {
        if (!quickAddOutboundItems || !quickAddOutboundItems.length) {
            message.error('请添加待出库的物品信息！');
            return;
        }

        const result = await api.OrderOutboundQuickAdd(quickAddOutboundItems);

        if (!result || result.result_code !== 0) {
            message.error(`创建出库单失败！err_msg: ${result.result_msg}。`);
            return;
        }

        message.success(`创建出库单成功. 订单编号: ${result.data.order_code}`);
        setShowModal(false);
        setTimestamp(Date.now());
    }

    const HandleAutoAllocateQty = async (order: IHCOutboundOrder) => {
        if (!orderList || !orderList.length) {
            message.error('未找到订单信息，无法分配！');
            return;
        }

        const _order_details: { order_detail_id: number, allocate_quantity: number }[] = [];

        order.order_details.forEach(_detail => {
            _order_details.push({
                order_detail_id: _detail.order_detail_id,
                allocate_quantity: _detail.order_qty - _detail.order_allocated_qty >= 0 ? _detail.order_qty - _detail.order_allocated_qty : 0
            });
        });

        message.info(`向后台确认分配结果. 订单编码: ${order.order_code}`);
        const allocate_result = await api.OrderOutboundAutoAllocateDetails(order.order_code, _order_details);

        if (allocate_result.result_code !== 0) {
            message.error(`订单分配数量失败！result_code: ${allocate_result.result_code} 提示: ${allocate_result.result_msg}`);
            return
        }

        message.success(`订单分配数量成功。`);
        setTimestamp(Date.now());
    }

    const HandleOrderClose = async (order: IHCOutboundOrder) => {
        message.info(`请求关闭订单. ${order.order_code}`);
        const close_result = await api.OrderOutboundClose(order.order_code);
        if (close_result.result_code !== 0) {
            message.error(`关闭订单失败！订单编码: ${order.order_code} 提示: ${close_result.result_msg}`);
            return
        }

        message.success(`关闭订单成功。订单编码: ${order.order_code}`);
        setTimestamp(Date.now());
    }

    const HandleOrderRemove = (order: IHCOutboundOrder) => {
        const _orders = orderList.filter((_order) => _order.order_code !== order.order_code);
        setOrderList(_orders);
    }

    const HandleOrderDetailRemove = (orderDetail: IHCOutboundOrderDetail) => {
        const new_orders = [...orderList];
        const new_order_index = new_orders.findIndex(item => orderDetail.order_code === item.order_code);
        const new_order = new_orders[new_order_index];
        const new_order_details = new_order.order_details.filter(_detail => _detail.line_no !== orderDetail.line_no);
        new_order.order_details = new_order_details;
        setOrderList(new_orders);
    };

    const HandleOrderDetailClose = async (orderDetail: IHCOutboundOrderDetail) => {
        message.info(`请求关闭订单行. ${orderDetail.line_no}`);
        const close_result = await api.OrderOutboundDetailClose(orderDetail.order_code, orderDetail.order_detail_id);
        if (close_result.result_code !== 0) {
            message.error(`关闭订单行失败！订单编码: ${orderDetail.order_code} 明细编码: ${orderDetail.order_detail_id} 提示: ${close_result.result_msg}`);
            return
        }

        message.success(`关闭订单行成功。订单编码: ${orderDetail.order_code}, 明细编码: ${orderDetail.order_detail_id}`);
        setTimestamp(Date.now());
    }

    const expandedRowRender = (record: IHCOutboundOrder) => {
        return <OutboundDetail orderDetailList={record.order_details} HandleOrderDetailClose={HandleOrderDetailClose} HandleOrderDetailRemove={HandleOrderDetailRemove} />
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
                    onChange={value => { const _item_code = value ? value[0] : ""; setLastItemCode(itemCode); setItemCode(_item_code as string); }}
                    onSearch={onItemOptionSearch}
                />
                <label style={{ marginLeft: "30px" }}>供应商码：</label>
                <Cascader
                    className="search_text"
                    options={supplierOptions}
                    placeholder="请输入供应商码、供应商名称（选填）"
                    showSearch={{ filter: utils.onOptionFilter }}
                    onChange={value => { const _supplier_code = value ? value[0] : ""; setLastSupplierCode(supplierCode); setSupplierCode(_supplier_code as string); }}
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
                <Button type="primary" onClick={() => { setTimestamp(Date.now()); }} style={{ width: "200px", marginLeft: '15px' }}>搜索订单</Button>
                <Button type="primary" shape="round" onClick={() => { setShowModal(true); }} style={{ width: "200px", marginLeft: '15px' }}>创建订单</Button>
            </Row >
        </div >
        <div style={{ width: '85vw', height: '90vh' }}>
            <Table<IHCOutboundOrder>
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
                    { title: '订单编号', dataIndex: 'order_code', key: 'order_code', align: 'center', width: '120px', },
                    {
                        title: '订单类型', dataIndex: 'order_type_code', key: 'order_type_code', align: 'center', width: '120px', render: (value, record, index) => {
                            return Object.keys(OrderTypes)[Object.values(OrderTypes).indexOf(value)] || "出库单";
                        }
                    },
                    {
                        title: '订单状态', dataIndex: 'order_status', key: 'order_status', align: 'center', width: '120px', render: (value, record, index) => {
                            return Object.keys(OrderStatus)[Object.values(OrderStatus).indexOf(value)]
                        }
                    },
                    // { title: '仓库编号', dataIndex: 'warehouse_code', key: 'warehouse_code', align: 'center', width: '120px', },
                    { title: '扩展编号', dataIndex: 'external_order_code', key: 'external_order_code', align: 'center', width: '120px', },
                    { title: '出库总数', dataIndex: 'order_qty', key: 'order_qty', align: 'center', width: '120px', },
                    { title: '已分配数量', dataIndex: 'order_allocated_qty', key: 'order_allocated_qty', align: 'center', width: '120px', },
                    { title: '已完成数量', dataIndex: 'order_finished_qty', key: 'order_finished_qty', align: 'center', width: '120px', },
                    { title: '订单时间', dataIndex: 'order_time', key: 'order_time', align: 'center', width: '120px', },
                    // { title: '创建来源', dataIndex: 'created_from', key: 'created_from', align: 'center', width: '120px', },
                    // { title: '创建时间', dataIndex: 'created_time', key: 'created_time', align: 'center', width: '120px', },
                    // { title: '创建人员', dataIndex: 'created_operator', key: 'created_operator', align: 'center', width: '120px', },
                    // { title: '更新时间', dataIndex: 'last_updated_time', key: 'last_updated_time', align: 'center', width: '120px', },
                    // { title: '更新人员', dataIndex: 'last_updated_operator', key: 'last_updated_operator', align: 'center', width: '120px', },
                    // { title: '关联编号1', dataIndex: 'related_code1', key: 'related_code1', align: 'center', width: '120px', },
                    // { title: '关联编号2', dataIndex: 'related_code2', key: 'related_code2', align: 'center', width: '120px', },
                    {
                        title: '操作', dataIndex: 'operation', key: 'operation', align: 'center', width: '120px', fixed: 'right', render: (value: any, record: IHCOutboundOrder, index: number) => {
                            return <>
                                <Popconfirm title="确定分配吗?" onConfirm={() => HandleAutoAllocateQty(record)}>
                                    <Button icon={<CheckCircleOutlined />} type='primary' style={{ marginLeft: "-7px" }}>自动分配</Button>
                                </Popconfirm>
                                <Popconfirm title="确定关闭吗?" onConfirm={() => HandleOrderClose(record)}>
                                    <Button icon={<CloseCircleOutlined />} style={{ marginTop: "5px" }} type='primary' danger>关闭</Button>
                                </Popconfirm>
                                <Popconfirm title="确定移除吗?" onConfirm={() => HandleOrderRemove(record)}>
                                    <Button icon={<DeleteOutlined />} style={{ marginTop: "5px" }} danger>移除</Button>
                                </Popconfirm>
                            </>
                        }
                    },
                ]}
            />
        </div>
        <div>
            <Modal title="创建出库单" open={showModal} onOk={onCreateOrder} onCancel={() => { setShowModal(false); }} okText="创建订单" cancelText="取消创建">
                <OutboundQuickAdd setQuickAddOutboundItems={setQuickAddOutboundItems} />
            </Modal>
        </div>
    </>
}