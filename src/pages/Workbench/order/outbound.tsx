import moment from 'moment';
import { ColumnsType } from 'antd/es/table';
import type { FormInstance } from 'antd/es/form';
import { DefaultOptionType } from 'antd/es/cascader';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Popconfirm, Table, Cascader, InputNumber, InputRef, message, Row, Col } from 'antd';
import { SearchOutlined, CheckCircleOutlined, RollbackOutlined, FormOutlined, DeleteOutlined, CloseCircleOutlined } from '@ant-design/icons';

import api from '../../../utils/api';
import hc_config from "../../../config/index.json";
import mock_order_list from '../../../mocks/outbound_order.20230321.mock';
import { IHCOutboundOrder, IHCOutboundOrderDetail, IHCItem, IHCSupplier } from '../../../types/interface';

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item extends IHCOutboundOrder { }
interface SecondItem extends IHCOutboundOrderDetail { }

interface EditableRowProps {
    index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

const SecondEditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

interface EditableCellProps {
    title: React.ReactNode;
    editable: boolean;
    children: React.ReactNode;
    dataIndex: keyof Item;
    record: Item;
    handleSaveOrder: (record: Item) => void;
}

interface SecondEditableCellProps {
    title: React.ReactNode;
    editable: boolean;
    children: React.ReactNode;
    dataIndex: keyof SecondItem;
    record: SecondItem;
    handleSaveOrderDetail: (record: SecondItem) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSaveOrder,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef<InputRef>(null);
    const form = useContext(EditableContext)!;

