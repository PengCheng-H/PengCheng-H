import React from "react";
import { InputNumber, message } from "antd";

import api from "../../../../utils/api";
import HCFuzzySearch from "../../../../components/HCFuzzySearch";
import { IHCItem, IHCSupplier } from "../../../../types/interface";
import '../index.css';



export default class HCInboundTaskGuideSearch extends React.Component {
    state = {
        cur_item_code: "",
        cur_item_list: [],
        cur_supplier_code: "",
        cur_supplier_list: [],
        cur_item_quantity: 0,
    }
    child: HCFuzzySearch | null | undefined;

    render(): React.ReactNode {
        return <div className="search_box">
            <label>*请输入物品编码(必填)：</label>
            <HCFuzzySearch
                placeholder="*请输入物品编码(必填)"
                dataSource={[]}
                onChange={this.onChange_item_code.bind(this)}
                onSearch={this.onSearch_item_code.bind(this)}
                className="search_text"
                autoFocus={true}
                ref={child => this.child = child}
            />
            <label style={{ marginLeft: "30px" }}>*请输入物品数量(必填)：</label>
            <InputNumber value={this.state.cur_item_quantity} onChange={this.onChange_item_quantity.bind(this)} placeholder="物品数量(必填)" style={{ width: "100px" }} />
            <label style={{ marginLeft: "30px" }}>请输入供应商编码(可选)：</label>
            <HCFuzzySearch
                placeholder="请输入供应商编码 (允许为空)"
                dataSource={[]}
                onChange={this.onChange_supplier_code.bind(this)}
                onSearch={this.onSearch_supplier_code.bind(this)}
                className="search_text"
                ref={child => this.child = child}
            />
        </div>;
    }


    onChange_item_code(value: string): void {
        this.setState({ cur_item_code: value }, () => {
            message.info(`录入物品码: ${this.state.cur_item_code}`);
        });
    }

    confirm_item_code(): boolean {
        return !!this.state.cur_item_code;
    }

    async onSearch_item_code(value: string, cb: Function) {
        const result = await api.GetItems(value);

        if (result.result_code.toString() === "0" && Array.isArray(result.data.data_list)) {
            const dataSource = result.data.data_list.map((item: IHCItem) => {
                return { label: `${item.item_code}-${item.item_external_code1}-${item.item_name}`, value: item.item_code };
            });
            this.setState({ cur_item_list: result.data.data_list }, cb(dataSource));
            return;
        }

        cb([]);
    }

    onChange_item_quantity(item_quantity: number | null) {
        this.setState({
            cur_item_quantity: item_quantity
        }, () => {
            message.info(`录入物品数量：${this.state.cur_item_quantity}`)
        })
    }

    confirm_item_quantity(): boolean {
        return this.state.cur_item_quantity > 0;
    }

    onChange_supplier_code(value: string): void {
        this.setState({ cur_supplier_code: value }, () => {
            message.info(`录入供应商码: ${this.state.cur_supplier_code}`);
        });
    }

    async onSearch_supplier_code(value: string, cb: Function) {
        const result = await api.GetSuppliers(value);

        if (result.result_code.toString() === "0" && Array.isArray(result.data.data_list)) {
            const dataSource = result.data.data_list.map((item: IHCSupplier) => {
                return { label: `${item.supplier_code}-${item.supplier_name}`, value: item.supplier_code };
            });
            this.setState({ cur_supplier_list: result.data }, cb(dataSource));
            return;
        }

        cb([]);
    }

}