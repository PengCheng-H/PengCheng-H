import { useEffect, useState } from "react";
import { Button, Modal, Table, message } from "antd";

import api from "src/utils/api";
import PickStationDetail from "./Detail";
import { IHCPickStation } from "src/interfaces/interface";

export default function PickStation() {
    const [showDetail, setShowDetail] = useState<boolean>(false)
    const [curPickStation, setCurPickStation] = useState<IHCPickStation>()
    const [pickStationList, setPickStationList] = useState<IHCPickStation[]>([])

    useEffect(() => {
        GetPickStationList()
    }, [])

    const GetPickStationList = async () => {
        const result = await api.PickStationGetAll();
        if (!result || result.result_code !== 0) {
            message.error(`获取拣货台数据失败！${result.result_msg}`);
            return
        }

        setPickStationList(result.data)
    }

    const ShowDetail = (_record: IHCPickStation) => {
        setCurPickStation(_record)
        setShowDetail(true)
    }

    return <>
        <div style={{ width: '95vw', height: '90vh', margin: 'auto', overflow: 'auto' }}>
            <Table<IHCPickStation>
                sticky
                scroll={{ x: '100%', y: '100%' }}
                rowKey={(_record) => _record.pick_station_code}
                dataSource={pickStationList}
                columns={[
                    { title: '拣货台编号', dataIndex: 'pick_station_code', key: 'pick_station_code', },
                    { title: '拣货台状态', dataIndex: 'pick_station_status', key: 'pick_station_status', },
                    { title: '料箱号', dataIndex: 'box_code', key: 'box_code', },
                    { title: 'WCS任务编号', dataIndex: 'wcs_task_code', key: 'wcs_task_code', },
                    // { title: '创建时间', dataIndex: 'created_time', key: 'created_time', },
                    // { title: '创建人员', dataIndex: 'created_operator', key: 'created_operator', },
                    // { title: '更新时间', dataIndex: 'last_updated_time', key: 'last_updated_time', },
                    // { title: '更新人员', dataIndex: 'last_updated_operator', key: 'last_updated_operator', },
                    {
                        title: '操作', dataIndex: 'operation', key: 'operation', render: (_value, _record: IHCPickStation, _index) => {
                            return <>
                                <Button type="primary" onClick={() => { ShowDetail(_record) }}>查看拣货详情</Button>
                            </>
                        }
                    },
                ]}
            />
        </div>
        <Modal
            title="拣货详情"
            open={showDetail}
            onOk={() => setShowDetail(false)}
            onCancel={() => setShowDetail(false)}
        >
            <PickStationDetail curPickStation={curPickStation} />
        </Modal>
    </>
}