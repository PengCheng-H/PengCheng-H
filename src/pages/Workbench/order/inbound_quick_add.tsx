import { EditableProTable } from '@ant-design/pro-components';
import React, { useRef, useState } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PlusOutlined, RollbackOutlined } from '@ant-design/icons';
import { Button, Cascader, Col, InputNumber, Modal, Row, message } from 'antd';

import api from '../../../utils/api';
import hc_config from "../../../config/index.json";
import { DefaultOptionType } from 'antd/es/cascader';
import { IHCItem, IHCSupplier } from '../../../types/interface';
import '../index.css';

type DataSourceType = {
    id: React.Key;
    item_code?: string;
    quantity?: number;
};

export default () => {
    const actionRef = useRef<ActionType>();
    const [item_code, setItemCode] = useState<string>("");
    const [item_quantity, setItemQuantity] = useState<number>(0);
    const [item_options, setItemOptions] = useState<DefaultOptionType[]>([]);
    const [items, setItems] = useState<IHCItem[]>([]);
    const [supplier_code, setSupplierCode] = useState<string>("");
    const [supplier_options, setSupplierOptions] = useState<DefaultOptionType[]>([]);
    const [suppliers, setSuppliers] = useState<IHCSupplier[]>([])
    const [is_show_item_modal, setIsShowItemModal] = useState<boolean>(false);
    const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
    const [dataSource, setDataSource] = useState<readonly DataSourceType[]>([]);
    const columns: ProColumns<DataSourceType>[] = [
        {
            title: '物品编码',
            dataIndex: 'item_code',
            valueType: 'text',
            align: 'center',
            formItemProps: () => {
                return {
                    rules: [{ required: true, message: '此项为必填项' }],
                };
            },
        },
        {
            title: '物料货号',
            dataIndex: 'item_extend_code1',
            valueType: 'text',
            align: 'center',
        },
        {
            title: '物品名称',
            dataIndex: 'item_name',
            valueType: 'text',
            align: 'center',
        },
        {
            title: '物品数量',
            dataIndex: 'quantity',
            align: 'center',
            formItemProps: () => {
                return {
                    rules: [{ required: true, message: '此项为必填项' }],
                };
            },
        },
        {
            title: '操作',
            valueType: 'option',
            width: "90px",
            align: 'center',
            render: (text, record, _, action) => [
                <a
                    key="editable"
                    style={{ textAlign: 'center' }}
                    onClick={() => {
                        action?.startEditable?.(record.id);
                    }}
                >
                    编辑
                </a>,
                <a
                    key="delete"
                    onClick={() => {
                        setDataSource(dataSource.filter((item) => item.id !== record.id));
                    }}
                >
                    删除
                </a>,
            ],
        },
    ];

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

    async function createOrder() {
        const item_details: { item_code: string, quantity: number }[] = [];
        dataSource.forEach(item => {
            item_details.push({
                item_code: item.item_code || "",
                quantity: item.quantity as number || 0
            });
        });

        if (!item_details.length) {
            message.warning("请输入物品信息后再试。");
            return;
        }

        const result = await api.OrderInboundQuickAdd(
            supplier_code,
            item_details
        );

        if (!result || result.result_code != 0) {
            message.error(`快速建单失败！err_msg: ${result.result_msg}。`);
            return;
        }

        message.success(`快速建单成功. 订单编号: ${result.data.order_code}`);
        setDataSource([]);
        setSupplierCode("");
    }

    function onAddItem() {
        setIsShowItemModal(true);
    }

    function onAddItemCancel() {
        clearItemParams();
        setIsShowItemModal(false);
    }

    async function onAddItemOk() {
        if (!item_code || !item_quantity) {
            message.error("物品编码或物品数量不能为空！");
            return;
        }

        const newItem = {
            id: (Math.random() * 1000000).toFixed(0),
            item_code: item_code,
            item_name:"",
            item_extend_code1: "",
            quantity: item_quantity
        };

        const get_item_result = await api.ItemDetailGet(item_code);
        if (get_item_result && get_item_result.result_code === 0) {
            const _item: IHCItem = get_item_result.data;
            newItem.item_name = _item.item_name;
            newItem.item_extend_code1 = _item.item_extend_code1;
        }

        setDataSource([...dataSource, newItem]);
        clearItemParams();
        setIsShowItemModal(false);
    }

    function clearItemParams() {
        setItemCode("");
        setItemQuantity(0);
        setItemOptions([]);
        setItems([]);
    }

    return <div>
        <Row className='hc_panel' style={{ backgroundColor: "#eee" }}>
            <Col span={8}>
                <span style={{ fontSize: "18px", fontWeight: "bolder" }}>创建入库订单</span>
            </Col>
            <Col span={10}>
                <label style={{ marginLeft: "30px" }}>供应商编码：</label>
                <Cascader
                    className="search_text"
                    options={supplier_options}
                    placeholder="请输入供应商码、供应商名称（选填）"
                    showSearch={{ filter: onOptionFilter }}
                    onChange={onSupplierOptionChange}
                    onSearch={onSupplierOptionSearch}
                    style={{ width: "350px" }}
                />
            </Col>
            <Col span={1}></Col>
            <Col span={5}>
                <Button
                    type="primary"
                    onClick={onAddItem}
                    icon={<PlusOutlined />}
                >
                    添加物品
                </Button>
                <Button type="primary" icon={<RollbackOutlined />} style={{ marginLeft: "5px" }} onClick={() => { window.location.href = "/workbench/order/inbound" }}>返回上一层</Button>
            </Col>
        </Row>
        <div className='hc_panel'>
            <EditableProTable
                rowKey="id"
                scroll={{ x: 960 }}
                value={dataSource}
                columns={columns}
                actionRef={actionRef}
                maxLength={100}
                onChange={setDataSource}
                recordCreatorProps={false}
                editable={{
                    editableKeys,
                    onSave: async () => { },
                    onValuesChange: async (_record, _dataSource) => { },
                    onChange: setEditableRowKeys,
                    actionRender: (row, config, dom) => [dom.save, dom.cancel],
                }}
            />
        </div>
        <Row>
            <Col span={22}></Col>
            <Col span={2}><Button type='primary' onClick={createOrder}>创建订单</Button></Col>
        </Row>

        <Modal title="录入物品信息" open={is_show_item_modal} onOk={onAddItemOk} onCancel={onAddItemCancel}>
            <Row style={{ marginTop: "30px" }}>
                <label>*物品编码：</label>
                <Cascader
                    className="search_text"
                    options={item_options}
                    placeholder="请输入物品码/物品名称/物品别名（必填）"
                    showSearch={{ filter: onOptionFilter }}
                    onChange={onItemOptionChange}
                    onSearch={onItemOptionSearch}
                    style={{ width: "330px" }}
                />
            </Row>
            <Row style={{ marginTop: "10px" }}>
                <label>*物品数量：</label>
                <InputNumber precision={2} value={item_quantity} min={0} max={999999999} onChange={(value: number | null) => { setItemQuantity(value || 0) }} />
            </Row>
        </Modal>
    </div>;
};