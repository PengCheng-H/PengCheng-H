import React from 'react';
import { LaptopOutlined } from '@ant-design/icons';
import { MenuProps, message } from 'antd';
import { Layout, Menu, theme } from 'antd';

const { Sider } = Layout;

const items_nav_left: MenuProps['items'] = [
    {
        key: '/console/home',
        icon: React.createElement(LaptopOutlined),
        label: '首页',
    },
    {
        key: '/console/basic',
        icon: React.createElement(LaptopOutlined),
        label: '基础数据',
        children: [
            { key: '/console/basic/', icon: React.createElement(LaptopOutlined), label: '基础看板', },
            { key: '/console/basic/boxes', icon: React.createElement(LaptopOutlined), label: '料箱管理', },
            { key: '/console/basic/cells', icon: React.createElement(LaptopOutlined), label: '货位管理', },
            { key: '/console/basic/items', icon: React.createElement(LaptopOutlined), label: '物品管理', },
            { key: '/console/basic/suppliers', icon: React.createElement(LaptopOutlined), label: '供应商管理', },
        ]
    },
    {
        key: '/console/inventory',
        icon: React.createElement(LaptopOutlined),
        label: '库存管理',
        children: [
            { key: '/console/inventory/', icon: React.createElement(LaptopOutlined), label: '库存看板', },
            { key: '/console/inventory/boxes', icon: React.createElement(LaptopOutlined), label: '料箱库存表', },
            { key: '/console/inventory/items', icon: React.createElement(LaptopOutlined), label: '物品库存表', },
            { key: '/console/inventory/summary', icon: React.createElement(LaptopOutlined), label: '库存汇总表', },
        ]
    },
    {
        key: '/console/tasks',
        icon: React.createElement(LaptopOutlined),
        label: '任务管理',
        children: [
            { key: '/console/tasks/', icon: React.createElement(LaptopOutlined), label: '任务看板', },
            { key: '/console/tasks/wcs', icon: React.createElement(LaptopOutlined), label: 'WCS任务表', },
            { key: '/console/tasks/wms', icon: React.createElement(LaptopOutlined), label: 'WMS任务表', },
        ]
    },
    {
        key: '/console/users',
        icon: React.createElement(LaptopOutlined),
        label: '用户管理',
    },
];

function onClick(info: any) {
    message.info(info.key);
    console.log(window.location.href, info);
}

export default function SideNavigation() {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Sider width={200} style={{ background: colorBgContainer }}>
            <Menu
                mode="inline"
                defaultSelectedKeys={['/console/home']}
                defaultOpenKeys={['/console/home']}
                style={{ height: '100%', borderRight: 0 }}
                items={items_nav_left}
                onClick={onClick}
            />
        </Sider>
    );
}