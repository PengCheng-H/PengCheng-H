import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';

const { Header } = Layout;

const items_nav_top: MenuProps["items"] = [
    { key: 'NAV1', label: '顶部1' },
    { key: 'NAV2', label: '顶部2' },
    { key: 'NAV3', label: '顶部3' },
];

export default function SideNavigation() {
    return (
        <Layout>
            <Header className="header">
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['NAV1']} items={items_nav_top} />
            </Header>
        </Layout>
    );
}