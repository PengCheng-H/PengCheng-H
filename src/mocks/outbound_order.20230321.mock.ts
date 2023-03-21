import { IHCOutboundOrder, IHCOutboundOrderDetail } from "../types/interface";

const order_list: IHCOutboundOrder[] = [];

const MIN_ORDER_COUNT = 1;
const MAX_ORDER_COUNT = 30;
const MIN_ORDER_DETAIL_COUNT = 1;
const MAX_ORDER_DETAIL_COUNT = 10;
const order_count: number = Math.floor(Math.random() * (MAX_ORDER_COUNT - MIN_ORDER_COUNT + 1) + MIN_ORDER_COUNT);
for (let i = 1; i <= order_count; i++) {
    const order_qty = Math.floor(Math.random() * 1000 + 1);
    const order_finished_qty = Math.floor(Math.random() * order_qty + 1);

    const order: IHCOutboundOrder = {
        key: i,
        order_code: `20230321_${i}`,
        order_time: "2023-03-21 00:00:00.000",
        external_order_code: `20230321_${i}`,
        related_code1: `20230321_${i}`,
        related_code2: `20230321_${i}`,
        order_status: "已创建",
        order_type_code: "出库单",
        order_qty: order_qty,
        order_finished_qty: order_finished_qty,
        order_allocated_qty: 0,
        order_cur_allocate_qty: order_qty - order_finished_qty,
        order_details: [],
        created_from: "测试数据",
        created_operator: "人在塔在",
        created_time: "2023-03-21 00:00:00.000",
        last_updated_operator: "黎明中的花朵",
        last_updated_time: "2023-03-21 00:00:00.000",
        receiver_name: `reciver_${i}`,
        receiver_contact_tel: `reciver_${i}`,
        receiver_contact_name: `reciver_${i}`,
    };

    let order_detail_count: number = Math.floor(Math.random() * (MAX_ORDER_DETAIL_COUNT - MIN_ORDER_DETAIL_COUNT + 1) + MIN_ORDER_DETAIL_COUNT);
    for (let j = 1; j <= order_detail_count; j++) {
        const order_detail: IHCOutboundOrderDetail = {
            key: j,
            line_no: j,
            order_detail_id: j,
            order_code: `20230321_${i}`,
            order_status: "已创建",
            item_code: `Item_${j}`,
            supplier_code: `Supplier_${j}`,
            order_qty: order_qty,
            order_allocated_qty: 0,
            order_finished_qty: order_finished_qty,
            created_operator: "万物皆虚",
            created_time: "2023-03-21 00:00:00.000",
            last_updated_operator: "万事皆允",
            last_updated_time: "2023-03-21 00:00:00.000",
            production_date: "2023-03-21",
            storage_date: "2023-03-21",
            expiry_date: "2023-03-21",
            lot_prop1: "",
            lot_prop2: "",
            lot_prop3: "",
        };

        order.order_details.push(order_detail);
    }

    order_list.push(order);
}

export default order_list;