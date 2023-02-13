import { Tabs, TabsProps } from 'antd';
import { Component, ReactNode } from 'react';

import HCWcsTask from "./wcs_task";
import HCInboundOrder from "./inbound_order";
import HCOutboundOrder from "./outbound_order";

import './index.css';



export default class Home extends Component {
    render(): ReactNode {
        const items: TabsProps['items'] = [
            {
                key: '1',
                label: `入库`,
                children: <HCInboundOrder />,
            },
            {
                key: '2',
                label: `出库`,
                children: <HCOutboundOrder />,
            }
        ];
        return (
            <div className='content'>
                <div className='row'>
                    <h3>订单面板</h3>
                    <hr />
                    <Tabs defaultActiveKey="1" type="card" items={items} />
                </div>
                <div className='row'>
                    <h3>任务面板</h3>
                    <hr />
                    <HCWcsTask />
                </div>
            </div>
        );
    }
};
