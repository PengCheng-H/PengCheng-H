import { Table, message } from "antd";
import { useEffect, useState } from "react"

import api from "src/utils/api"
import { IHCItem } from "src/interfaces/interface";
import { DEFAULT_PAGE_NO, DEFAULT_PAGE_SIZE } from "src/types/Constants";

export default function BasicItem() {
    const [itemList, setItemList] = useState<IHCItem[]>([])
    const [total, setTotal] = useState<number>(0)
    const [pageSize, setPageSize] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(0)

    useEffect(() => {
        fetchData();
    }, [currentPage, pageSize]);

    async function fetchData() {
        const result = await api.ItemListGet("", [], currentPage || DEFAULT_PAGE_NO, pageSize || DEFAULT_PAGE_SIZE);
        if (!result || result.result_code !== 0) {
            message.error(`获取物品列表失败！error_msg: ${result.result_msg}`);
            return;
        }

        setTotal(result.data.total_count)
        setItemList(result.data.data_list);

        if (result.data.page_size !== pageSize) { setPageSize(result.data.page_size); }
        if (result.data.page_no !== currentPage) { setCurrentPage(result.data.page_no); }
        console.log();
    }

    const handlePaginationChange = (page: number, pageSize?: number) => {
        setCurrentPage(page);
        if (pageSize) {
            setPageSize(pageSize);
        }
    };

    return <>
        <div style={{ width: '1200px', height: '100%', overflow: 'auto' }}>
            <Table<IHCItem>
                scroll={{ x: '100%' }}
                // scroll={{ y: '100%' }}
                // scroll={{ x: 8000, y: 400, scrollToFirstRowOnChange: true }}
                dataSource={itemList}
                columns={[
                    // { title: 'key', dataIndex: 'key', key: 'key', },
                    { title: 'item_code', dataIndex: 'item_code', key: 'item_code', fixed: 'left', width: '120px', },
                    { title: 'item_name', dataIndex: 'item_name', key: 'item_name', fixed: 'left', width: '120px', },
                    { title: 'item_status', dataIndex: 'item_status', key: 'item_status', width: '120px', },
                    { title: 'item_alias_name', dataIndex: 'item_alias_name', key: 'item_alias_name', width: '120px', },
                    { title: 'item_extend_code1', dataIndex: 'item_extend_code1', key: 'item_extend_code1', width: '120px', },
                    { title: 'item_extend_code2', dataIndex: 'item_extend_code2', key: 'item_extend_code2', width: '120px', },
                    { title: 'item_external_code1', dataIndex: 'item_external_code1', key: 'item_external_code1', width: '120px', },
                    { title: 'item_external_code2', dataIndex: 'item_external_code2', key: 'item_external_code2', width: '120px', },
                    { title: 'item_length', dataIndex: 'item_length', key: 'item_length', width: '120px', },
                    { title: 'item_width', dataIndex: 'item_width', key: 'item_width', width: '120px', },
                    { title: 'item_height', dataIndex: 'item_height', key: 'item_height', width: '120px', },
                    { title: 'item_weight', dataIndex: 'item_weight', key: 'item_weight', width: '120px', },
                    { title: 'item_volume', dataIndex: 'item_volume', key: 'item_volume', width: '120px', },
                    { title: 'package_unit', dataIndex: 'package_unit', key: 'package_unit', width: '120px', },
                    { title: 'abc_type', dataIndex: 'abc_type', key: 'abc_type', width: '120px', },
                    { title: 'max_qty_per_box', dataIndex: 'max_qty_per_box', key: 'max_qty_per_box', width: '120px', },
                    { title: 'lot_prop1_as_lot', dataIndex: 'lot_prop1_as_lot', key: 'lot_prop1_as_lot', width: '120px', },
                    { title: 'lot_prop2_as_lot', dataIndex: 'lot_prop2_as_lot', key: 'lot_prop2_as_lot', width: '120px', },
                    { title: 'lot_prop3_as_lot', dataIndex: 'lot_prop3_as_lot', key: 'lot_prop3_as_lot', width: '120px', },
                    { title: 'supplier_as_lot', dataIndex: 'supplier_as_lot', key: 'supplier_as_lot', width: '120px', },
                    { title: 'has_serial_no', dataIndex: 'has_serial_no', key: 'has_serial_no', width: '120px', },
                    { title: 'count_cycle_days', dataIndex: 'count_cycle_days', key: 'count_cycle_days', width: '120px', },
                    { title: 'production_date_as_lot', dataIndex: 'production_date_as_lot', key: 'production_date_as_lot', width: '120px', },
                    { title: 'production_date_mixed_days', dataIndex: 'production_date_mixed_days', key: 'production_date_mixed_days', width: '120px', },
                    { title: 'storage_strategy', dataIndex: 'storage_strategy', key: 'storage_strategy', width: '120px', },
                    { title: 'storage_date_mixed_days', dataIndex: 'storage_date_mixed_days', key: 'storage_date_mixed_days', width: '120px', },
                    { title: 'storage_date_as_lot', dataIndex: 'storage_date_as_lot', key: 'storage_date_as_lot', width: '120px', },
                    { title: 'pick_strategy', dataIndex: 'pick_strategy', key: 'pick_strategy', width: '120px', },
                    { title: 'expiry_date_mixed_days', dataIndex: 'expiry_date_mixed_days', key: 'expiry_date_mixed_days', width: '120px', },
                    { title: 'expiry_date_as_lot', dataIndex: 'expiry_date_as_lot', key: 'expiry_date_as_lot', width: '120px', },
                    { title: 'created_from', dataIndex: 'created_from', key: 'created_from', width: '120px', },
                    { title: 'created_operator', dataIndex: 'created_operator', key: 'created_operator', width: '120px', },
                    { title: 'created_time', dataIndex: 'created_time', key: 'created_time', width: '120px', },
                    { title: 'last_updated_operator', dataIndex: 'last_updated_operator', key: 'last_updated_operator', width: '120px', },
                    { title: 'last_updated_time', dataIndex: 'last_updated_time', key: 'last_updated_time', width: '120px', },
                    { title: 'oper', dataIndex: 'oper', key: 'oper', width: '120px', },
                ]}
                rowKey={(record) => record.item_code.toString()}
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