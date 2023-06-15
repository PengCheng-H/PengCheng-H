import { useEffect, useState } from "react";
import { Button, InputNumber, Row, Table, message } from "antd";

import api from "src/utils/api";
import * as IHttpReq from "../../../interfaces/http_request.interface";
import { IHCAllocatedBox, IHCInboundOrder, IHCInboundOrderDetail } from "src/interfaces/interface";
import { DEFAULT_PAGE_NO, DEFAULT_PAGE_SIZE } from "src/types/Constants";

interface InboundAllocateOrderBoxProps {
    curOrder: IHCInboundOrder;
    setCurOrder: (order: IHCInboundOrder) => void;
    orderList: IHCInboundOrder[];
    setOrderList: (orders: IHCInboundOrder[]) => void;
}

export default function InboundAllocateOrderBox(props: InboundAllocateOrderBoxProps) {
    const [usedBoxList, setUsedBoxList] = useState<IHCAllocatedBox[]>([]);

    const handlePaginationChange = (_page: number, _pageSize?: number) => {
        return
    };

    const choseBox = (emptyBox: IHCAllocatedBox) => {
        message.info(`已选择料箱：${emptyBox.box_code}`);
        const newOrders = [...props.orderList];
        const newOrderIndex = props.orderList.findIndex(item => item.order_code === props.curOrder.order_code);
        const newOrder = newOrders[newOrderIndex];
        newOrders.splice(newOrderIndex, 1, {
            ...newOrder,
            cur_allocate_box: emptyBox
        });
        props.setCurOrder({ ...props.curOrder, cur_allocate_box: emptyBox });
        props.setOrderList(newOrders);
        setUsedBoxList([...usedBoxList, emptyBox])
        console.log(usedBoxList, emptyBox);
    };

    return <>
        <Row>
            <Table<IHCInboundOrderDetail>
                sticky
                bordered
                scroll={{ x: '100%', y: '100%' }}
                dataSource={props.curOrder.order_details}
                rowKey={(record: IHCInboundOrderDetail) => { return record.order_detail_id; }}
                pagination={{
                    // total: props.curOrder.order_details.length,
                    // pageSize: props.curOrder.order_details.length / 3,
                    // current: 1,
                    onChange: handlePaginationChange,
                    showTotal: (total, _range) => `共 ${total} 条记录`,
                    style: { float: 'left' },
                }}
                columns={[
                    { title: '订单行号', dataIndex: 'line_no', key: 'line_no', align: 'center', width: '120px', fixed: 'left', },
                    { title: '物品码', dataIndex: 'item_code', key: 'item_code', align: 'center', width: '120px', },
                    { title: '供应商码', dataIndex: 'supplier_code', key: 'supplier_code', align: 'center', width: '120px', },
                    { title: '订单数量', dataIndex: 'order_qty', key: 'order_qty', align: 'center', width: '120px', },
                    { title: '已分配数量', dataIndex: 'order_allocated_qty', key: 'order_allocated_qty', align: 'center', width: '120px', },
                    { title: '已完成数量', dataIndex: 'order_finished_qty', key: 'order_finished_qty', align: 'center', width: '120px', },
                    { title: '本次分配数量', dataIndex: 'cur_order_allocated_qty', key: 'cur_order_allocated_qty', align: 'center', width: '120px', },
                    // {
                    //     title: "操作", dataIndex: "operation", key: "operation", width: "120px", align: "center", render: (_value, record: IHCAllocatedBox, _index) => {
                    //         return <>
                    //             <Button type="primary" onClick={() => { choseBox(record); }}>选择该料箱</Button>
                    //         </>
                    //     }
                    // },
                ]}
            />
        </Row>
    </>
}