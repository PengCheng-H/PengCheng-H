import { Table } from "antd";
import { Component, ReactNode } from "react"

export interface HCTableProps {
    columns: object[],
    dataSource?: object[],
    pagination?: {},
    scroll?: {}
}

export interface HCTableState { }

export default class HCTable extends Component<HCTableProps, HCTableState> {
    constructor(props: any) {
        super(props);
    }

    render(): ReactNode {
        return <Table columns={this.props.columns} dataSource={this.props.dataSource} scroll={this.props.scroll} />;
    }
}