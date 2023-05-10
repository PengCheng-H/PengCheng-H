import { useEffect, useState } from "react"
import { Button, Input, Modal, Select, Table, message } from "antd";

import api from "src/utils/api"
import BoxDetail from "./BoxDetail";
import { IHCBox } from "src/interfaces/interface";
import { BoxStatus } from "src/types/enum";
import { DEFAULT_PAGE_NO, DEFAULT_PAGE_SIZE } from "src/types/Constants";


export default function BasicBox() {
    const [timestamp, setTimestamp] = useState<number>(0)
    const [boxList, setBoxList] = useState<IHCBox[]>([])
    const [showDetailModal, setShowDetailModal] = useState<boolean>(false)
    const [curBeingModifedBox, setCurBeingModifedBox] = useState<IHCBox>({} as IHCBox)
    const [total, setTotal] = useState<number>(0)
    const [pageSize, setPageSize] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [text, setText] = useState<string>(new URLSearchParams(window.location.search).get("boxCode") || "")
    const [boxStatus, setBoxStatus] = useState<BoxStatus[]>([])
    const statusOptions = [
        { label: "禁用", value: BoxStatus.DISABLED },
        { label: "启用", value: BoxStatus.ENABLED },
    ];

    useEffect(() => {
        getBoxList();
    }, [text, boxStatus, currentPage, pageSize, timestamp]);


    async function getBoxList() {
        const result = await api.BoxListGet(text, boxStatus, currentPage || DEFAULT_PAGE_NO, pageSize || DEFAULT_PAGE_SIZE);
        if (!result || result.result_code !== 0) {
            message.error(`获取料箱列表失败！error_msg: ${result.result_msg}`);
            return;
        }

        setTotal(result.data.total_count);
        setBoxList(result.data.data_list);

        if (result.data.page_size !== pageSize) { setPageSize(result.data.page_size); }
        if (result.data.page_no !== currentPage) { setCurrentPage(result.data.page_no); }
    }

    async function updateBoxDetail() {
        const result = await api.BoxUpdate(curBeingModifedBox);
        if (!result || result.result_code !== 0) {
            message.error(`更新料箱数据失败！error_msg: ${result.result_msg}`);
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

    const handleModify = (value: unknown, record: IHCBox, index: number) => {
        setCurBeingModifedBox(record)
        setShowDetailModal(true);
    };

    const handleModifyConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
        const new_list = boxList.map((_box) => {
            if (_box.box_code === curBeingModifedBox.box_code) { return curBeingModifedBox; }
            return _box;
        });
        setBoxList(new_list);
        setShowDetailModal(false);
        updateBoxDetail();
    };

    const handleModifyCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        setShowDetailModal(false);
    };

    const handleViewInventoryBox = (value: unknown, record: IHCBox, index: number) => {
        localStorage.setItem("openKeys", JSON.stringify(["/console/inventory"]));
        localStorage.setItem("selectedKeys", JSON.stringify(["/console/inventory/boxes"]));
        window.location.href = `/console/inventory/boxes?boxCode=${record.box_code}`
    };

    return <>
        <div style={{ marginBottom: 10, marginLeft: 10 }}>
            <label>料箱码：</label>
            <Input
                placeholder="请输入料箱码"
                style={{ width: 200, margin: 10 }}
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <label>料箱状态：</label>
            <Select
                mode="multiple"
                style={{ width: 200, marginRight: 16 }}
                placeholder="请选择料箱状态"
                options={statusOptions}
                value={boxStatus}
                onChange={(value) => { setBoxStatus(value) }}
            />
        </div>
        <div style={{ width: '85vw', height: '90vh' }}>
            <Table<IHCBox>
                sticky
                scroll={{ x: '100%', y: '100%' }}
                dataSource={boxList}
                columns={[
                    // { title: 'key', dataIndex: 'key', key: 'key', },
                    { title: '箱号', dataIndex: 'box_code', key: 'box_code', width: '120px', fixed: 'left', },
                    { title: '货位号', dataIndex: 'location_code', key: 'location_code', width: '120px', fixed: 'left', },
                    {
                        title: '状态', dataIndex: 'box_status', key: 'box_status', width: '120px', render: (value, record, index) => {
                            return Object.keys(BoxStatus)[Object.values(BoxStatus).indexOf(value)]
                        }
                    },
                    { title: '长度', dataIndex: 'box_length', key: 'box_length', width: '120px', },
                    { title: '宽度', dataIndex: 'box_width', key: 'box_width', width: '120px', },
                    { title: '高度', dataIndex: 'box_height', key: 'box_height', width: '120px', },
                    { title: '料箱分区数量', dataIndex: 'box_region_count', key: 'box_region_count', width: '120px', },
                    { title: '料箱额定数量', dataIndex: 'box_rated_capacity', key: 'box_rated_capacity', width: '120px', },
                    { title: '创建时间', dataIndex: 'created_time', key: 'created_time', width: '120px', },
                    // { title: '创建人员', dataIndex: 'created_operator', key: 'created_operator', width: '120px', },
                    { title: '最近更新时间', dataIndex: 'last_updated_time', key: 'last_updated_time', width: '120px', },
                    // { title: '最近更新人员', dataIndex: 'last_updated_operator', key: 'last_updated_operator', width: '120px', },
                    {
                        title: '操作', dataIndex: 'oper', key: 'oper', width: '120px', fixed: 'right', render: (value, record, index) => {
                            return <>
                                <Button onClick={(e) => { handleModify(value, record, index) }}>修改</Button>
                                <Button onClick={(e) => { handleViewInventoryBox(value, record, index) }} style={{ marginTop: 5 }}>查看料箱库存</Button>
                            </>

                        }
                    },
                ]}
                rowKey={(record) => record.box_code.toString()}
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
                title="修改料箱属性"
                open={showDetailModal}
                onOk={handleModifyConfirm}
                onCancel={handleModifyCancel}
                okButtonProps={{ style: { backgroundColor: '#f50' } }}
            >
                <BoxDetail box={curBeingModifedBox} setBox={(box: IHCBox) => { setCurBeingModifedBox(box); }} />
            </Modal>
        </div>
    </>
}