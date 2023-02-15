import React from "react"
import { Button, message } from "antd";

import api from "../../../../utils/api";
import { IHCItem } from "../../../../types/interface";
import HCFuzzySearch from "../../../../components/HCFuzzySearch";
import './index.css';



export default class HCInboundTaskGuideSearch extends React.Component {
    state = {
        cur_item_code: "",
        item_list: []
    }
    child: HCFuzzySearch | null | undefined;

    render(): React.ReactNode {
        return <div className="search_box">
            <HCFuzzySearch
                placeholder="请输入物品编码"
                dataSource={[]}
                onChange={this.onChange.bind(this)}
                onSearch={this.onSearch.bind(this)}
                className="search_text"
                ref={child => this.child = child}
            />
        </div>;
    }

    confirm(): boolean {
        return !!this.state.cur_item_code;
    }

    onChange(value: string): void {
        this.setState({ cur_item_code: value }, () => {
            console.log("this.child?.state.value: ", this.child?.state.value, value, this.state.cur_item_code);
        });
    }

    async onSearch(value: string, cb: Function) {
        const result = await api.GetItemByText(value);

        if (result.result_code.toString() === "0" && Array.isArray(result.data)) {
            const dataSource = result.data.map((item: IHCItem) => {
                return { label: `${item.item_code}-${item.item_name}`, value: item.item_code };
            });

            this.setState({ item_list: result.data }, cb(dataSource));

            return;
        }

        cb([]);
    }
}