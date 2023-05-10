import { useEffect, useState } from "react"
import { Button, Input, Modal, Select, Table, message } from "antd";

import api from "src/utils/api"
import utils from "src/utils/Index";
import ItemDetail from "./ItemDetail";
import { IHCItem } from "src/interfaces/interface";
import { ItemStatus } from "src/types/enum";
import { DEFAULT_PAGE_NO, DEFAULT_PAGE_SIZE } from "src/types/Constants";


export default function BasicItem() {
    const [timestamp, setTimestamp] = useState<number>(0)
    const [itemList, setItemList] = useState<IHCItem[]>([])
    const [showDetailModal, setShowDetailModal] = useState<boolean>(false)
    const [curBeingModifedItem, setCurBeingModifedItem] = useState<IHCItem>({} as IHCItem)
    const [total, setTotal] = useState<number>(0)
    const [pageSize, setPageSize] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [text, setText] = useState<string>(new URLSearchParams(window.location.search).get("itemCode") || "")
    const [itemStatus, setItemStatus] = useState<ItemStatus[]>([])
    const statusOptions = [
        { label: "禁用", value: ItemStatus.DISABLED },
        { label: "启用", value: ItemStatus.ENABLED },
        { label: "忽略", value: ItemStatus.IGNORED },
    ];

    useEffect(() => {
        getItemList();
    }, [text, itemStatus, currentPage, pageSize, timestamp]);

    async function getItemList() {
        const result = await api.ItemListGet(text, itemStatus, currentPage || DEFAULT_PAGE_NO, pageSize || DEFAULT_PAGE_SIZE);
        if (!result || result.result_code !== 0) {
            message.error(`获取物品列表失败！error_msg: ${result.result_msg}`);
            return;
        }

        setTotal(result.data.total_count)
        setItemList(result.data.data_list);

        if (result.data.page_size !== pageSize) { setPageSize(result.data.page_size); }
        if (result.data.page_no !== currentPage) { setCurrentPage(result.data.page_no); }
    }

    async function updateItemDetail() {
        const result = await api.ItemUpdate(curBeingModifedItem);
        if (!result || result.result_code !== 0) {
            message.error(`更新物品数据失败！error_msg: ${result.result_msg}`);
            return;
        }

        setTimestamp(Date.now);
    }

    const handlePaginationChange = (page: number, pageSize?: number) => {
        setCurrentPage(page);
        if (pageSize) {
            setPageSize(pageSize);
        }
    };

    const handleModify = (value: unknown, record: IHCItem, index: number) => {
        setCurBeingModifedItem(record)
        setShowDetailModal(true);
    };

    const handleModifyConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
        const new_list = itemList.map((_item) => {
            if (_item.item_code === curBeingModifedItem.item_code) { return curBeingModifedItem; }
            return _item;
        });
        setItemList(new_list);
        setShowDetailModal(false);
        updateItemDetail();
    };

    const handleModifyCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        setShowDetailModal(false);
    };

    const handleViewInventoryItem = (value: unknown, record: IHCItem, index: number) => {
        localStorage.setItem("openKeys", JSON.stringify(["/console/inventory"]));
        localStorage.setItem("selectedKeys", JSON.stringify(["/console/inventory/items"]));
        window.location.href = `/console/inventory/items?itemCode=${record.item_code}`
    };

    return <>
        <div style={{ marginBottom: 10, marginLeft: 10 }}>
            <label>物品属性：</label>
            <Input
                placeholder="请输入物品码/名称/别名/扩展码/货号等"
                style={{ width: 200, margin: 10 }}
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <label>物品状态：</label>
            <Select
                mode="multiple"
                style={{ width: 200, marginRight: 16 }}
                placeholder="请选择物品状态"
                options={statusOptions}
                value={itemStatus}
                onChange={(value) => { setItemStatus(value) }}
            />
        </div>
        <div style={{ width: '85vw', height: '90vh' }}>
            <Table<IHCItem>
                sticky
                scroll={{ x: '100%', y: '100%' }}
                dataSource={itemList}
                columns={[
                    // { title: 'key', dataIndex: 'key', key: 'key', },
                    { title: '货码', dataIndex: 'item_code', key: 'item_code', fixed: 'left', width: '120px', },
                    { title: '名称', dataIndex: 'item_name', key: 'item_name', fixed: 'left', width: '120px', },
                    {
                        title: '状态', dataIndex: 'item_status', key: 'item_status', width: '120px', render: (value, record, index) => {
                            return Object.keys(ItemStatus)[Object.values(ItemStatus).indexOf(value)]
                        }
                    },
                    { title: '别名', dataIndex: 'item_alias_name', key: 'item_alias_name', width: '120px', },
                    { title: '扩展码1', dataIndex: 'item_extend_code1', key: 'item_extend_code1', width: '120px', },
                    { title: '扩展码2', dataIndex: 'item_extend_code2', key: 'item_extend_code2', width: '120px', },
                    { title: '长度(mm)', dataIndex: 'item_length', key: 'item_length', width: '120px', },
                    { title: '宽度(mm)', dataIndex: 'item_width', key: 'item_width', width: '120px', },
                    { title: '高度(mm)', dataIndex: 'item_height', key: 'item_height', width: '120px', },
                    { title: '体积(mm³)', dataIndex: 'item_volume', key: 'item_volume', width: '120px', },
                    { title: '重量(g)', dataIndex: 'item_weight', key: 'item_weight', width: '120px', },
                    { title: '包装单位', dataIndex: 'package_unit', key: 'package_unit', width: '120px', },
                    // { title: '供应商', dataIndex: 'supplier_as_lot', key: 'supplier_as_lot', width: '120px', },
                    { title: '满箱数量', dataIndex: 'max_qty_per_box', key: 'max_qty_per_box', width: '120px', },
                    { title: 'abc类型', dataIndex: 'abc_type', key: 'abc_type', width: '120px', },
                    // { title: '序列号', dataIndex: 'has_serial_no', key: 'has_serial_no', width: '120px', },
                    // { title: '属性1', dataIndex: 'lot_prop1_as_lot', key: 'lot_prop1_as_lot', width: '120px', },
                    // { title: '属性2', dataIndex: 'lot_prop2_as_lot', key: 'lot_prop2_as_lot', width: '120px', },
                    // { title: '属性3', dataIndex: 'lot_prop3_as_lot', key: 'lot_prop3_as_lot', width: '120px', },
                    // { title: '统计周期', dataIndex: 'count_cycle_days', key: 'count_cycle_days', width: '120px', },
                    // { title: '生产时期', dataIndex: 'production_date_as_lot', key: 'production_date_as_lot', width: '120px', },
                    // { title: '混合生产日期', dataIndex: 'production_date_mixed_days', key: 'production_date_mixed_days', width: '120px', },
                    // { title: '存储策略', dataIndex: 'storage_strategy', key: 'storage_strategy', width: '120px', },
                    // { title: '混合存储天数', dataIndex: 'storage_date_mixed_days', key: 'storage_date_mixed_days', width: '120px', },
                    // { title: '存储日期', dataIndex: 'storage_date_as_lot', key: 'storage_date_as_lot', width: '120px', },
                    // { title: '分拣策略', dataIndex: 'pick_strategy', key: 'pick_strategy', width: '120px', },
                    // { title: '有效混合天数', dataIndex: 'expiry_date_mixed_days', key: 'expiry_date_mixed_days', width: '120px', },
                    // { title: '有效日期', dataIndex: 'expiry_date_as_lot', key: 'expiry_date_as_lot', width: '120px', },
                    // { title: '创建来源', dataIndex: 'created_from', key: 'created_from', width: '120px', },
                    { title: '创建时间', dataIndex: 'created_time', key: 'created_time', width: '120px', },
                    // { title: '创建人员', dataIndex: 'created_operator', key: 'created_operator', width: '120px', },
                    { title: '更新时间', dataIndex: 'last_updated_time', key: 'last_updated_time', width: '120px', },
                    // { title: '更新人员', dataIndex: 'last_updated_operator', key: 'last_updated_operator', width: '120px', },
                    {
                        title: '操作', dataIndex: 'oper', key: 'oper', width: '120px', fixed: 'right', render: (value, record, index) => {
                            return <>
                                <Button onClick={(e) => { handleModify(value, record, index) }}>修改</Button>
                                <Button onClick={(e) => { handleViewInventoryItem(value, record, index) }} style={{ marginTop: 5 }}>查看物品库存</Button>
                            </>
                        }
                    },
                ]}
                rowKey={(record) => utils.generateElementKey()}
                pagination={{
                    total,
                    pageSize,
                    current: currentPage,
                    onChange: handlePaginationChange,
                    showTotal: (total, range) => `共 ${total} 条记录`,
                    style: { float: 'left' },
                }}
            />
        </div>
        <div>
            <Modal
                title="修改物品属性"
                open={showDetailModal}
                onOk={handleModifyConfirm}
                onCancel={handleModifyCancel}
                okButtonProps={{ style: { backgroundColor: '#f50' } }}
            >
                <ItemDetail item={curBeingModifedItem} setItem={(item: IHCItem) => { setCurBeingModifedItem(item); }} />
            </Modal>
        </div>
    </>
}