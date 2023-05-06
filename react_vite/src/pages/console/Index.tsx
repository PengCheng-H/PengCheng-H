import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import SideNavigation from "src/common/SideNavigation";

export default function ConsoleIndex() {
    return <>
        <Layout>
            <SideNavigation />
            <Content style={{ padding: '0 24px 24px' }}>
                <Outlet />
            </Content>
        </Layout>
    </>
}