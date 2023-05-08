import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import SideNavigation from "src/common/SideNavigation";

export default function ConsoleIndex() {
    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = (collapsed: boolean) => {
        setCollapsed(collapsed);
    };

    return <>
        <Layout style={{ minHeight: "100vh" }}>
            <Sider
                style={{
                    position: "fixed",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    zIndex: 1,
                    overflow: "auto",
                    width: collapsed ? 80 : 200,
                    transition: "width 0.2s",
                }}
                collapsible
                collapsed={collapsed}
                onCollapse={onCollapse}
                collapsedWidth={80}
            >
                <SideNavigation />
            </Sider>
            <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
                <Content>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    </>
}