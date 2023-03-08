import React from "react";
import Table, { ColumnsType } from "antd/es/table";

import utils from "../../../../utils";
import { IHCOutboundOrder } from "../../../../types/interface";
import { IHCOutboundOrderDetail } from "../../../../types/interface";
import { message } from "antd";
import { emOrderStatus } from "../../../../types/enum";



interface HCOutboundOrderInfoProps {
    item_code?: string
    supplier_code?: string
    outbound_order_status?: number[]
}

interface HCOutboundOrderInfoState {
    item_code: string
    item_quantity: number
    item_allocated_quantity: number
    item_allocated_details: { [order_code: string]: { order_detail_id: number, allocate_quantity: number }[] }
    supplier_code: string
    outbound_order_list: IHCOutboundOrder[]
}

export default class HCOutboundOrderAllocate extends React.Component<HCOutboundOrderInfoProps, HCOutboundOrderInfoState> {
    state: HCOutboundOrderInfoState

    constructor(props: HCOutboundOrderInfoProps) {
        super(props);
        this.state = {
            item_code: this.props.item_code || "",
            item_quantity: 0,
            item_allocated_quantity: 0,
            item_allocated_details: {},
            supplier_code: this.props.supplier_code || "",
            outbound_order_list: []
        }
    }

    render(): React.ReactNode {
        return <div>
            <Table columns={outbound_order_headers} dataSource={this.state.outbound_order_list} pagination={{ pageSize: 10 }} scroll={{ x: 1250, y: 200, scrollToFirstRowOnChange: true }} className="table"></Table>
        </div>;
    }

    set_outbound_order_list(outbound_order_list: IHCOutboundOrder[], item_code: string = "", item_quantity: number = 0) {
        let total_allocate_quantity: number = 0;
        let allocated_item_details: { [order_code: string]: { order_detail_id: number, allocate_quantity: number }[] } = {};

        // 1. 循环遍历出库订单列表。
        outbound_order_list.map((outbound_order: IHCOutboundOrder) => {
            outbound_order.key = outbound_order.order_code;
            outbound_order.order_cur_allocate_qty = outbound_order.order_cur_allocate_qty || 0;

            // 2. 循环遍历每个出库订单明细。
            outbound_order.order_details.map((outbound_order_detail: IHCOutboundOrderDetail) => {
                // 3.1 条件1：找到物品ID一致的明细。
                // 3.2 条件2：该明细可分配的物品数量，大于0。
                let allocated_item_qty: number = outbound_order_detail.order_allocated_qty + outbound_order_detail.order_finished_qty;
                let distributable_item_qty: number = outbound_order_detail.order_qty - allocated_item_qty;
                if (outbound_order_detail.item_code == item_code && distributable_item_qty > 0) {
                    // 4.1 如果订单明细可分配的物品数量大于待分配的物品数量，则直接使用待分配的物品数量来作为该物品明细本次分配的数量。
                    // 4.2 否则直接使用可分配数量作为本次数量。

                    if (distributable_item_qty >= item_quantity) {
                        outbound_order_detail.order_allocated_qty = item_quantity;
                    } else {
                        outbound_order_detail.order_allocated_qty = distributable_item_qty;
                    }

                    item_quantity -= outbound_order_detail.order_allocated_qty;
                    total_allocate_quantity += outbound_order_detail.order_allocated_qty;
                    outbound_order.order_cur_allocate_qty += outbound_order_detail.order_allocated_qty;
                    allocated_item_details[outbound_order.order_code] = allocated_item_details[outbound_order.order_code] || [];
                    allocated_item_details[outbound_order.order_code].push({
                        order_detail_id: outbound_order_detail.order_detail_id,
                        allocate_quantity: outbound_order_detail.order_allocated_qty
                    });
                }
            });
        });

        this.setState({
            item_code: item_code,
            item_quantity: item_quantity,
            outbound_order_list: outbound_order_list,
            item_allocated_details: allocated_item_details,
            item_allocated_quantity: total_allocate_quantity,
        })
    }


}



