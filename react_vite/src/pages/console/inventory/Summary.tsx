import { useEffect, useState } from "react"
import { Button, Input, Table, message } from "antd";

import api from "src/utils/api"
import { IHCInventorySummary } from "src/interfaces/interface";
import { DEFAULT_PAGE_NO, DEFAULT_PAGE_SIZE } from "src/types/Constants";
import utils from "src/utils/Index";


export default function InventorySummary() {
    const [inventorySummaryList, setInventorySummaryList] = useState<IHCInventorySummary[]>([])
    const [total, setTotal] = useState<number>(0)
    const [pageSize, setPageSize] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [text, setText] = useState<string>(new URLSearchParams(window.location.search).get("itemCode") || "")

    useEffect(() => {
        getInventorySummaryList();
    }, [text, currentPage, pageSize]);


    async function getInventorySummaryList() {
        const result = await api.InventorySummaryListGet(text, currentPage || DEFAULT_PAGE_NO, pageSize || DEFAULT_PAGE_SIZE);
        if (!result || result.result_code !== 0) {
            message.error(`获取汇总库存列表失败！error_msg: ${result.result_msg}`);
            return;
        }

        setTotal(result.data.total_count);
        setInventorySummaryList(result.data.data_list);

        if (result.data.page_size !== pageSize) { setPageSize(result.data.page_size); }
        if (result.data.page_no !== currentPage) { setCurrentPage(result.data.page_no); }
    }

    const handlePaginationChange = (page: number, pageSize?: number) => {
        setCurrentPage(page);
        if (pageSize) {
            setPageSize(pageSize);
        }
    };

    const handleViewInventoryBox = (value: unknown, record: IHCInventorySummary, index: number) => {
        localStorage.setItem("openKeys", JSON.stringify(["/console/inventory"]));
        localStorage.setItem("selectedKeys", JSON.stringify(["/console/inventory/boxes"]));
        window.location.href = `/console/inventory/boxes?text=${record.item_code}`
    };

    const handleViewInventoryItem = (value: unknown, record: IHCInventorySummary, index: number) => {
        localStorage.setItem("openKeys", JSON.stringify(["/console/inventory"]));
        localStorage.setItem("selectedKeys", JSON.stringify(["/console/inventory/items"]));
        window.location.href = `/console/inventory/items?text=${record.item_code}`
    };

    return <>
        <div style={{ marginBottom: 10, marginLeft: 10 }}>
            <label>物品码：</label>
            <Input
                placeholder="请输入物品码"
                style={{ width: 200, margin: 10 }}
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
        </div>
        <div style={{ width: '85vw', height: '90vh' }}>
            <Table<IHCInventorySummary>
                sticky
                scroll={{ x: '100%', y: '100%' }}
                dataSource={inventorySummaryList}
                columns={[
                    // { title: 'key', dataIndex: 'key', key: 'key', },
                    { title: '库存编号', dataIndex: 'inventory_summary_id', key: 'inventory_summary_id', width: '120px', fixed: 'left', },
                    { title: '物品码', dataIndex: 'item_code', key: 'item_code', width: '120px', fixed: 'left', },
                    { title: '库存数量', dataIndex: 'quantity', key: 'quantity', width: '120px', },
                    { title: '包装单位', dataIndex: 'package_unit', key: 'package_unit', width: '120px', },
                    { title: '已分配出库数量', dataIndex: 'pick_allocated_qty', key: 'pick_allocated_qty', width: '125px', },
                    { title: '已分配入库数量', dataIndex: 'storage_allocated_qty', key: 'storage_allocated_qty', width: '125px', },
                    { title: '创建时间', dataIndex: 'created_time', key: 'created_time', width: '120px', },
                    // { title: '创建人员', dataIndex: 'created_operator', key: 'created_operator', width: '120px', },
                    { title: '最近更新时间', dataIndex: 'last_updated_time', key: 'last_updated_time', width: '120px', },
                    // { title: '最近更新人员', dataIndex: 'last_updated_operator', key: 'last_updated_operator', width: '120px', },
                    {
                        title: '操作', dataIndex: 'oper', key: 'oper', width: '120px', fixed: 'right', render: (value, record, index) => {
                            return <>
                                <Button onClick={(e) => { handleViewInventoryBox(value, record, index) }}>查看料箱库存记录</Button>
                                <Button onClick={(e) => { handleViewInventoryItem(value, record, index) }} style={{ marginTop: 5 }}>查看物品库存记录</Button>
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
    </>
}