import moment from 'moment';
import { ColumnsType } from 'antd/es/table';
import type { FormInstance } from 'antd/es/form';
import { DefaultOptionType } from 'antd/es/cascader';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Popconfirm, Table, Cascader, InputNumber, InputRef, message, Row, Col } from 'antd';
import { SearchOutlined, CheckCircleOutlined, RollbackOutlined, BorderInnerOutlined, BorderOuterOutlined, DeleteOutlined, CloseCircleOutlined, FormOutlined } from '@ant-design/icons';

import api from '../../../utils/api';
import hc_config from "../../../config/index.json";
import * as IHttpReq from "../../../types/http_request.interface";
import mock_order_list from '../../../mocks/inbound_order.20230321.mock';
import { em_order_status } from '../../../types/enum';
import { IHCInboundOrder, IHCInboundOrderDetail, IHCItem, IHCSupplier } from '../../../types/interface';

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
                        required: false,
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
                        required: false,
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
    type IBox = { box_code: string, location_code: string };
    const [inbound_orders, setInboundOrders] = useState<IHCInboundOrder[]>([]);
    const [item_code, setItemCode] = useState<string>("");
    const [item_options, setItemOptions] = useState<DefaultOptionType[]>([]);
    const [items, setItems] = useState<IHCItem[]>([]);
    const [supplier_code, setSupplierCode] = useState<string>("");
    const [supplier_options, setSupplierOptions] = useState<DefaultOptionType[]>([]);
    const [suppliers, setSuppliers] = useState<IHCSupplier[]>([]);
    const [box_options, setBoxOptions] = useState<DefaultOptionType[]>([]);
    const [boxes, setBoxes] = useState<IBox[]>([]);

    function handleSaveOrder(row: IHCInboundOrder) {
        const new_orders = [...inbound_orders];
        const new_order_index = new_orders.findIndex(item => row.key === item.key);
        const new_order = new_orders[new_order_index];
        new_orders.splice(new_order_index, 1, {
            ...new_order,
            ...row,
        });
        setInboundOrders(new_orders);
    };

    function handleSaveOrderDetail(row: IHCInboundOrderDetail) {
        if (row.order_cur_allocate_qty < 0) {
            message.warning("不允许输入负数！");
            return;
        }
        const new_orders = [...inbound_orders];
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
        setInboundOrders(new_orders);
    };

    function onOptionFilter(inputValue: string, path: DefaultOptionType[]): boolean {
        return path.some((option) => (option.label as string).toLowerCase().indexOf(inputValue.toLowerCase()) > -1,);
    }

    function onItemOptionChange(item_codes: any) {
        const _item_code = item_codes ? item_codes[0] : "";
        setItemCode(_item_code);
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
        if (get_items_result.result_code !== 0) {
            message.error(`搜索物品失败！err_msg: ${get_items_result.result_msg}`);
            return;
        }

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
        const _supplier_code = supplier_codes ? supplier_codes[0] : "";
        setSupplierCode(_supplier_code);
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
        if (get_suppliers_result.result_code !== 0) {
            message.error(`搜索供应商失败！err_msg: ${get_suppliers_result.result_msg}`);
            return;
        }

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

    function onOrderBoxOptionChange(_box_codes: any, order: IHCInboundOrder) {
        const _box_code = _box_codes ? _box_codes[0] : "";
        order.allocate_box_code = _box_code;
        const new_orders = [...inbound_orders];
        const new_order_index = new_orders.findIndex(item => order.order_code === item.order_code);
        const new_order = new_orders[new_order_index];
        new_orders.splice(new_order_index, 1, {
            ...new_order,
            ...order,
        });
        setInboundOrders(new_orders);
    }

    async function onOrderBoxOptionSearch(_box_code_part: string, order: IHCInboundOrder) {
        const get_boxes_result = await api.InventoryFindEmptyBoxes();
        // const get_boxes_result = await api.InventoryFindEmptyBoxes({ box_code: _box_code_part });
        if (get_boxes_result.result_code !== 0) {
            message.error(`搜索料箱失败！err_msg: ${get_boxes_result.result_msg}`);
            return;
        }

        const _box_options: DefaultOptionType[] = [];
        for (let box of get_boxes_result.data.data_list) {
            const box_label = `[${box.box_code}]_[${box.location_code}]`;
            _box_options.push({
                label: box_label,
                value: box.box_code
            });
        }

        setBoxes(get_boxes_result.data.data_list);
        setBoxOptions(_box_options);
    }

    function onOrderDetailBoxOptionChange(_box_codes: any, order_detail: IHCInboundOrderDetail) {
        const _box_code = _box_codes ? _box_codes[0] : "";
        order_detail.allocate_box_code = _box_code;
        const new_orders = [...inbound_orders];
        const new_order_index = new_orders.findIndex(item => order_detail.order_code === item.order_code);
        const new_order = new_orders[new_order_index];
        const new_order_details = [...new_order.order_details];
        const new_order_detail_index = new_order_details.findIndex(item => item.key === order_detail.key);
        const new_order_detail = new_order_details[new_order_detail_index];
        new_order_details.splice(new_order_detail_index, 1, {
            ...new_order_detail,
            ...order_detail,
        });
        new_order.order_details = new_order_details;
        new_order.order_cur_allocate_qty = 0;
        new_order.order_details.forEach(_detail => {
            new_order.order_cur_allocate_qty = new_order.order_cur_allocate_qty + Math.floor(_detail.order_cur_allocate_qty);
        });
        setInboundOrders(new_orders);
    }

    async function onOrderDetailBoxOptionSearch(_box_code_part: string, order_detail: IHCInboundOrderDetail) {
        const get_boxes_result = await api.InventoryFindEmptyBoxes();
        // const get_boxes_result = await api.InventoryFindEmptyBoxes({ box_code: _box_code_part });
        if (get_boxes_result && get_boxes_result.result_code === 0) {
            const _box_options: DefaultOptionType[] = [];
            for (let box of get_boxes_result.data.data_list) {
                const box_label = `[${box.box_code}]_[${box.location_code}]`;
                _box_options.push({
                    label: box_label,
                    value: box.box_code
                });
            }

            setBoxes(get_boxes_result.data.data_list);
            setBoxOptions(_box_options);
        }
    }

    async function queryOrderList() {
        if (hc_config.debug.enable && hc_config.debug.enable_mock) {
            message.warning(`[debug] 查询订单成功。订单总数 ${mock_order_list.length}`);
            setInboundOrders(mock_order_list);
            return;
        }

        if (!item_code) {
            message.error('物品编码不能为空！');
            return;
        }

        const get_order_result = await api.OrderInboundFind(item_code, supplier_code)
        if (!get_order_result || get_order_result.result_code !== 0) {
            message.error(`查询订单失败！err_msg: ${get_order_result.result_msg}`);
            return;
        }

        get_order_result.data.data_list.sort((a, b) => {
            return a.external_order_code.localeCompare(b.external_order_code);
        });

        let order_key = 0;
        get_order_result.data.data_list.map(order => {
            order.key = (order_key += 1);
            order.order_cur_allocate_qty = order.order_qty - order.order_finished_qty - order.order_allocated_qty;
            order.allocate_box_code = order.allocate_box_code || "";
            let detail_key = 0;
            order.order_details.map(detail => {
                if (detail.order_status !== '7') {
                    detail.key = (detail_key += 1);
                    detail.order_cur_allocate_qty = detail.order_qty - detail.order_finished_qty - detail.order_allocated_qty;
                    detail.allocate_box_code = detail.allocate_box_code || "";
                }
            });
        });

        message.success(`查询订单成功。订单总数 ${get_order_result.data.total_count}, 当前数量：${get_order_result.data.data_list.length}`);
        setInboundOrders(get_order_result.data.data_list);
    }

    // 自动整单分配: TODO
    async function onAutoAllocateFull() {
        if (!inbound_orders || !inbound_orders.length) {
            message.error('未找到订单信息，无法分配！');
            return;
        }

        // const _order_list: { order_code: string, order_details: { order_detail_id: number, allocate_quantity: number }[] }[] = [];
        // inbound_orders.forEach(_order => {
        //     const __order: { order_code: string, order_details: { order_detail_id: number, allocate_quantity: number }[] } = { order_code: _order.order_code, order_details: [] };

        //     _order.order_details.forEach(_detail => {
        //         __order.order_details.push({
        //             order_detail_id: _detail.order_detail_id,
        //             allocate_quantity: _detail.order_cur_allocate_qty as number
        //         });
        //     });

        //     _order_list.push(__order)
        // });

        // message.info(`向后台确认分配结果. 订单数量: ${_order_list.length}`);
        // const allocate_result = await api.OrderInboundAutoAllocateList(_order_list);

        // if (allocate_result.result_code !== 0) {
        //     message.error(`订单分配数量失败！result_code: ${allocate_result.result_code} 提示: ${allocate_result.result_msg}`);
        //     return
        // }

        // message.success(`订单分配数量成功。`);
        // setTimeout(() => {
        //     window.location.href = "/";
        // }, 1000);
    }

    // 自动分配料箱
    async function onAutoAllocateList() {
        if (!inbound_orders || !inbound_orders.length) {
            message.error('未找到订单信息，无法分配！');
            return;
        }

        const _order_list: { order_code: string, order_details: { order_detail_id: number, allocate_quantity: number }[] }[] = [];
        inbound_orders.forEach(_order => {
            const __order: { order_code: string, order_details: { order_detail_id: number, allocate_quantity: number }[] } = { order_code: _order.order_code, order_details: [] };

            _order.order_details.forEach(_detail => {
                __order.order_details.push({
                    order_detail_id: _detail.order_detail_id,
                    allocate_quantity: _detail.order_cur_allocate_qty as number
                });
            });

            _order_list.push(__order)
        });

        message.info(`向后台确认分配结果. 订单数量: ${_order_list.length}`);
        const allocate_result = await api.OrderInboundAutoAllocateList(_order_list);

        if (allocate_result.result_code !== 0) {
            message.error(`订单分配数量失败！result_code: ${allocate_result.result_code} 提示: ${allocate_result.result_msg}`);
            return
        }

        message.success(`订单分配数量成功。`);
        await queryOrderList();
    }

    // 手工整单分配料箱
    async function onManualAllocateOrder(order: IHCInboundOrder) {
        if (!order || !order.order_code || !order.allocate_box_code) {
            message.error(`未指定料箱，无法手工整单分配！订单号: ${order.order_code}`);
            return;
        }

        message.info(`请求手工整单分配. 订单号: ${order.order_code}, 料箱号: ${order.allocate_box_code}`);
        const allocate_result = await api.OrderInboundManualAllocateFull(order.order_code, order.allocate_box_code as string);

        if (allocate_result.result_code !== 0) {
            message.error(`手工整单分配失败！result_code: ${allocate_result.result_code} 提示: ${allocate_result.result_msg}`);
            return
        }

        message.success(`手工整单分配成功。订单号: ${order.order_code}, 料箱号: ${order.allocate_box_code}`);
        await queryOrderList();
    }

    // 手工整单分配料箱
    async function onManualAllocateOrderDetails(order: IHCInboundOrder) {
        if (!order || !order.order_details || !order.order_details.length) {
            message.error('未找到明细，无法分配！');
            return;
        }

        const params: IHttpReq.IHCOrderInboundManaulAllocateDetailsReq = { order_code: order.order_code, order_details: [] };
        for (let _detail of order.order_details) {
            if (_detail.allocate_box_code) {
                params.order_details.push({
                    order_detail_id: _detail.order_detail_id,
                    allocate_quantity: _detail.order_cur_allocate_qty,
                    box_code: _detail.allocate_box_code
                });
            } else if (_detail.order_status in ["4", "5", "6", "7", "8", "9"]) {
                message.error(`未指定明细料箱，无法手工明细分配！订单号: ${order.order_code}, 行号: ${_detail.line_no}`);
                return;
            }
        }

        message.info(`请求手工明细分配. 订单号: ${order.order_code}, 物品数量: ${params.order_details.length}`);
        const allocate_result = await api.OrderInboundManualAllocateDetails(params);

        if (allocate_result.result_code !== 0) {
            message.error(`手工明细分配失败！result_code: ${allocate_result.result_code} 提示: ${allocate_result.result_msg}`);
            return
        }

        message.success(`手工明细分配成功。订单号: ${order.order_code}, 物品数量: ${params.order_details.length}`);
        await queryOrderList();
    }

    async function handleOrderClose(order: IHCInboundOrder) {
        message.info(`请求关闭订单. ${order.order_code}`);
        const close_result = await api.OrderInboundClose(order.order_code);
        if (close_result.result_code !== 0) {
            message.error(`关闭订单失败！订单编码: ${order.order_code} 提示: ${close_result.result_msg}`);
            return
        }

        message.success(`关闭订单成功。订单编码: ${order.order_code}`);
        await queryOrderList();
    }

    async function handleOrderDetailClose(order_detail: IHCInboundOrderDetail) {
        message.info(`请求关闭订单行. ${order_detail.line_no}`);
        const close_result = await api.OrderInboundDetailClose(order_detail.order_code, order_detail.order_detail_id);
        if (close_result.result_code !== 0) {
            message.error(`关闭订单行失败！订单编码: ${order_detail.order_code} 明细编码: ${order_detail.order_detail_id} 提示: ${close_result.result_msg}`);
            return
        }

        message.success(`关闭订单行成功。订单编码: ${order_detail.order_code}, 明细编码: ${order_detail.order_detail_id}`);
        await queryOrderList();
    }

    const handleOrderDelete = (key: React.Key) => {
        const _orders = inbound_orders.filter((item) => item.key !== key);
        setInboundOrders(_orders);
    };

    const handleOrderDetailDelete = (inbound_order_detail: IHCInboundOrderDetail) => {
        const new_orders = [...inbound_orders];
        const new_order_index = new_orders.findIndex(item => inbound_order_detail.order_code === item.order_code);
        const new_order = new_orders[new_order_index];
        const new_order_details = new_order.order_details.filter(_detail => _detail.key !== inbound_order_detail.key);
        new_order.order_details = new_order_details;
        setInboundOrders(new_orders);
    };

    const first_columns = [
        {
            title: '序号', dataIndex: 'key', key: 'key', align: 'center', width: "80px", fixed: 'left',
            sorter: {
                compare: (a: IHCInboundOrder, b: IHCInboundOrder) => a.key - b.key,
            }
        },
        // { title: 'WMS单号', dataIndex: 'order_code', key: 'order_code', align: 'center', width: "150px", fixed: 'left' },
        {
            title: '订单号', dataIndex: 'external_order_code', key: 'external_order_code', align: 'center', width: "160px", fixed: 'left',
            sorter: {
                compare: (a: IHCInboundOrder, b: IHCInboundOrder) => a.external_order_code.localeCompare(b.external_order_code),
            }
        },
        // { title: '关联单号1', dataIndex: 'related_code1', key: 'related_code1', align: 'center', width: "160px", },
        // { title: '关联单号2', dataIndex: 'related_code2', key: 'related_code2', align: 'center', width: "150px", },
        {
            title: '订单状态', dataIndex: 'order_status', key: 'order_status', align: 'center', width: "105px",
            render: (value: string) => { return em_order_status[`${value}`]; }
        },
        // { title: '订单类型', dataIndex: 'order_type_code', key: 'order_type_code', align: 'center', width: "100px", },
        { title: '订单数量', dataIndex: 'order_qty', key: 'order_qty', align: 'center', width: "90px", },
        { title: '已完成数量', dataIndex: 'order_finished_qty', key: 'order_finished_qty', align: 'center', width: "110px", },
        { title: '已分配数量', dataIndex: 'order_allocated_qty', key: 'order_allocated_qty', align: 'center', width: "110px", },
        {
            title: '本次分配数量', dataIndex: 'order_cur_allocate_qty', key: 'order_cur_allocate_qty', align: 'center', width: "120px"
        },
        {
            title: '指定料箱和货位', dataIndex: 'allocate_box_code', key: 'allocate_box_code', align: 'center', width: "210px", editable: false,
            render: (value: any, record: IHCInboundOrder, index: number) => {
                return record.order_status in ["0", "1", "2", "3"] ? <Cascader
                    id={record.order_code}
                    key={record.order_code}
                    className="search_text"
                    options={box_options}
                    placeholder="[料箱号]_[货位号]"
                    showSearch={{ filter: onOptionFilter }}
                    onChange={(_box_codes) => { onOrderBoxOptionChange(_box_codes, record); }}
                    onSearch={(_box_code) => { onOrderBoxOptionSearch(_box_code, record); }}
                    style={{ width: "185px" }}
                /> : <span>-</span>;
            }
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
            width: "300px",
            fixed: 'right',
            render: (_: any, record: IHCInboundOrder, index: number) =>
                inbound_orders.length >= 1 ? (
                    <div>
                        <Popconfirm title="确定手工整单分配料箱吗？" onConfirm={() => onManualAllocateOrder(record)}>
                            <Button type='primary' icon={<BorderOuterOutlined />}>手工分配整单料箱</Button>
                        </Popconfirm>
                        <Popconfirm title="确定关闭吗?" onConfirm={() => handleOrderClose(record)}>
                            <Button icon={<CloseCircleOutlined />} style={{ marginLeft: "5px" }} type='primary' danger>关闭</Button>
                        </Popconfirm>
                        <Popconfirm title="确定手工分配明细料箱吗？" onConfirm={() => onManualAllocateOrderDetails(record)}>
                            <Button type='primary' icon={<BorderInnerOutlined />} style={{ marginTop: "5px" }}>手工分配明细料箱</Button>
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
            onCell: (record: IHCInboundOrder) => ({
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
        {
            title: '订单状态', dataIndex: 'order_status', key: 'order_status', align: 'center', width: '105px',
            render: (value: string) => { return em_order_status[`${value}`]; }
        },
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
            title: '本次分配数量', dataIndex: 'order_cur_allocate_qty', key: 'order_cur_allocate_qty', align: 'center', width: "120px",
            render: (value: any, record: IHCInboundOrderDetail, index: number) => { return record.order_status in ["0", "1", "2", "3"] ? <InputNumber precision={2} value={value}></InputNumber> : <span>0</span>; }
        },
        {
            title: '指定料箱和货位', dataIndex: 'allocate_box_code', key: 'allocate_box_code', align: 'center', width: "210px", editable: false,
            render: (value: any, record: IHCInboundOrderDetail, index: number) => {
                return record.order_status in ["0", "1", "2", "3"] ? <Cascader
                    id={record.order_code}
                    key={record.order_code}
                    className="search_text"
                    options={box_options}
                    placeholder="[料箱号]_[货位号]"
                    showSearch={{ filter: onOptionFilter }}
                    onChange={(_box_codes) => { onOrderDetailBoxOptionChange(_box_codes, record); }}
                    onSearch={(_box_code) => { onOrderDetailBoxOptionSearch(_box_code, record); }}
                    style={{ width: "180px" }}
                /> : <span>-</span>;
            }
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
            render: (_: any, record: IHCInboundOrderDetail, index: number) =>
                inbound_orders.length >= 1 ? (
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
            onCell: (record: IHCInboundOrderDetail) => ({
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
            columns={second_columns_final as ColumnsType<IHCInboundOrderDetail>}
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
                    <h2 style={{ paddingLeft: "20px" }}>入库单分配</h2>
                </Col>
                <Col span={7}></Col>
                <Col span={5}>
                    <Button type="primary" icon={<FormOutlined />} onClick={() => { window.location.href = "/workbench/order/inbound/quick_add" }}>手工创建入库单</Button>
                    <Button type="primary" icon={<RollbackOutlined />} style={{ marginTop: "20px", marginLeft: "10px" }} onClick={() => { window.location.href = "/workbench" }}>返回主页</Button>
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
                    <Popconfirm title="确定分配吗?" onConfirm={() => onAutoAllocateList()}>
                        <Button type="primary" icon={<CheckCircleOutlined />} style={{ marginLeft: "20px" }}>确认自动分配料箱</Button>
                    </Popconfirm>
                </div>
            </div>
            <Table
                className="hc_panel virtual-table"
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                columns={first_columns_final as ColumnsType<IHCInboundOrder>}
                expandable={{ expandedRowRender }}
                dataSource={inbound_orders}
                scroll={{ x: 960, y: 600 }}
            />
        </div>
    );
};



export default App;