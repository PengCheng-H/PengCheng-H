import { Breadcrumb, Layout, theme } from 'antd';

const { Content } = Layout;

export default function SideNavigation() {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
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
    );
}