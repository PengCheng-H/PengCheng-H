import { Menu } from "antd";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { BrowserRouter, Link } from "react-router-dom";

export default function Navigation() {
    const nav_items: ItemType[] = [
        {
            key: "/home",
            title: "Home",
        }
    ]

    return <>
        <BrowserRouter>
            <Menu mode="horizontal" >
                <Menu.Item key="Home">
                    <Link to={"/Home"}>home</Link>
                </Menu.Item>
            </Menu>
        </BrowserRouter>
    </>
}