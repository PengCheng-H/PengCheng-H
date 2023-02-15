import { Component, ReactNode } from "react";
import HCFuzzySearch from "../components/HCFuzzySearch";
import { Select } from "antd";

export default class HCTestPage extends Component {
    state = {
        data_list: ["123", "345", "456", "769", "abc", "asd123"]
    }

    render(): ReactNode {
        return <div>
            <HCFuzzySearch placeholder="请输入物品编码" dataSource={this.state.data_list} onChange={this.onChange.bind(this)} style={{ width: "300px" }}></HCFuzzySearch>
        </div>;
    }

    onChange() {

    }
}