    useEffect(() => {
        if (editing) {
            inputRef.current!.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();

            toggleEdit();
            handleSaveOrder({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{ margin: 0 }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};

const SecondEditableCell: React.FC<SecondEditableCellProps> = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSaveOrderDetail,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef<InputRef>(null);
    const form = useContext(EditableContext)!;

    useEffect(() => {
        if (editing) {
            inputRef.current!.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();

            toggleEdit();
            handleSaveOrderDetail({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{ margin: 0 }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};

const components = {
    body: {
        row: EditableRow,
        cell: EditableCell,
    },
};

const second_components = {
    body: {
        row: SecondEditableRow,
        cell: SecondEditableCell,
    },
};

const App: React.FC = () => {
    const [outbound_orders, setOutboundOrders] = useState<IHCOutboundOrder[]>([]);
    const [item_options, setItemOptions] = useState<DefaultOptionType[]>([]);
    const [supplier_options, setSupplierOptions] = useState<DefaultOptionType[]>([]);
    const [item_code, setItemCode] = useState<string>("");
    const [supplier_code, setSupplierCode] = useState<string>("");
    const [items, setItems] = useState<IHCItem[]>([]);
    const [suppliers, setSuppliers] = useState<IHCSupplier[]>([]);

    function handleSaveOrder(row: IHCOutboundOrder) {
        const new_orders = [...outbound_orders];
        const new_order_index = new_orders.findIndex(item => row.key === item.key);
        const new_order = new_orders[new_order_index];
        new_orders.splice(new_order_index, 1, {
            ...new_order,
            ...row,
        });
        setOutboundOrders(new_orders);
    };

    function handleSaveOrderDetail(row: IHCOutboundOrderDetail) {
        if (row.order_cur_allocate_qty < 0) {
            message.warning("不允许输入负数！");
            return;
        }
        const new_orders = [...outbound_orders];
        const new_order_index = new_orders.findIndex(item => row.order_code === item.order_code);
        const new_order = new_orders[new_order_index];
        const new_order_details = [...new_order.order_details];
        const new_order_detail_index = new_order_details.findIndex(item => item.key === row.key);
        const new_order_detail = new_order_details[new_order_detail_index];
        new_order_details.splice(new_order_detail_index, 1, {
            ...new_order_detail,
            ...row,
        });
        new_order.order_details = new_order_details;
        new_order.order_cur_allocate_qty = 0;
        new_order.order_details.forEach(_detail => {
            new_order.order_cur_allocate_qty = new_order.order_cur_allocate_qty + Math.floor(_detail.order_cur_allocate_qty);
        });
        setOutboundOrders(new_orders);
    };

    function onOptionFilter(inputValue: string, path: DefaultOptionType[]): boolean {
        return path.some((option) => (option.label as string).toLowerCase().indexOf(inputValue.toLowerCase()) > -1,);
    }

    function onItemOptionChange(item_codes: any) {
        const item_code = item_codes ? item_codes[0] : "";
        setItemCode(item_code);
    }

    async function onItemOptionSearch(item_code: string) {
        if (!item_code) {
            setItems([]);
            setItemOptions([]);
            return;
        }

        if (hc_config.debug.enable && hc_config.debug.enable_mock) {
            onItemOptionSearchTest(item_code);
            return;
        }

        const get_items_result = await api.ItemsFindByText(item_code);
        if (get_items_result && get_items_result.result_code === 0) {
            const item_options: DefaultOptionType[] = [];
            for (let item of get_items_result.data.data_list) {
                const item_label = `[${item.item_code}]-[${item.item_extend_code1}]-[${item.item_name}]`;
                item_options.push({
                    label: item_label,
                    value: item.item_code
                });
            }

            setItems(get_items_result.data.data_list);
            setItemOptions(item_options);
        }
    }

    function onItemOptionSearchTest(item_code: string) {
        const item_options: DefaultOptionType[] = [];
        for (let i = 1; i <= Math.floor(Math.random() * 10 + 1); i++) {
            item_options.push({
                label: `Item${i}-物品${i}`,
                value: `Item${i}`
            });
        }

        setItemOptions(item_options);
    }

    function onSupplierOptionChange(supplier_codes: any) {
        const supplier_code = supplier_codes ? supplier_codes[0] : "";
        setSupplierCode(supplier_code);
    }

    async function onSupplierOptionSearch(supplier_code: string) {
        if (!supplier_code) {
            setSuppliers([]);
            setSupplierOptions([]);
            return;
        }

        if (hc_config.debug.enable && hc_config.debug.enable_mock) {
            onSupplierOptionSearchTest(supplier_code);
            return;
        }

        const get_suppliers_result = await api.SupplierFindByText(supplier_code);
        if (get_suppliers_result && get_suppliers_result.result_code === 0) {
            const supplier_options: DefaultOptionType[] = [];
            for (let supplier of get_suppliers_result.data.data_list) {
                const supplier_label = `[${supplier.supplier_code}]-[${supplier.supplier_name}]`;
                supplier_options.push({
                    label: supplier_label,
                    value: supplier.supplier_code
                });
            }

            setSuppliers(get_suppliers_result.data.data_list);
            setSupplierOptions(supplier_options);
        }
    }

    function onSupplierOptionSearchTest(supplier_code: string) {
        const supplier_options: DefaultOptionType[] = [];
        for (let i = 1; i <= Math.floor(Math.random() * 10 + 1); i++) {
            supplier_options.push({
                label: `Supplier${i}-供应商${i}号`,
                value: `Supplier${i}`,
            });
        }

        setSupplierOptions(supplier_options);
    }

    async function queryOrderList() {
        if (hc_config.debug.enable && hc_config.debug.enable_mock) {
            message.warning(`[debug] 查询订单成功。订单总数 ${mock_order_list.length}`);
            setOutboundOrders(mock_order_list);
            return;
        }

        if (!item_code) {
            message.error('物品编码不能为空！');
            return;
        }

        const get_order_result = await api.OrderOutboundFind(item_code, supplier_code)
        if (!get_order_result || get_order_result.result_code !== 0) {
            message.error(`查询订单失败！err_msg: ${get_order_result.result_msg}`);
            return;
        }

        let order_key = 0;
        get_order_result.data.data_list.map(order => {
            order.key = (order_key += 1);
            order.order_cur_allocate_qty = order.order_qty - order.order_finished_qty - order.order_allocated_qty;
            let detail_key = 0;
            order.order_details.map(detail => {
                detail.key = (detail_key += 1);
                detail.order_cur_allocate_qty = detail.order_qty - detail.order_finished_qty - detail.order_allocated_qty;
            });
        });

        message.success(`查询订单成功。订单总数 ${get_order_result.data.total_count}, 当前数量：${get_order_result.data.data_list.length}`);
        setOutboundOrders(get_order_result.data.data_list);
    }

    async function confirmOutboundOrders(outbound_order: IHCOutboundOrder) {
        if (!outbound_orders || !outbound_orders.length) {
            message.error('未找到订单信息，无法分配！');
            return;
        }

        const _order_details: { order_detail_id: number, allocate_quantity: number }[] = [];

        outbound_order.order_details.forEach(_detail => {
            _order_details.push({
                order_detail_id: _detail.order_detail_id,
                allocate_quantity: _detail.order_cur_allocate_qty as number
            });
        });

        message.info(`向后台确认分配结果. 订单编码: ${outbound_order.order_code}`);
        const allocate_result = await api.OrderOutboundAutoAllocateDetails(outbound_order.order_code, _order_details);

        if (allocate_result.result_code !== 0) {
            message.error(`订单分配数量失败！result_code: ${allocate_result.result_code} 提示: ${allocate_result.result_msg}`);
            return
        }

        message.success(`订单分配数量成功。`);

        setItemCode("");
        setSupplierCode("");
        setItemOptions([]);
        setSupplierOptions([]);
        setOutboundOrders([]);
    }

    async function handleOrderClose(order: IHCOutboundOrder) {
        message.info(`closing order. ${order.order_code}`);
        const close_result = await api.OrderOutboundClose(order.order_code);
        if (close_result.result_code !== 0) {
            message.error(`关闭订单失败！订单编码: ${order.order_code} 提示: ${close_result.result_msg}`);
            return
        }

        message.success(`关闭订单成功。订单编码: ${order.order_code}`);
    }

    async function handleOrderDetailClose(order_detail: IHCOutboundOrderDetail) {
        message.info(`closing order detail. ${order_detail.line_no}`);
        const close_result = await api.OrderOutboundDetailClose(order_detail.order_code, order_detail.order_detail_id);
        if (close_result.result_code !== 0) {
            message.error(`关闭订单行失败！订单编码: ${order_detail.order_code} 明细编码: ${order_detail.order_detail_id} 提示: ${close_result.result_msg}`);
            return
        }

        message.success(`关闭订单行成功。订单编码: ${order_detail.order_code}, 明细编码: ${order_detail.order_detail_id}`);
    }

    const handleOrderDelete = (key: React.Key) => {
        const _orders = outbound_orders.filter((item) => item.key !== key);
        setOutboundOrders(_orders);
    };

    const handleOrderDetailDelete = (outbound_order_detail: IHCOutboundOrderDetail) => {
        const new_orders = [...outbound_orders];
        const new_order_index = new_orders.findIndex(item => outbound_order_detail.order_code === item.order_code);
        const new_order = new_orders[new_order_index];
        const new_order_details = new_order.order_details.filter(_detail => _detail.key !== outbound_order_detail.key);
        new_order.order_details = new_order_details;
        setOutboundOrders(new_orders);
    };

    const first_columns = [
        {
            title: '序号', dataIndex: 'key', key: 'key', align: 'center', width: "65px", fixed: 'left',
        },
        // { title: 'WMS单号', dataIndex: 'order_code', key: 'order_code', align: 'center', width: "150px", fixed: 'left' },
        { title: '订单号', dataIndex: 'external_order_code', key: 'external_order_code', align: 'center', width: "160px", fixed: 'left' },
        { title: '关联单号1', dataIndex: 'related_code1', key: 'related_code1', align: 'center', width: "160px", },
        // { title: '关联单号2', dataIndex: 'related_code2', key: 'related_code2', align: 'center', width: "150px", },
        { title: '订单状态', dataIndex: 'order_status', key: 'order_status', align: 'center', width: "100px", },
        { title: '订单类型', dataIndex: 'order_type_code', key: 'order_type_code', align: 'center', width: "100px", },
        { title: '订单数量', dataIndex: 'order_qty', key: 'order_qty', align: 'center', width: "90px", },
        { title: '已完成数量', dataIndex: 'order_finished_qty', key: 'order_finished_qty', align: 'center', width: "110px", },
        { title: '已分配数量', dataIndex: 'order_allocated_qty', key: 'order_allocated_qty', align: 'center', width: "110px", },
        {
            title: '本次分配数量', dataIndex: 'order_cur_allocate_qty', key: 'order_cur_allocate_qty', align: 'center', width: "120px", editable: false,
        },
        {
            title: '订单时间', dataIndex: 'order_time', key: 'order_time', align: 'center', width: "115px",
            render: (value: any, record: any, index: number) => { return <span>{moment(value).format('YYYY-MM-DD HH:mm:ss')}</span>; }
        },
        {
            title: '创建时间', dataIndex: 'created_time', key: 'created_time', align: 'center', width: "115px",
            render: (value: any, record: any, index: number) => { return <span>{moment(value).format('YYYY-MM-DD HH:mm:ss')}</span>; }
        },
        { title: '创建来源', dataIndex: 'created_from', key: 'created_from', align: 'center', width: "115px", },
        // { title: '创建人', dataIndex: 'created_operator', key: 'created_operator', align: 'center', width: "130px", },
        {
            title: '操作时间', dataIndex: 'last_updated_time', key: 'last_updated_time', align: 'center', width: "115px",
            render: (value: any, record: any, index: number) => { return <span>{moment(value).format('YYYY-MM-DD HH:mm:ss')}</span>; }
        },
        // { title: '最近操作人', dataIndex: 'last_updated_operator', key: 'last_updated_operator', align: 'center', width: "130px", }
        {
            title: '操作',
            dataIndex: 'operation',
            align: "center",
            width: "210px",
            fixed: 'right',
            render: (_: any, record: IHCOutboundOrder, index: number) =>
                outbound_orders.length >= 1 ? (
                    <div>
                        <Popconfirm title="确定分配吗?" onConfirm={() => confirmOutboundOrders(record)}>
                            <Button icon={<CheckCircleOutlined />} type='primary'>确认自动分配料箱</Button>
                        </Popconfirm>
                        <Popconfirm title="确定关闭吗?" onConfirm={() => handleOrderClose(record)}>
                            <Button icon={<CloseCircleOutlined />} style={{ marginTop: "5px" }} type='primary' danger>关闭</Button>
                        </Popconfirm>
                        <Popconfirm title="确定移除吗?" onConfirm={() => handleOrderDelete(record.key)}>
                            <Button icon={<DeleteOutlined />} style={{ marginLeft: "5px" }} danger>移除</Button>
                        </Popconfirm>
                    </div>
                ) : null,
        },
    ];

    const first_columns_final = first_columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: IHCOutboundOrder) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSaveOrder,
            }),
        };
    });

    const second_columns = [
        // { title: '序号', dataIndex: 'key', key: 'key', align: 'center', width: '70px', fixed: 'left' },
        { title: '行号', dataIndex: 'line_no', key: 'line_no', align: 'center', width: '65px', fixed: 'left' },
        // { title: 'WMS单号', dataIndex: 'order_code', key: 'order_code', align: 'center', width: '130px' },
        { title: '订单状态', dataIndex: 'order_status', key: 'order_status', align: 'center', width: '100px' },
        { title: '物品编码', dataIndex: 'item_code', key: 'item_code', align: 'center', width: '100px' },
        // { title: '物品名称', dataIndex: 'item_name', key: 'item_name', align: 'center', width: '100px' },
        // { title: '物品规格', dataIndex: 'item_name', key: 'item_name', align: 'center', width: '100px' },
        // { title: '物品型号', dataIndex: 'item_name', key: 'item_name', align: 'center', width: '100px' },
        // { title: '物品单位', dataIndex: 'item_name', key: 'item_name', align: 'center', width: '100px' },
        { title: '供应商', dataIndex: 'supplier_code', key: 'supplier_code', align: 'center', width: '100px' },
        { title: '订单数量', dataIndex: 'order_qty', key: 'order_qty', align: 'center', width: '90px' },
        { title: '已完成数量', dataIndex: 'order_finished_qty', key: 'order_finished_qty', align: 'center', width: '110px' },
        { title: '已分配数量', dataIndex: 'order_allocated_qty', key: 'order_allocated_qty', align: 'center', width: '110px' },
        {
            title: '本次分配数量', dataIndex: 'order_cur_allocate_qty', key: 'order_cur_allocate_qty', align: 'center', width: "120px", editable: true,
            render: (value: any, record: IHCOutboundOrderDetail, idx: number) => { return <InputNumber precision={2} value={value} ></InputNumber>; }
        },
        {
            title: '指定料箱号', dataIndex: 'allocate_box_code', key: 'allocate_box_code', align: 'center', width: "120px", editable: true,
            render: (value: any, record: any, index: number) => { return <Input value={value}></Input>; }
        },
        // { title: '创建时间', dataIndex: 'created_time', key: 'created_time', align: 'center', width: '130px' },
        // { title: '创建人', dataIndex: 'created_operator', key: 'created_operator', align: 'center', width: '130px' },
        {
            title: '更新时间', dataIndex: 'last_updated_time', key: 'last_updated_time', align: 'center', width: '130px',
            render: (value: any, record: any, index: number) => { return <span>{moment(value).format('YYYY-MM-DD HH:mm:ss')}</span>; }
        },
        // { title: '操作人', dataIndex: 'last_updated_operator', key: 'last_updated_operator', align: 'center', width: '130px' },
        // { title: '产品日期', dataIndex: 'production_date', key: 'production_date', align: 'center', width: '130px' },
        // { title: '存储日期', dataIndex: 'storage_date', key: 'storage_date', align: 'center', width: '130px' },
        // { title: '截止日期', dataIndex: 'expiry_date', key: 'expiry_date', align: 'center', width: '130px' },
        {
            title: '操作',
            dataIndex: 'operation',
            align: "center",
            width: "210px",
            fixed: 'right',
            render: (_: any, record: IHCOutboundOrderDetail, index: number) =>
                outbound_orders.length >= 1 ? (
                    <div>
                        <Popconfirm title="确定关闭吗?" onConfirm={() => handleOrderDetailClose(record)}>
                            <Button icon={<CloseCircleOutlined />} type='primary' danger>关闭</Button>
                        </Popconfirm>
                        <Popconfirm title="确定移除吗?" onConfirm={() => handleOrderDetailDelete(record)}>
                            <Button icon={<DeleteOutlined />} style={{ marginLeft: "5px" }} danger>移除</Button>
                        </Popconfirm>
                    </div>
                ) : null,
        },
    ];

    const second_columns_final = second_columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: IHCOutboundOrderDetail) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSaveOrderDetail,
            }),
        };
    });

    function expandedRowRender(record: IHCOutboundOrder, index: any, indent: any, expanded: any): React.ReactNode {
        return <Table
            className="virtual-table"
            components={second_components}
            rowClassName={() => 'editable-row'}
            bordered
            columns={second_columns_final as ColumnsType<IHCOutboundOrderDetail>}
            dataSource={record.order_details || []}
            pagination={false}
            scroll={{ x: 960, y: 300 }}
            style={{ marginLeft: "65px" }}
        />;
    }

    return (
        <div>
            <Row>
                <Col span={12}>
                    <h2 style={{ paddingLeft: "20px" }}>出库单分配</h2>
                </Col>
                <Col span={7}></Col>
                <Col span={3}>
                    <Button type="primary" icon={<FormOutlined />} style={{ marginTop: "20px" }} onClick={() => { window.location.href = "/workbench/order/outbound/quick_add" }}>手工创建出库单</Button>
                </Col>
                <Col span={2}>
                    <Button type="primary" icon={<RollbackOutlined />} style={{ marginTop: "20px" }} onClick={() => { window.location.href = "/workbench" }}>返回主页</Button>
                </Col>
            </Row>
            <div className="hc_panel">
                <div className="search_box">
                    <label>*物品编码：</label>
                    <Cascader
                        className="search_text"
                        options={item_options}
                        placeholder="请输入物品码/物品名称/物品别名（必填）"
                        showSearch={{ filter: onOptionFilter }}
                        onChange={onItemOptionChange}
                        onSearch={onItemOptionSearch}
                    />
                    <label style={{ marginLeft: "30px" }}>供应商编码：</label>
                    <Cascader
                        className="search_text"
                        options={supplier_options}
                        placeholder="请输入供应商码、供应商名称（选填）"
                        showSearch={{ filter: onOptionFilter }}
                        onChange={onSupplierOptionChange}
                        onSearch={onSupplierOptionSearch}
                    />
                    <Button type="primary" icon={<SearchOutlined />} onClick={queryOrderList} style={{ marginLeft: "10px" }}>查询订单</Button>
                </div>
            </div>
            <Table
                className="hc_panel virtual-table"
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                columns={first_columns_final as ColumnsType<IHCOutboundOrder>}
                expandable={{ expandedRowRender }}
                dataSource={outbound_orders}
                scroll={{ x: 960, y: 600 }}
            />
        </div>
    );
};



export default App;