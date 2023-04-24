import React from "react";
import MenuItem from "antd/es/menu/MenuItem";
import { Button, Menu, MenuProps, MenuTheme, Switch } from "antd";
import {
    HomeOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    SettingOutlined,
    PieChartOutlined,
    TableOutlined,
    FundProjectionScreenOutlined
} from '@ant-design/icons';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        key: "home", label: "主页", icon: <HomeOutlined />, children: [
            { key: "home_overview", label: "概览图", icon: <FundProjectionScreenOutlined /> },
        ]
    },
    {
        key: "report", label: "数据报表", icon: <PieChartOutlined />, children: [
            { key: "report_item", label: "物品表", icon: <TableOutlined /> },
            { key: "report_supplier", label: "供应商表", icon: <TableOutlined /> },
            { key: "report_inventory", label: "库存表", icon: <TableOutlined /> },
        ]
    },
    {
        key: "setting", label: "系统设置", icon: <SettingOutlined />, children: [
            { key: "setting_configuration", label: "系统配置", icon: <TableOutlined /> },
        ]
    }
];

type HCSideMenuProps = object

type HCSideMenuState = {
    theme: MenuTheme
    collapsed: boolean
}

export default class HCSideMenu extends React.Component<HCSideMenuProps, HCSideMenuState> {
    constructor(props: HCSideMenuProps) {
        super(props);
        this.state = {
            theme: "dark",
            collapsed: false,
        };
    }
    render(): React.ReactNode {
        return <div style={{ width: 256 }}>
            <Switch
                checked={this.state.theme === 'dark'}
                onChange={this.onThemeChange.bind(this)}
                checkedChildren="暗色系主题"
                unCheckedChildren="亮色系主题"
            />
            <Button type="primary" onClick={this.toggleCollapsed.bind(this)} style={{ marginBottom: 16 }}>
                {this.state.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
            <Menu
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["home"]}
                mode="inline"
                theme={this.state.theme}
                inlineCollapsed={this.state.collapsed}
                items={items}
            />
        </div>;
    }

    onThemeChange(value: boolean) {
        this.setState({ theme: value ? "dark" : "light" });
    }

    toggleCollapsed() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }
}