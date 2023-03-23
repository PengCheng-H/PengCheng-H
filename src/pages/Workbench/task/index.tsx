import React from "react";
import { ColumnsType } from 'antd/es/table';
import { SearchOutlined, FireOutlined } from '@ant-design/icons';
import { Button, Select, SelectProps, Table, message } from 'antd';

import api from '../../../utils/api';
import utils from '../../../utils';
import * as IHttpRes from "../../../types/http_response.interface";
import { IHCWcsTask } from '../../../types/interface';
import { em_wcs_task_status, em_wcs_task_types } from "../../../types/enum";
import { IHCGetWorkbenchWcsTasksRes } from '../../../types/http_response.interface';
import './index.css';


export default class HCWorkbenchTask extends React.Component {
    state: { wcs_task_statuses: number[], task_list: IHCWcsTask[] } = { "wcs_task_statuses": [], task_list: [] };

    render(): React.ReactNode {
        return <div className="hc_panel hc_task_panel">
            <Select
                mode="multiple"
                allowClear
                style={{ width: '30%', border: "1px dashed", fontSize: "20px" }}
                placeholder="请选择任务状态(可多选,非必选)"
                defaultValue={[]}
                onChange={this.onSelTaskStatesChange.bind(this)}
                options={options}
                className='task_statuses'
            />
            <Button type='primary' icon={<SearchOutlined />} onClick={this.onBtnSearchClick.bind(this)} className='search_task'>搜索任务</Button>
            <Button type='primary' icon={<FireOutlined />} onClick={this.onBtnActivateClick.bind(this)} className='activate_task'>激活任务</Button>
            <Table columns={wcs_task_headers} dataSource={this.state.task_list} pagination={{ pageSize: 10 }} className='table' />
        </div>
    }

    onSelTaskStatesChange(value: number[], option: any) {
        this.setState({ "wcs_task_statuses": value });;
    }

    componentDidMount(): void {
        this.onBtnSearchClick()
    }

    async onBtnSearchClick() {
        const result: IHCGetWorkbenchWcsTasksRes = await api.GetWorkbenchWcsTasks(this.state.wcs_task_statuses);

        if (!result || result.result_code != 0) {
            message.error(`查询失败，${result.result_msg}。`)
            return;
        }

        result.data.data_list = result.data.data_list || [];

        // 对象没有key这个字段，ts会报错，所以要给个key字段
        if (result.data && result.data.data_list && result.data.data_list.length) {
            result.data.data_list.map((wcs_task: IHCWcsTask) => {
                wcs_task.key = wcs_task.wcs_task_code
            });
        }

        this.setState({ task_list: result.data.data_list || [] });
        message.success(`查询成功，共找到 ${result.data.data_list.length} 个任务。`)
    }

    async onBtnActivateClick() {
        const activate_result: IHttpRes.IHCResponse = await api.WorkbenchStartWork();
        if (activate_result && activate_result.result_code == 0) {
            message.success("激活任务成功。");
        } else {
            message.error("激活任务失败！");
        }
    }
}



const options: SelectProps['options'] = [
    { label: "已创建", value: 0 },
    { label: "已激活", value: 1 },
    { label: "料箱到达拣货台", value: 2 },
    { label: "料箱离开拣货台", value: 3 },
    { label: "已完成", value: 4 },
    { label: "已终止", value: 5 },
];

const wcs_task_headers: ColumnsType<IHCWcsTask> = [
    {
        key: 'wcs_task_code',
        title: 'WCS任务号',
        dataIndex: 'wcs_task_code',
        width: "180px",
        fixed: 'left',
        sorter: (a, b) => a.wcs_task_code.localeCompare(b.wcs_task_code, "en"),
    },
    {
        key: 'task_type',
        title: '任务类型',
        dataIndex: 'task_type',
        width: "110px",
        sorter: (a, b) => a.task_type.localeCompare(b.task_type, "en"),
        render: (value) => em_wcs_task_types[`${value}`]
    },
    {
        key: 'wcs_task_status',
        title: '任务状态',
        dataIndex: 'wcs_task_status',
        width: "110px",
        sorter: (a, b) => a.wcs_task_status.localeCompare(b.wcs_task_status, "en"),
        render: (value) => em_wcs_task_status[`${value}`]
    },
    {
        key: 'box_code',
        title: '料箱编号',
        dataIndex: 'box_code',
        width: "120px",
        sorter: (a, b) => a.box_code.localeCompare(b.box_code, "en"),
    },
    {
        key: 'location_code',
        title: '货位编号',
        dataIndex: 'location_code',
        width: "120px",
        sorter: (a, b) => a.location_code.localeCompare(b.location_code, "en"),
    },
    {
        key: 'pick_station_code',
        title: '拣货台编号',
        dataIndex: 'pick_station_code',
        width: "120px",
        sorter: (a, b) => a.pick_station_code.localeCompare(b.pick_station_code, "en"),
    },
    {
        key: 'created_time',
        title: '创建时间',
        dataIndex: 'created_time',
        width: "180px",
        sorter: (a, b) => a.created_time.localeCompare(b.created_time, "en"),
        render: utils.FormatTime
    },
    {
        key: 'created_operator',
        title: '创建人员',
        dataIndex: 'created_operator',
        width: "120px",
        sorter: (a, b) => a.created_operator.localeCompare(b.created_operator, "en"),
    },
    {
        key: 'last_updated_time',
        title: '更新时间',
        dataIndex: 'last_updated_time',
        width: "180px",
        sorter: (a, b) => a.last_updated_time.localeCompare(b.last_updated_time, "en"),
        render: utils.FormatTime
    },
    {
        key: 'last_updated_operator',
        title: '更新人员',
        dataIndex: 'last_updated_operator',
        width: "120px",
        sorter: (a, b) => a.last_updated_operator.localeCompare(b.last_updated_operator, "en"),
    },
    // {
    //     key: 'operations',
    //     title: '操作',
    //     dataIndex: 'operations',
    //     width: "120px",
    //     fixed: 'right',
    // },
];
