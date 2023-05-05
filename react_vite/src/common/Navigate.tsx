import React from 'react';
import { LaptopOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';


const { Header, Content, Sider } = Layout;

const items_nav_top: MenuProps["items"] = [
    { key: 'NAV1', label: '顶部1' },
    { key: 'NAV2', label: '顶部2' },
    { key: 'NAV3', label: '顶部3' },
];

const items_nav_left: MenuProps['items'] = [
    {
        key: 'home',
        icon: React.createElement(LaptopOutlined),
        label: '首页',
    },
    {
        key: 'basic_data',
        icon: React.createElement(LaptopOutlined),
        label: '基础信息',
        children: [
            { key: 'basic_dashboard', icon: React.createElement(LaptopOutlined), label: '基础看板', },
            { key: 'basic_boxes', icon: React.createElement(LaptopOutlined), label: '料箱管理', },
            { key: 'basic_cells', icon: React.createElement(LaptopOutlined), label: '货位管理', },
            { key: 'basic_items', icon: React.createElement(LaptopOutlined), label: '物品管理', },
            { key: 'basic_suppliers', icon: React.createElement(LaptopOutlined), label: '供应商管理', },
        ]
    },
    {
        key: 'inventory',
        icon: React.createElement(LaptopOutlined),
        label: '库存管理',
        children: [
            { key: 'inventory_dashbord', icon: React.createElement(LaptopOutlined), label: '库存看板', },
            { key: 'inventory_boxes', icon: React.createElement(LaptopOutlined), label: '料箱库存表', },
            { key: 'inventory_items', icon: React.createElement(LaptopOutlined), label: '物品库存表', },
            { key: 'inventory_suppliers', icon: React.createElement(LaptopOutlined), label: '库存汇总表', },
        ]
    },
    {
        key: 'tasks',
        icon: React.createElement(LaptopOutlined),
        label: '任务管理',
        children: [
            { key: 'tasks_dashbord', icon: React.createElement(LaptopOutlined), label: '任务看板', },
            { key: 'tasks_wcs', icon: React.createElement(LaptopOutlined), label: 'WCS任务表', },
            { key: 'tasks_wms', icon: React.createElement(LaptopOutlined), label: 'WMS任务表', },
        ]
    },
    {
        key: 'users',
        icon: React.createElement(LaptopOutlined),
        label: '用户管理',
    },
];

function onClick() {
    console.log(window.location.href)
}

const App: React.FC = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout>
            <Header className="header">
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['NAV1']} items={items_nav_top} />
            </Header>
            <Layout>
                <Sider width={200} style={{ background: colorBgContainer }}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['home']}
                        defaultOpenKeys={['home']}
                        style={{ height: '100%', borderRight: 0 }}
                        items={items_nav_left}
                        onClick={onClick}
                    />
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]} />
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            background: colorBgContainer,
                        }}
                    >
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default App;