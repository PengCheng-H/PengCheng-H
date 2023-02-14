import { ColumnsType } from 'antd/es/table';
import { SearchOutlined } from '@ant-design/icons';
import { Component, ReactNode } from "react";
import { Button, Select, SelectProps, Table } from 'antd';

import utils from '../../../utils';
import wcs_task_list from '../../../mocks/wcs_task.mock';
import { IHCWcsTask } from '../../../types/interface';



wcs_task_list.map((value, index, arr) => {
    value.key = value.key | index + Date.now();
});

const wcs_task_headers: ColumnsType<IHCWcsTask> = [
    {
        key: 'wcs_task_code',
        title: 'WCS任务号',
        dataIndex: 'wcs_task_code',
        width: "160px",
        fixed: 'left',
        sorter: (a, b) => a.wcs_task_code.localeCompare(b.wcs_task_code, "en"),
    },
    {
        key: 'task_type',
        title: '任务类型',
        dataIndex: 'task_type',
        width: "120px",
        sorter: (a, b) => a.task_type.localeCompare(b.task_type, "en"),
    },
    {
        key: 'wcs_task_status',
        title: '任务状态',
        dataIndex: 'wcs_task_status',
        width: "120px",
        sorter: (a, b) => a.wcs_task_status.localeCompare(b.wcs_task_status, "en"),
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
        render: utils.formatTime
    },
    {
        key: 'created_operator',
        title: '创建操作员',
        dataIndex: 'created_operator',
        width: "150px",
        sorter: (a, b) => a.created_operator.localeCompare(b.created_operator, "en"),
    },
    {
        key: 'last_updated_time',
        title: '更新时间',
        dataIndex: 'last_updated_time',
        width: "180px",
        sorter: (a, b) => a.last_updated_time.localeCompare(b.last_updated_time, "en"),
        render: utils.formatTime
    },
    {
        key: 'last_updated_operator',
        title: '更新操作员',
        dataIndex: 'last_updated_operator',
        width: "150px",
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

export default class HCWcsTask extends Component {
    state: { curWcsTaskStates: number[] } = { "curWcsTaskStates": [] };

    render(): ReactNode {
        const options: SelectProps['options'] = [
            { label: "已创建", value: 0 },
            { label: "已激活", value: 1 },
            { label: "已完成", value: 2 },
            { label: "异常", value: 3 },
        ];

        return <div>
            <Select
                mode="multiple"
                allowClear
                style={{ width: '30%' }}
                placeholder="请选择任务状态(可多选)"
                defaultValue={[]}
                onChange={this.onSelTaskStatesChange.bind(this)}
                options={options}
                className='search_input'
            />
            <Button id='btnSearchWcsTask' type='primary' icon={<SearchOutlined />} onClick={this.onBtnSearchClick.bind(this)} className='search_button'>搜索任务</Button>
            <Table columns={wcs_task_headers} dataSource={wcs_task_list} pagination={{ pageSize: 10 }} scroll={{ x: 1250, y: 200 }} className='table' />;
        </div>
    }

    onSelTaskStatesChange(value: number[], option: any) {
        this.setState({ "curWcsTaskStates": value });;
    }

    onBtnSearchClick() {
        console.log("on button click: ", this.state.curWcsTaskStates);
    }
}