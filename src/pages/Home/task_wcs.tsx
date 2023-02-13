import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Component, ReactNode } from "react";


// interface WcsTask

// const task_headers:

const task_list = [
    {
        "location_code": "C1-8-10-A",
        "wcs_task_code": "TC20230213000001",
        "box_code": "B1-8-10-A",
        "last_updated_time": "2023-02-13T10:55:55",
        "last_updated_operator": "",
        "pick_station_code": "",
        "task_type": "0",
        "wcs_task_status": "0",
        "created_time": "2023-02-13T10:55:55",
        "created_operator": ""
    }
];

export default class Task extends Component {
    render(): ReactNode {
        return <div>
            <hr />
            <h1>任务面板</h1>

            {/* <Table columns={outbound_order_headers} dataSource={outbound_order_list} pagination={{ pageSize: 2 }} scroll={{ x: 1200, y: 200 }} /> */}
        </div>;
    }
}