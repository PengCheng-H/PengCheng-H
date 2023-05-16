import { Table } from "antd";
// import { useState } from "react";
import { IHCPickStation } from "src/interfaces/interface";
import utils from "src/utils/Index";

export default function PickStation() {
    // const [pickStationList, setPickStationList] = useState<IHCPickStation[]>([])

    return <>
        <div style={{ width: '95vw', height: '90vh', margin: 'auto', overflow: 'auto' }}>
            <Table<IHCPickStation>
                sticky
                scroll={{ x: '100%', y: '100%' }}
                rowKey={(_record) => utils.generateElementKey()}
                columns={[
                    { title: 'pick_station_code', dataIndex: 'pick_station_code', key: 'pick_station_code', },
                    { title: 'pick_station_status', dataIndex: 'pick_station_status', key: 'pick_station_status', },
                    { title: 'box_code', dataIndex: 'box_code', key: 'box_code', },
                    { title: 'wcs_task_code', dataIndex: 'wcs_task_code', key: 'wcs_task_code', },
                    { title: 'created_time', dataIndex: 'created_time', key: 'created_time', },
                    { title: 'created_operator', dataIndex: 'created_operator', key: 'created_operator', },
                    { title: 'last_updated_time', dataIndex: 'last_updated_time', key: 'last_updated_time', },
                    { title: 'last_updated_operator', dataIndex: 'last_updated_operator', key: 'last_updated_operator', },
                ]}
            />
        </div>
    </>
}