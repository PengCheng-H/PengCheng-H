import React from "react"
import HCInboundOrderTable from "./inbound_oder_table";
import { IHCInboundOrder } from "../../../../types/interface";

interface IHCInboundTaskGuideAllocateProps {
    item_code?: string
    supplier_code?: string
    inbound_order_status?: number[]
}

interface IHCInboundTaskGuideAllocateStates {
    item_code: string
    item_quantity: number
    inbound_order_list: IHCInboundOrder[]
}

export default class HCInboundTaskGuideAllocate extends React.Component<IHCInboundTaskGuideAllocateProps, IHCInboundTaskGuideAllocateStates> {
    state: IHCInboundTaskGuideAllocateStates;
    child_table: HCInboundOrderTable | any;

    constructor(props: IHCInboundTaskGuideAllocateProps) {
        super(props)
        this.state = {
            item_code: "",
            item_quantity: 0,
            inbound_order_list: [],
        };
    }

    render(): React.ReactNode {
        return <div>
            <HCInboundOrderTable inbound_order_list={this.state.inbound_order_list} ref={child => this.child_table = child} />
        </div>;
    }

    set_inbound_order_list(inbound_order_list: IHCInboundOrder[], item_code: string = "", item_quantity: number = 0) {
        this.setState({
            item_code: item_code,
            item_quantity: item_quantity,
            inbound_order_list: inbound_order_list,
        }, () => {
            this.child_table.set_inbound_order_list(this.state.inbound_order_list, item_code, item_quantity)
        })
    }
}


