import { useEffect, useState } from "react"
import { Button, Input, Modal, Select, Table, message } from "antd";

import api from "src/utils/api"
import utils from "src/utils/Index";
import SupplierDetail from "./SupplierDetail";
import { IHCSupplier } from "src/interfaces/interface";
import { SupplierStatus } from "src/types/enum";
import { DEFAULT_PAGE_NO, DEFAULT_PAGE_SIZE, em_supplier_status } from "src/types/Constants";

export default function BasicSupplier() {
    const [timestamp, setTimestamp] = useState<number>(0)
    const [supplierList, setSupplierList] = useState<IHCSupplier[]>([])
    const [showDetailModal, setShowDetailModal] = useState<boolean>(false)
    const [curBeingModifedSupplier, setCurBeingModifedSupplier] = useState<IHCSupplier>({} as IHCSupplier)
    const [total, setTotal] = useState<number>(0)
    const [pageSize, setPageSize] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [text, setText] = useState<string>("")
    const [supplierStatus, setSupplierStatus] = useState<SupplierStatus[]>([])
    const statusOptions = [
        { label: em_supplier_status[SupplierStatus.DISABLED], value: SupplierStatus.DISABLED },
        { label: em_supplier_status[SupplierStatus.ENABLED], value: SupplierStatus.ENABLED },
    ];

    useEffect(() => {
        getSupplierList();
    }, [text, supplierStatus, currentPage, pageSize, timestamp]);

    async function getSupplierList() {
        const result = await api.SupplierListGet(text, supplierStatus, currentPage || DEFAULT_PAGE_NO, pageSize || DEFAULT_PAGE_SIZE);
        if (!result || result.result_code !== 0) {
            message.error(`获取物品列表失败！error_msg: ${result.result_msg}`);
            return;
        }

        setTotal(result.data.total_count)
        setSupplierList(result.data.data_list);

        if (result.data.page_size !== pageSize) { setPageSize(result.data.page_size); }
        if (result.data.page_no !== currentPage) { setCurrentPage(result.data.page_no); }
    }

    async function updateSupplierDetail() {
        const result = await api.SupplierUpdate(curBeingModifedSupplier);
        if (!result || result.result_code !== 0) {
            message.error(`更新供应商数据失败！error_msg: ${result.result_msg}`);
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

    const handleModify = (_value: unknown, record: IHCSupplier, _index: number) => {
        setCurBeingModifedSupplier(record)
        setShowDetailModal(true);
    };

    const handleModifyConfirm = (_e: React.MouseEvent<HTMLButtonElement>) => {
        const new_list = supplierList.map((_supplier) => {
            if (_supplier.supplier_code === curBeingModifedSupplier.supplier_code) { return curBeingModifedSupplier; }
            return _supplier;
        });
        setSupplierList(new_list);
        setShowDetailModal(false);
        updateSupplierDetail();
    };

    const handleModifyCancel = (_e: React.MouseEvent<HTMLButtonElement>) => {
        setShowDetailModal(false);
    };

    return <>
        <div style={{ marginBottom: 10, marginLeft: 10 }}>
            <label>供应商属性：</label>
            <Input
                placeholder="请输入供应商编号/名称/别名等"
                style={{ width: 200, margin: 10 }}
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <label>供应商状态：</label>
            <Select
                mode="multiple"
                style={{ width: 200, marginRight: 16 }}
                placeholder="请选择供应商状态"
                options={statusOptions}
                value={supplierStatus}
                onChange={(value) => { setSupplierStatus(value) }}
            />
        </div>
        <div style={{ width: '85vw', height: '90vh' }}>
            <Table<IHCSupplier>
                sticky
                scroll={{ x: '100%', y: '100%' }}
                dataSource={supplierList}
                columns={[
                    // { title: 'key', dataIndex: 'key', key: 'key', },
                    { title: '编号', dataIndex: 'supplier_code', key: 'supplier_code', align: 'center', width: '120px', fixed: 'left', },
                    { title: '名称', dataIndex: 'supplier_name', key: 'supplier_name', align: 'center', width: '120px', fixed: 'left', },
                    {
                        title: '状态', dataIndex: 'supplier_status', key: 'supplier_status', align: 'center', width: '120px', render: (value: any, _record: IHCSupplier, _index: number) => {
                            return em_supplier_status[value];
                        }
                    },
                    { title: '别名', dataIndex: 'supplier_alias_name', key: 'supplier_alias_name', align: 'center', width: '120px', },
                    { title: '创建时间', dataIndex: 'created_time', key: 'created_time', align: 'center', width: '120px', },
                    // { title: '创建来源', dataIndex: 'created_from', key: 'created_from', align: 'center', width: '120px', },
                    // { title: '创建人员', dataIndex: 'created_operator', key: 'created_operator', align: 'center', width: '120px', },
                    // { title: '最近更新时间', dataIndex: 'last_updated_time', key: 'last_updated_time', align: 'center', width: '120px', },
                    // { title: '最近更新人员', dataIndex: 'last_updated_operator', key: 'last_updated_operator', align: 'center', width: '120px', },
                    {
                        title: '操作', dataIndex: 'oper', key: 'oper', align: 'center', width: '120px', fixed: 'right', render: (value, record, index) => {
                            return <Button type='primary' onClick={(_e) => { handleModify(value, record, index) }}>修改</Button>
                        }
                    },
                ]}
                rowKey={(_record) => utils.generateElementKey()}
                pagination={{
                    total,
                    pageSize,
                    current: currentPage,
                    onChange: handlePaginationChange,
                    showTotal: (total, _range) => `共 ${total} 条记录`,
                    style: { float: 'left' },
                }}
            />
        </div>
        <div>
            <Modal
                title="修改供应商属性"
                open={showDetailModal}
                onOk={handleModifyConfirm}
                onCancel={handleModifyCancel}
                okButtonProps={{ style: { backgroundColor: '#f50' } }}
                width={"60%"}
            >
                <SupplierDetail supplier={curBeingModifedSupplier} setSupplier={(supplier: IHCSupplier) => { setCurBeingModifedSupplier(supplier); }} />
            </Modal>
        </div>
    </>
}