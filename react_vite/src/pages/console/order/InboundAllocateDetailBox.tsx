import { useEffect, useState } from "react";
import { Button, InputNumber, Row, Table, message } from "antd";

import api from "src/utils/api";
import * as IHttpReq from "../../../interfaces/http_request.interface";
import { IHCAllocatedBox, IHCInboundOrder } from "src/interfaces/interface"
import { DEFAULT_PAGE_NO, DEFAULT_PAGE_SIZE } from "src/types/Constants";

interface InboundAllocateDetailBoxProps {
    curOrder: IHCInboundOrder;
    setCurOrder: (order: IHCInboundOrder) => void;
    orderList: IHCInboundOrder[];
    setOrderList: (orders: IHCInboundOrder[]) => void;
}

export default function InboundAllocateDetailBox(props: InboundAllocateDetailBoxProps) {
    const [boxList, setBoxList] = useState<IHCAllocatedBox[]>([]);
    const [rowId, setRowId] = useState<number>(0);
    const [colId, setColId] = useState<number>(0);
    const [layerId, setLayerId] = useState<number>(0);
    const [pageNo, setPageNo] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [timestamp, setTimestamp] = useState<number>(0);

    useEffect(() => {
        getBoxList();
    }, [pageNo, pageSize, timestamp]);


    const getBoxList = async () => {
        const params: IHttpReq.IHCInventoryFindEmptyBoxesReq = {
            page_no: pageNo || DEFAULT_PAGE_NO,
            page_size: pageSize || 5 || DEFAULT_PAGE_SIZE
        };

        if (rowId > 0) { params.rows = [rowId]; }
        if (colId > 0) { params.columns = [colId]; }
        if (layerId > 0) { params.layers = [layerId]; }

        const result = await api.InventoryFindEmptyBoxes(params);

        if (!result || result.result_code !== 0) {
            message.error(`获取料箱列表失败！error_msg: ${result.result_msg}`);
            return;
        }

        setBoxList(result.data.data_list);
        setTotal(result.data.total_count);
        setPageNo(result.data.page_no);
        setPageSize(result.data.page_size);
    }

    const handlePaginationChange = (page: number, pageSize?: number) => {
        setPageNo(page);
        if (pageSize) {
            setPageSize(pageSize);
        }
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
    };

    return <>
        <Row>
            <label htmlFor="">订单编号：</label>
            <span>{props.curOrder.order_code}</span>
        </Row>
        <Row style={{ marginTop: '5px' }}>
            <label htmlFor="">当前料箱：</label>
            <span>{props.curOrder.cur_allocate_box ? props.curOrder.cur_allocate_box.box_code : "未分配"}</span>
        </Row>
        <Row style={{ lineHeight: '30px', marginBottom: '10px', marginTop: '5px' }}>
            <label htmlFor="">排号：</label>
            <InputNumber
                value={rowId}
                onChange={(value: number | null) => { setRowId(value || 0) }}
                precision={0}
                min={0}
                max={4}
                style={{ width: '50px' }}
            />
            <label htmlFor="" style={{ marginLeft: '10px' }}>列号：</label>
            <InputNumber
                value={colId}
                onChange={(value: number | null) => { setColId(value || 0) }}
                precision={0}
                min={0}
                max={38}
                style={{ width: '50px' }}
            />
            <label htmlFor="" style={{ marginLeft: '10px' }}>层号：</label>
            <InputNumber
                value={layerId}
                onChange={(value: number | null) => { setLayerId(value || 0) }}
                precision={0}
                min={0}
                max={6}
                style={{ width: '50px' }}
            />
            <Button type="primary" style={{ marginLeft: '20px' }} onClick={() => { setTimestamp(Date.now()) }}>搜索料箱</Button>
        </Row>
        <Row>
            <Table<IHCAllocatedBox>
                sticky
                bordered
                scroll={{ x: '100%', y: '100%' }}
                dataSource={boxList}
                rowKey={(record: IHCAllocatedBox) => { return record.box_code; }}
                pagination={{
                    total,
                    pageSize,
                    current: pageNo,
                    onChange: handlePaginationChange,
                    showTotal: (total, range) => `共 ${total} 条记录`,
                    style: { float: 'left' },
                }}
                columns={[
                    { title: "料箱号", dataIndex: "box_code", key: "box_code", width: "120px", align: "center", },
                    { title: "货位号", dataIndex: "location_code", key: "location_code", width: "120px", align: "center", },
                    {
                        title: "操作", dataIndex: "operation", key: "operation", width: "120px", align: "center", render: (value, record: IHCAllocatedBox, index) => {
                            return <>
                                <Button type="primary" onClick={() => { choseBox(record); }}>选择该料箱</Button>
                            </>
                        }
                    },
                ]}
            />
        </Row>
    </>
}