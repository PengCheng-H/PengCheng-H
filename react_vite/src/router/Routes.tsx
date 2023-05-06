import React from 'react';
import { Outlet, Link, Routes, Route } from 'react-router-dom';
import { Layout, Menu } from 'antd';

const { Header, Sider, Content, Footer } = Layout;

const Home: React.FC = () => {
    return <div>Home</div>;
};

const About: React.FC = () => {
    return <div>About</div>;
};

const Contact: React.FC = () => {
    return <h1>Contact</h1>;
};

const GlobalRouter: React.FC = () => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider>
                <div className="logo" />
                <Menu theme="dark" mode="inline">
                    <Menu.Item key="home">
                        <Link to="/">Home</Link>
                    </Menu.Item>
                    <Menu.Item key="about">
                        <Link to="/about">About</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }} />
                <Content style={{ margin: '24px 16px 0' }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        <Outlet />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    );
};

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<GlobalRouter />}>
                <Route path="home" element={<Home />} />
                <Route path="about" element={<About />} />
            </Route>
            <Route path="/contact" element={<Contact />} />
        </Routes>
    );
};

export default App;
