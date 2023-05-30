import { useEffect, useState } from "react"
import { Button, Input, Modal, Select, Table, message } from "antd";

import api from "src/utils/api"
import utils from "src/utils/Index";
import LocationDetail from "./LocationDetail";
import { IHCLocation } from "src/interfaces/interface";
import { LocationStatus } from "src/types/enum";
import { DEFAULT_PAGE_NO, DEFAULT_PAGE_SIZE, em_location_status } from "src/types/Constants";

export default function BasicLocation() {
    const [timestamp, setTimestamp] = useState<number>(0)
    const [locationList, setLocationList] = useState<IHCLocation[]>([])
    const [showDetailModal, setShowDetailModal] = useState<boolean>(false)
    const [curBeingModifedLocation, setCurBeingModifedLocation] = useState<IHCLocation>({} as IHCLocation)
    const [total, setTotal] = useState<number>(0)
    const [pageSize, setPageSize] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [text, setText] = useState<string>("")
    const [locationStatus, setLocationStatus] = useState<LocationStatus[]>([])
    const statusOptions = [
        { label: em_location_status[LocationStatus.DISABLED], value: LocationStatus.DISABLED },
        { label: em_location_status[LocationStatus.ENABLED], value: LocationStatus.ENABLED },
    ];

    useEffect(() => {
        getLocationList();
    }, [text, locationStatus, currentPage, pageSize, timestamp]);

    async function getLocationList() {
        const result = await api.LocationListGet(text, locationStatus, currentPage || DEFAULT_PAGE_NO, pageSize || DEFAULT_PAGE_SIZE);
        if (!result || result.result_code !== 0) {
            message.error(`获取货位列表失败！error_msg: ${result.result_msg}`);
            return;
        }

        setTotal(result.data.total_count)
        setLocationList(result.data.data_list);

        if (result.data.page_size !== pageSize) { setPageSize(result.data.page_size); }
        if (result.data.page_no !== currentPage) { setCurrentPage(result.data.page_no); }
    }

    async function updateLocationDetail() {
        const result = await api.LocationUpdate(curBeingModifedLocation);
        if (!result || result.result_code !== 0) {
            message.error(`更新货位数据失败！error_msg: ${result.result_msg}`);
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

    const handleModify = (_value: unknown, record: IHCLocation, _index: number) => {
        setCurBeingModifedLocation(record)
        setShowDetailModal(true);
    };

    const handleModifyConfirm = (_e: React.MouseEvent<HTMLButtonElement>) => {
        const new_list = locationList.map((_location) => {
            if (_location.location_code === curBeingModifedLocation.location_code) { return curBeingModifedLocation; }
            return _location;
        });
        setLocationList(new_list);
        setShowDetailModal(false);
        updateLocationDetail();
    };

    const handleModifyCancel = (_e: React.MouseEvent<HTMLButtonElement>) => {
        setShowDetailModal(false);
    };


    return <>
        <div style={{ marginBottom: 10, marginLeft: 10 }}>
            <label>货位属性：</label>
            <Input
                placeholder="请输入货位码"
                style={{ width: 200, margin: 10 }}
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <label>货位状态：</label>
            <Select
                mode="multiple"
                style={{ width: 200, marginRight: 16 }}
                placeholder="请选择货位状态"
                options={statusOptions}
                value={locationStatus}
                onChange={(value) => { setLocationStatus(value) }}
            />
        </div>
        <div style={{ width: '85vw', height: '90vh' }}>
            <Table<IHCLocation>
                sticky
                scroll={{ x: '100%', y: '100%' }}
                dataSource={locationList}
                columns={[
                    // { title: 'key', dataIndex: 'key', key: 'key', },
                    { title: '货位码', dataIndex: 'location_code', key: 'location_code', align: 'center', width: '120px', fixed: 'left' },
                    {
                        title: '状态', dataIndex: 'location_status', key: 'location_status', align: 'center', width: '120px', render: (value, _record, _index) => {
                            return em_location_status[value];
                        }
                    },
                    { title: '排号', dataIndex: 'location_row', key: 'location_row', align: 'center', width: '120px', },
                    { title: '列号', dataIndex: 'location_column', key: 'location_column', align: 'center', width: '120px', },
                    { title: '层号', dataIndex: 'location_layer', key: 'location_layer', align: 'center', width: '120px', },
                    { title: '深度', dataIndex: 'location_depth', key: 'location_depth', align: 'center', width: '120px', },
                    { title: 'abc类型', dataIndex: 'abc_type', key: 'abc_type', align: 'center', width: '120px', },
                    { title: '创建时间', dataIndex: 'created_time', key: 'created_time', align: 'center', width: '120px', },
                    // { title: '创建人员', dataIndex: 'created_operator', key: 'created_operator', align: 'center', width: '120px', },
                    { title: '最近更新时间', dataIndex: 'last_updated_time', key: 'last_updated_time', align: 'center', width: '120px', },
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
                title="修改货位属性"
                open={showDetailModal}
                onOk={handleModifyConfirm}
                onCancel={handleModifyCancel}
                okButtonProps={{ style: { backgroundColor: '#f50' } }}
                width={"60%"}
            >
                <LocationDetail location={curBeingModifedLocation} setLocation={(location: IHCLocation) => { setCurBeingModifedLocation(location); }} />
            </Modal>
        </div>
    </>
}