const outbound_order_headers: ColumnsType<IHCOutboundOrder> = [
    {
        key: 'order_code',
        title: 'WMS订单号',
        dataIndex: 'order_code',
        width: "160px",
        fixed: 'left',
        align: "center",
        sorter: (a, b) => a.order_code.localeCompare(b.order_code, "en"),
    },
    {
        key: 'external_order_code',
        title: 'ERP订单号',
        dataIndex: 'external_order_code',
        width: "160px",
        align: "center",
        sorter: (a, b) => a.external_order_code.localeCompare(b.external_order_code, "en"),
    },
    {
        key: 'related_code1',
        title: '关联编号1',
        dataIndex: 'related_code1',
        width: "160px",
        align: "center",
        sorter: (a, b) => a.related_code1.localeCompare(b.related_code1, "en"),
    },
    // {
    //     key: 'related_code2',
    //     title: '关联编号2',
    //     dataIndex: 'related_code2',
    //     width: "120px",
    // },
    // {
    //     key: 'order_type_code',
    //     title: '订单类型',
    //     dataIndex: 'order_type_code',
    //     width: "60px",
    // },
    {
        key: 'order_status',
        title: '状态',
        dataIndex: 'order_status',
        width: "80px",
        align: "center",
        sorter: (a, b) => a.order_status.localeCompare(b.order_status, "en"),
        render: (value: string) => { return emOrderStatus[`${value}`]; }
    },
    {
        key: 'order_qty',
        title: '订单数量',
        dataIndex: 'order_qty',
        width: "120px",
        align: "center",
        sorter: (a, b) => a.order_qty - b.order_qty,
        render: value => { return Number(value); }
    },
    {
        key: 'order_allocated_qty',
        title: '已分配数量',
        dataIndex: 'order_allocated_qty',
        width: "120px",
        align: "center",
        sorter: (a, b) => a.order_allocated_qty - b.order_allocated_qty,
        render: value => { return Number(value); }
    },
    {
        key: 'order_finished_qty',
        title: '已出库数量',
        dataIndex: 'order_finished_qty',
        width: "120px",
        align: "center",
        sorter: (a, b) => a.order_finished_qty - b.order_finished_qty,
        render: value => { return Number(value); }
    },
    {
        key: 'order_cur_allocate_qty',
        title: '本次分配数量',
        dataIndex: 'order_cur_allocate_qty',
        width: "150px",
        align: "center",
        sorter: (a, b) => a.order_cur_allocate_qty - b.order_cur_allocate_qty,
        render: value => { value = value || 0; return Number(value); },
    },
    {
        key: 'order_time',
        title: '订单时间',
        dataIndex: 'order_time',
        width: "180px",
        align: "center",
        sorter: (a, b) => Date.parse(a.order_time.toString()) - Date.parse(b.order_time.toString()),
        render: utils.FormatTime
    },
    {
        key: 'created_time',
        title: '创建时间',
        dataIndex: 'created_time',
        width: "180px",
        align: "center",
        sorter: (a, b) => Date.parse(a.order_time.toString()) - Date.parse(b.order_time.toString()),
        render: utils.FormatTime
    },
    // {
    //     key: 'created_operator',
    //     title: '创建人员',
    //     dataIndex: 'created_operator',
    //     width: "60px",
    // },
    // {
    //     key: 'created_from',
    //     title: '创建来源',
    //     dataIndex: 'created_from',
    //     width: "60px",
    // },
    // {
    //     key: 'last_updated_time',
    //     title: '最近操作时间',
    //     dataIndex: 'last_updated_time',
    //     width: "180px",
    //     render: utils.formatTime
    // },
    // {
    //     key: 'last_updated_operator',
    //     title: '最近操作人',
    //     dataIndex: 'last_updated_operator',
    //     width: "60px",
    //     fixed: 'right',
    // },
    // {
    //     key: 'operations',
    //     title: '操作',
    //     dataIndex: 'operations',
    //     width: "120px",
    //     fixed: 'right',
    // },
];
