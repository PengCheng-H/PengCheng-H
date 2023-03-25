import React from "react";
import { Button, message } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { SearchOutlined, PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons';

import api from "../../../utils/api";
import * as IHttpRes from "../../../types/http_response.interface";
import WorkConfirmModal from "./work_confirm_modal";
import { IHCPickStation } from "../../../types/interface";
import { em_pick_station_status } from "../../../types/enum";

export default class HCPickStation extends React.Component {
    state: { pick_station_list: IHCPickStation[] } = { pick_station_list: [] }

    render(): React.ReactNode {
        return <div className="hc_panel">
            <Button type="primary" icon={<SearchOutlined />} onClick={this.GetPickStations.bind(this)} style={{ margin: "5px" }}>更新拣货台状态</Button>
            <Button type="primary" icon={<PlayCircleOutlined />} onClick={this.StartWork.bind(this)} style={{ margin: "5px" }}>开始作业</Button>
            <Button type="primary" icon={<PauseCircleOutlined />} onClick={this.StopWork.bind(this)} style={{ margin: "5px" }}>停止作业</Button>
            <Table columns={pick_station_headers} dataSource={this.state.pick_station_list} pagination={{ pageSize: 10 }} className='table' />
        </div>;
    }

    componentDidMount(): void {
        this.GetPickStations();
    }

    async GetPickStations() {
        const result: IHttpRes.IHCGetPickStationsRes = await api.PickStationGetAll();
        if (!result || result.result_code !== 0) {
            message.error(`获取拣货台信息失败，${result.result_msg}。`)
            return;
        }

        result.data.map((pick_station: IHCPickStation) => {
            pick_station.key = pick_station.pick_station_code;
        });

        this.setState({
            pick_station_list: result.data
        }, () => {
            message.success(`获取拣货台信息成功，共获取 ${result.data.length} 个拣货台数据。`);
        });
    }

    async StartWork() {
        const start_result: IHttpRes.IHCResponse = await api.WorkbenchStartWork();
        if (!start_result || start_result.result_code !== 0) {
            message.error(`开始作业失败！result_code: ${start_result.result_code} err_msg: ${start_result.result_msg}`);
            return;
        }
        message.success("开始作业成功。");
        setTimeout(() => { window.location.reload() }, 1000 * 3);
    }

    async StopWork() {
        const stop_result: IHttpRes.IHCResponse = await api.WorkbenchStopWork();
        if (!stop_result || stop_result.result_code !== 0) {
            message.error(`停止作业失败！result_code: ${stop_result.result_code} err_msg: ${stop_result.result_msg}`);
            return;
        }
        message.success("停止作业成功。");
        setTimeout(() => { window.location.reload() }, 1000 * 3);
    }
}



const pick_station_headers: ColumnsType<IHCPickStation> = [
    {
        key: 'pick_station_code',
        title: '拣货台编号',
        dataIndex: 'pick_station_code',
        fixed: 'left',
        align: "center",
        sorter: (a, b) => a.pick_station_code.localeCompare(b.pick_station_code, "en"),
    },
    {
        key: 'pick_station_status',
        title: '拣货台当前状态',
        dataIndex: 'pick_station_status',
        align: "center",
        sorter: (a, b) => a.pick_station_status.localeCompare(b.pick_station_status, "en"),
        render: (value) => em_pick_station_status[`${value}`]
    },
    {
        key: 'box_code',
        title: '当前占用料箱',
        dataIndex: 'box_code',
        align: "center",
        sorter: (a, b) => a.box_code.localeCompare(b.box_code, "en"),
        render: (value) => value || "无"
    },
    {
        key: 'wcs_task_code',
        title: '当前WCS任务',
        dataIndex: 'wcs_task_code',
        align: "center",
        sorter: (a, b) => a.wcs_task_code.localeCompare(b.wcs_task_code, "en"),
        render: (value) => value || "无"
    },
    // {
    //     key: 'last_updated_time',
    //     title: '更新时间',
    //     dataIndex: 'last_updated_time',
    //     width: "100px",
    //     sorter: (a, b) => a.last_updated_time.localeCompare(b.last_updated_time, "en"),
    // },
    // {
    //     key: 'last_updated_operator',
    //     title: '操作人员',
    //     dataIndex: 'last_updated_operator',
    //     width: "100px",
    //     sorter: (a, b) => a.last_updated_operator.localeCompare(b.last_updated_operator, "en"),
    // },
    {
        key: 'operations',
        title: '操作',
        dataIndex: 'operations',
        // width: "120px",
        fixed: 'right',
        align: "center",
        render: (value, record, index) => {
            return <div>
                <WorkConfirmModal pick_station={record} />
            </div>
        }
    },
];