import { useEffect, useRef, useState } from "react";
import { Button, Cascader, InputNumber, Modal, Popconfirm, Row, Table, message } from "antd"

import api from "src/utils/api";
import utils from "src/utils/Index";
import { DefaultOptionType } from "antd/es/select";
import { IHCItem, IHCOutboundOrderQuickAddItem } from "src/interfaces/interface"
import { DeleteOutlined } from "@ant-design/icons";

interface IHCNewItem extends IHCItem {
    id: number;
    quantity: number;
    supplier_code: string;
}

interface OutboundQuickAddProps {
    setQuickAddOutboundItems: (quickAddOutboundItems: IHCOutboundOrderQuickAddItem[]) => void;
}

export default function OutboundQuickAdd(props: OutboundQuickAddProps) {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [newItemList, setNewItemList] = useState<IHCNewItem[]>([]);
    const [itemCode, setItemCode] = useState<string>(new URLSearchParams(window.location.search).get("itemCode") || "");
    const [itemQuantity, setItemQuantity] = useState<number>(0);
    const [itemOptions, setItemOptions] = useState<DefaultOptionType[]>([]);
    const [supplierCode, setSupplierCode] = useState<string>(new URLSearchParams(window.location.search).get("supplierCode") || "");
    const [supplierOptions, setSupplierOptions] = useState<DefaultOptionType[]>([]);
    const supplierCodeRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (newItemList.length > 0) {
            const _new_outbound_items: IHCOutboundOrderQuickAddItem[] = [];
            newItemList.map((value: IHCNewItem, index: number, array: IHCNewItem[]) => {
                const _new_outbound_item: IHCOutboundOrderQuickAddItem = {
                    item_code: value.item_code,
                    supplier_code: value.supplier_code,
                    quantity: value.quantity
                }
                _new_outbound_items.push(_new_outbound_item);
            });

            props.setQuickAddOutboundItems(_new_outbound_items);
        }
    }, [newItemList]);

    const onAddItemOk = async () => {
        if (!itemCode || !itemQuantity) {
            message.error("物品编码或物品数量不能为空！");
            return;
        }

        const get_item_result = await api.ItemDetailGet(itemCode);
        if (get_item_result && get_item_result.result_code !== 0) {
            message.error("获取物品基础数据失败！");
            return;
        }

        const itemId = newItemList.length > 0 ? newItemList[newItemList.length - 1].id + 1 : 1;
        const newItem: IHCNewItem = { ...get_item_result.data, id: itemId, quantity: itemQuantity, supplier_code: supplierCode };
        setNewItemList([...newItemList, newItem]);
        clearAddItemModalParams();
    }

    const onAddItemCancel = () => {
        clearAddItemModalParams();
    }

    const clearAddItemModalParams = () => {
        setShowModal(false);
        // setItemCode("");
        // setItemQuantity(0);  
        // setItemOptions([]);
        // setSupplierCode("");
        // setSupplierOptions([]);
    }

    const onItemOptionChange = (item_codes: string[] | any) => {
        const item_code = item_codes ? item_codes[0] : "";
        setItemCode(item_code);
        supplierCodeRef.current?.focus()
    }

    const onItemOptionSearch = async (_itemCode: string) => {
        if (!_itemCode) {
            setItemOptions([]);
            return;
        }

        const get_items_result = await api.ItemListGet(_itemCode);
        if (get_items_result && get_items_result.result_code === 0) {
            const item_options: DefaultOptionType[] = [];
            for (const item of get_items_result.data.data_list) {
                const item_label = `[${item.item_code}]-[${item.item_extend_code1}]-[${item.item_name}]`;
                item_options.push({
                    label: item_label,
                    value: item.item_code,
                });
            }

            setItemOptions(item_options);
        }
    }

    const onSupplierOptionChange = (supplier_codes: string[] | any) => {
        const supplier_code = supplier_codes ? supplier_codes[0] : "";
        setSupplierCode(supplier_code);
    }

    const onSupplierOptionSearch = async (_supplierCode: string) => {
        if (!_supplierCode) {
            setSupplierOptions([]);
            return;
        }

        const get_suppliers_result = await api.SupplierListGet(_supplierCode);
        if (get_suppliers_result && get_suppliers_result.result_code === 0) {
            const supplier_options: DefaultOptionType[] = [];
            for (const supplier of get_suppliers_result.data.data_list) {
                const supplier_label = `[${supplier.supplier_code}]-[${supplier.supplier_name}]`;
                supplier_options.push({
                    label: supplier_label,
                    value: supplier.supplier_code,
                });
            }

            setSupplierOptions(supplier_options);
        }
    }

    const onRemoveNewItem = (new_item: IHCNewItem) => {
        setNewItemList(newItemList.filter((item) => item.id !== new_item.id));
    }

    return <>
        <Button type="primary" onClick={() => { setShowModal(true); }} style={{ float: 'right' }}>添加物品</Button>
        <Table<IHCNewItem>
            rowKey={(record: IHCNewItem) => { return utils.generateElementKey() }}
            dataSource={newItemList}
            columns={[
                {
                    title: "序号",
                    dataIndex: "id",
                    // valueType: "text",
                    align: "center",
                },
                {
                    title: "物品编码",
                    dataIndex: "item_code",
                    // valueType: "text",
                    align: "center",
                    width: '100px',
                    // formItemProps: () => {
                    //     return {
                    //         rules: [{ required: true, message: "此项为必填项" }],
                    //     };
                    // },
                },
                {
                    title: "扩展编码",
                    dataIndex: "item_extend_code1",
                    // valueType: "text",
                    align: "center",
                    width: '120px',
                },
                {
                    title: "物品名称",
                    dataIndex: "item_name",
                    // valueType: "text",
                    align: "center",
                    width: '100px',
                },
                {
                    title: "物品数量",
                    dataIndex: "quantity",
                    align: "center",
                    width: '100px',
                    // formItemProps: () => {
                    //     return {
                    //         rules: [{ required: true, message: "此项为必填项" }],
                    //     };
                    // },
                },
                {
                    title: "供应商码",
                    dataIndex: "supplier_code",
                    // valueType: "text",
                    align: "center",
                    width: '100px',
                },
                {
                    title: "操作",
                    // valueType: "option",
                    align: "center",
                    width: '120px',
                    render: (value: any, record: IHCNewItem, index: number) => {
                        return <>
                            <Popconfirm title="确定移除吗?" onConfirm={() => { onRemoveNewItem(record); }}>
                                <Button type='default' icon={<DeleteOutlined />} style={{ marginTop: "5px" }} danger>移除</Button>
                            </Popconfirm>
                        </>
                    },
                },
            ]}
        />
        <Modal
            title="添加物品信息"
            open={showModal}
            onOk={onAddItemOk}
            onCancel={onAddItemCancel}
            okText="添加物品"
            cancelText="取消添加"
        >
            <Row style={{ marginTop: "30px" }}>
                <label>*物品编码：</label>
                <Cascader
                    className="search_text"
                    options={itemOptions}
                    placeholder="请输入物品码/物品名称/物品别名（必填）"
                    showSearch={{ filter: utils.onOptionFilter }}
                    onChange={onItemOptionChange}
                    onSearch={onItemOptionSearch}
                    style={{ width: "330px" }}
                />
            </Row>
            <Row style={{ marginTop: "10px" }}>
                <label>*物品数量：</label>
                <InputNumber
                    ref={supplierCodeRef}
                    precision={0}
                    value={itemQuantity}
                    min={0}
                    max={999999}
                    onChange={(value: number | null) => { setItemQuantity(value || 0); }}
                />
            </Row>
            <Row style={{ marginTop: "10px" }}>
                <label>供应商编码：</label>
                <Cascader
                    className="search_text"
                    options={supplierOptions}
                    placeholder="请输入供应商码、供应商名称（选填）"
                    showSearch={{ filter: utils.onOptionFilter }}
                    onChange={onSupplierOptionChange}
                    onSearch={onSupplierOptionSearch}
                    style={{ width: "330px" }}
                />
            </Row>
        </Modal>
    </>
}