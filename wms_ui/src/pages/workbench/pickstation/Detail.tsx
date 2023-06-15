import { useEffect, useState } from "react";

import api from "src/utils/api";
import { Table, message } from "antd";

import { IHCBoxDetail, IHCPickStation, IHCTaskDetail } from "src/interfaces/interface"

interface PickStationProps {
    curPickStation: IHCPickStation | undefined;
}

export default function PickStationDetail(props: PickStationProps) {
    const [timestamp, setTimestamp] = useState<string>();
    const [taskDetail, setTaskDetail] = useState<IHCTaskDetail>();

    useEffect(() => {
        GetTaskDetail()
    }, [timestamp])

    const GetTaskDetail = async () => {
        const result = await api.WorbenchTaskDetailView(props.curPickStation?.box_code as string)
        if (!result || result.result_code !== 0) {
            message.error(`获取拣货详情失败！ ${result.result_msg}`);
            return
        }

        setTaskDetail(result.data);
    }

    return <>
        <Table<IHCBoxDetail>
            sticky
            scroll={{ x: '100%', y: '100%' }}
            rowKey={(_record) => _record.box_region_id}
            dataSource={taskDetail?.region_task_details}
            columns={[
                { title: '料箱区号', dataIndex: 'box_region_id', key: 'box_region_id' },
                { title: '物品编号', dataIndex: 'item_code', key: 'item_code' },
                {
                    title: '物品名称', dataIndex: 'item_name', key: 'item_name', render: (_value, _record: IHCBoxDetail, _index) => {
                        return _record.item_detail?.item_name
                    }
                },
                {
                    title: '物品扩展码1', dataIndex: 'item_extend_code1', key: 'item_extend_code1', render: (_value, _record: IHCBoxDetail, _index) => {
                        return _record.item_detail?.item_extend_code1
                    }
                },
                {
                    title: '物品扩展码2', dataIndex: 'item_extend_code2', key: 'item_extend_code2', render: (_value, _record: IHCBoxDetail, _index) => {
                        return _record.item_detail?.item_extend_code2
                    }
                },
                { title: '', dataIndex: 'quantity', key: 'quantity' },
            ]}
        />
    </>
}