/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { LaptopOutlined } from '@ant-design/icons';
import { MenuProps } from 'antd';
import { Menu } from 'antd';
import config from 'src/config/Index';


const items_nav_left: MenuProps['items'] = [
    // {
    //     key: '/console',
    //     icon: React.createElement(LaptopOutlined),
    //     label: '首页',
    // },
    {
        key: '/console/basic',
        icon: React.createElement(LaptopOutlined),
        label: '基础数据',
        children: [
            // { key: '/console/basic/dashboard', icon: React.createElement(LaptopOutlined), label: '基础看板', },
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
            // { key: '/console/inventory/dashboard', icon: React.createElement(LaptopOutlined), label: '库存看板', },
            { key: '/console/inventory/boxes', icon: React.createElement(LaptopOutlined), label: '料箱库存表', },
            { key: '/console/inventory/items', icon: React.createElement(LaptopOutlined), label: '物品库存表', },
            { key: '/console/inventory/summary', icon: React.createElement(LaptopOutlined), label: '库存汇总表', },
        ]
    },
    // {
    //     key: '/console/tasks',
    //     icon: React.createElement(LaptopOutlined),
    //     label: '任务管理',
    //     children: [
    //         // { key: '/console/tasks/dashboard', icon: React.createElement(LaptopOutlined), label: '任务看板', },
    //         { key: '/console/tasks/wcs', icon: React.createElement(LaptopOutlined), label: 'WCS任务表', },
    //         { key: '/console/tasks/wms', icon: React.createElement(LaptopOutlined), label: 'WMS任务表', },
    //     ]
    // },
    // {
    //     key: '/console/users',
    //     icon: React.createElement(LaptopOutlined),
    //     label: '用户管理',
    // },
];

const SideNavigation: React.FC<any> = () => {
    const _defaultSelectedKeys = JSON.parse(localStorage.getItem("selectedKeys") || '["/console"]')
    const _defaultOpenKeys = JSON.parse(localStorage.getItem("openKeys") || '["/console"]')
    const [selectedKeys, setSelectedKeys] = useState<string[]>(_defaultSelectedKeys);
    const [openKeys, setOpenKeys] = useState<string[]>(_defaultOpenKeys);

    const handleMenuSelect = ({ selectedKeys }: { selectedKeys: string[] }) => {
        setSelectedKeys(selectedKeys);
        localStorage.setItem("selectedKeys", JSON.stringify(selectedKeys));
    };

    const handleMenuOpen = (openKeys: string[]) => {
        setOpenKeys(openKeys);
        localStorage.setItem("openKeys", JSON.stringify(openKeys));
    };

    const handleOnClick = (info: any) => {
        window.location.href = info.key
    }

    return (
        <>
            <div style={{ height: "30px", background: "rgba(255, 255, 255, .2)", margin: "16px" }} >
                <div className="verion-info" style={{ color: 'white', textAlign: "center", lineHeight: '30px' }}>
                    <p>当前版本: {config.version}</p>
                </div>
            </div>
            <Menu
                theme='dark'
                mode="inline"
                defaultSelectedKeys={selectedKeys}
                defaultOpenKeys={openKeys}
                onSelect={handleMenuSelect}
                onOpenChange={handleMenuOpen}
                onClick={handleOnClick}
                items={items_nav_left}
            />
        </>
    );
};

export default SideNavigation;