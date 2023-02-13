import { Row } from 'antd';
import { Tabs } from 'antd';
import { TabsProps } from 'antd';
import { Component, ReactNode } from 'react';

import Task from "./task_wcs";
import OrderInbound from "./order_inbound";
import HCOrderOutbound from "./order_outbound";
import './index.css';



export default class Home extends Component {
    render(): ReactNode {
        const items: TabsProps['items'] = [
            {
                key: '1',
                label: `分配入库订单`,
                children: <OrderInbound />,
            },
            {
                key: '2',
                label: `分配出库订单`,
                children: <HCOrderOutbound />,
            }
        ];
        return (
            <div className='content'>
                <Row className='row table'>
                    <Tabs defaultActiveKey="1" items={items} />
                </Row>
                <Row className='row'>
                    <Task />
                </Row>
            </div>
        );
    }
};
