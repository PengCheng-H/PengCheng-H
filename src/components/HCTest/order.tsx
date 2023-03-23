import type { FormInstance } from 'antd/es/form';
import { DefaultOptionType } from 'antd/es/cascader';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Popconfirm, Table, Cascader, InputNumber, InputRef, message } from 'antd';

import api from '../../utils/api';
import hc_config from "../../config/index.json";
import order_list from '../../mocks/inbound_order.20230321.mock';
import { IHCInboundOrder, IHCInboundOrderDetail, IHCItem, IHCSupplier } from '../../types/interface';
import { ColumnsType } from 'antd/es/table';

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item extends IHCInboundOrder { }
interface SecondItem extends IHCInboundOrderDetail { }

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

type EditableTableProps = Parameters<typeof Table>[0];

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

interface DataType extends IHCInboundOrder { }

interface SecondDataType extends IHCInboundOrderDetail { }

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

type SecondColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const App: React.FC = () => {
    const [inbound_orders, setInboundOrders] = useState<DataType[]>(order_list);
    const [item_options, setItemOptions] = useState<DefaultOptionType[]>([]);
    const [supplier_options, setSupplierOptions] = useState<DefaultOptionType[]>([]);
    const [item_code, setItemCode] = useState<string>("");
    const [supplier_code, setSupplierCode] = useState<string>("");
    const [items, setItems] = useState<IHCItem[]>([]);
    const [suppliers, setSuppliers] = useState<IHCSupplier[]>([]);

    function handleSaveOrder(row: DataType) {
        const new_orders = [...inbound_orders];
        const new_order_index = new_orders.findIndex(item => row.key === item.key);
        const new_order = new_orders[new_order_index];
        new_orders.splice(new_order_index, 1, {
            ...new_order,
            ...row,
        });
        setInboundOrders(new_orders);
    };

    function handleSaveOrderDetail(row: SecondDataType) {
        const new_orders = [...inbound_orders];
        const new_order_index = new_orders.findIndex(item => row.key === item.key);
        const new_order = new_orders[new_order_index];
        const new_order_details = [...new_order.order_details];
        const new_order_detail_index = new_order_details.findIndex(item => item.key === row.key);
        const new_order_detail = new_order_details[new_order_detail_index];
        new_order_details.splice(new_order_detail_index, 1, {
            ...new_order_detail,
            ...row,
        });
        new_order.order_details = new_order_details;
        setInboundOrders(new_orders);
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

        const get_items_result = await api.GetItems(item_code);
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

        const get_suppliers_result = await api.GetSuppliers(supplier_code);
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
        const get_order_result = await api.GetInboundOrders(item_code, supplier_code)
        if (get_order_result && get_order_result.result_code === 0) {
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

            setInboundOrders(get_order_result.data.data_list);
        }
    }

    function confirmInboundOrders() {
        message.info(`confirm inbound orders.`);
    }

    function handleOrderClose(order: IHCInboundOrder) {
        message.info(`closing order. ${order.order_code}`);
    }

    function handleOrderDetailClose(order_detail: IHCInboundOrderDetail) {
        message.info(`closing order detail. ${order_detail.line_no}`);
    }

    const handleOrderDelete = (key: React.Key) => {
        const newData = inbound_orders.filter((item) => item.key !== key);
        setInboundOrders(newData);
    };

    const handleOrderDetailDelete = (inbound_order_detail: IHCInboundOrderDetail) => {
        // const newData = dataSource.filter((item) => item.order_details.filter(item_detail => {

        // }));
        // setDataSource(newData);
    };

    const first_columns = [
        { title: '序号', dataIndex: 'key', key: 'key', align: 'center', width: "70px", fixed: 'left', },
        // { title: 'WMS单号', dataIndex: 'order_code', key: 'order_code', align: 'center', width: "150px", fixed: 'left' },
        { title: '订单号', dataIndex: 'external_order_code', key: 'external_order_code', align: 'center', width: "160px", fixed: 'left' },
        { title: '关联单号1', dataIndex: 'related_code1', key: 'related_code1', align: 'center', width: "150px", },
        // { title: '关联单号2', dataIndex: 'related_code2', key: 'related_code2', align: 'center', width: "150px", },
        { title: '订单状态', dataIndex: 'order_status', key: 'order_status', align: 'center', width: "130px", },
        { title: '订单类型', dataIndex: 'order_type_code', key: 'order_type_code', align: 'center', width: "130px", },
        { title: '订单数量', dataIndex: 'order_qty', key: 'order_qty', align: 'center', width: "130px", },
        { title: '已完成数量', dataIndex: 'order_finished_qty', key: 'order_finished_qty', align: 'center', width: "130px", },
        { title: '已分配数量', dataIndex: 'order_allocated_qty', key: 'order_allocated_qty', align: 'center', width: "130px", },
        {
            title: '本次分配数量', dataIndex: 'order_cur_allocate_qty', key: 'order_cur_allocate_qty', align: 'center', width: "130px", editable: true,
            // render: (value, record, index) => { return <InputNumber value={value}></InputNumber>; }
        },
        { title: '订单时间', dataIndex: 'order_time', key: 'order_time', align: 'center', width: "130px", },
        { title: '创建时间', dataIndex: 'created_time', key: 'created_time', align: 'center', width: "130px", },
        { title: '创建来源', dataIndex: 'created_from', key: 'created_from', align: 'center', width: "130px", },
        // { title: '创建人', dataIndex: 'created_operator', key: 'created_operator', align: 'center', width: "130px", },
        { title: '最近操作时间', dataIndex: 'last_updated_time', key: 'last_updated_time', align: 'center', width: "130px", },
        // { title: '最近操作人', dataIndex: 'last_updated_operator', key: 'last_updated_operator', align: 'center', width: "130px", }
        {
            title: '操作',
            dataIndex: 'operation',
            align: "center",
            width: "100px",
            fixed: 'right',
            // render: (_, record: any, index: number) =>
            //     inbound_orders.length >= 1 ? (
            //         <div>
            //             <Popconfirm title="确定关闭吗?" onConfirm={() => handleOrderClose(record)}>
            //                 <Button type='primary'>关闭</Button>
            //             </Popconfirm>
            //             <Popconfirm title="确定删除吗?" onConfirm={() => handleOrderDelete(record.key)}>
            //                 <Button style={{ marginTop: "10px" }}>删除</Button>
            //             </Popconfirm>
            //         </div>
            //     ) : null,
        },
    ];

    const first_columns_final = first_columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: DataType) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSaveOrder,
            }),
        };
    });

    const second_columns = [
        { title: '序号', dataIndex: 'key', key: 'key', align: 'center', width: '70px', fixed: 'left' },
        { title: '行号', dataIndex: 'line_no', key: 'line_no', align: 'center', width: '100px', fixed: 'left' },
        // { title: 'WMS单号', dataIndex: 'order_code', key: 'order_code', align: 'center', width: '130px' },
        // { title: '订单状态', dataIndex: 'order_status', key: 'order_status', align: 'center', width: '130px' },
        { title: '物品编码', dataIndex: 'item_code', key: 'item_code', align: 'center', width: '130px' },
        { title: '供应商', dataIndex: 'supplier_code', key: 'supplier_code', align: 'center', width: '130px' },
        { title: '订单数量', dataIndex: 'order_qty', key: 'order_qty', align: 'center', width: '130px' },
        { title: '已完成数量', dataIndex: 'order_finished_qty', key: 'order_finished_qty', align: 'center', width: '130px' },
        { title: '已分配数量', dataIndex: 'order_allocated_qty', key: 'order_allocated_qty', align: 'center', width: '130px' },
        {
            title: '本次分配数量', dataIndex: 'order_cur_allocate_qty', key: 'order_cur_allocate_qty', align: 'center', width: "130px", editable: true,
            // render: (value, record, index) => { return <InputNumber value={value}></InputNumber>; }
        },
        // { title: '创建时间', dataIndex: 'created_time', key: 'created_time', align: 'center', width: '130px' },
        // { title: '创建人', dataIndex: 'created_operator', key: 'created_operator', align: 'center', width: '130px' },
        { title: '更新时间', dataIndex: 'last_updated_time', key: 'last_updated_time', align: 'center', width: '130px' },
        // { title: '操作人', dataIndex: 'last_updated_operator', key: 'last_updated_operator', align: 'center', width: '130px' },
        // { title: '产品日期', dataIndex: 'production_date', key: 'production_date', align: 'center', width: '130px' },
        // { title: '存储日期', dataIndex: 'storage_date', key: 'storage_date', align: 'center', width: '130px' },
        // { title: '截止日期', dataIndex: 'expiry_date', key: 'expiry_date', align: 'center', width: '130px' },
        {
            title: '操作',
            dataIndex: 'operation',
            align: "center",
            width: "100px",
            fixed: 'right',
            // render: (_, record: any, index: number) =>
            //     inbound_orders.length >= 1 ? (
            //         <div>
            //             <Popconfirm title="确定关闭吗?" onConfirm={() => handleOrderDetailClose(record)}>
            //                 <Button type='primary'>关闭</Button>
            //             </Popconfirm>
            //             <Popconfirm title="确定删除吗?" onConfirm={() => handleOrderDetailDelete(record)}>
            //                 <Button style={{ marginTop: "10px" }}>删除</Button>
            //             </Popconfirm>
            //         </div>
            //     ) : null,
        },
    ];

    const second_columns_final = second_columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: SecondDataType) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSaveOrderDetail,
            }),
        };
    });

    function expandedRowRender(record: IHCInboundOrder, index: any, indent: any, expanded: any): React.ReactNode {
        return <Table
            className="virtual-table"
            components={second_components}
            rowClassName={() => 'editable-row'}
            bordered
            columns={second_columns_final as ColumnsType<{}>}
            dataSource={record.order_details || []}
            pagination={false}
            scroll={{ x: 960, y: 300 }}
        />;
    }

    return (
        <div>
            <Button type="primary" style={{ margin: "10px" }} onClick={() => { window.location.href = "/workbench" }}>返回主页</Button>
            <h1>入库单</h1>
            <div className="hc_panel">
                <div className="search_box">
                    <label>物品编码：</label>
                    <Cascader
                        className="search_text"
                        options={item_options}
                        placeholder="请输入物品码/物品名称/物品别名"
                        showSearch={{ filter: onOptionFilter }}
                        onChange={onItemOptionChange}
                        onSearch={onItemOptionSearch}
                    />
                    <label style={{ marginLeft: "30px" }}>供应商编码：</label>
                    <Cascader
                        className="search_text"
                        options={supplier_options}
                        placeholder="请输入供应商码、供应商名称"
                        showSearch={{ filter: onOptionFilter }}
                        onChange={onSupplierOptionChange}
                        onSearch={onSupplierOptionSearch}
                    />
                    <Button type="primary" onClick={queryOrderList} style={{ marginLeft: "30px" }}>查询订单</Button>
                    <Button type="primary" onClick={confirmInboundOrders} style={{ marginLeft: "30px" }}>确认入库</Button>
                </div>
            </div>
            <Table
                className="hc_panel virtual-table"
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                columns={first_columns_final as ColumnsType<any>}
                expandable={{ expandedRowRender }}
                dataSource={inbound_orders}
                scroll={{ x: 960, y: 600 }}
            />
        </div>
    );
};

export default App;