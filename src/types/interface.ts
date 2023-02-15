export interface IHCHttpResponse {
    result_code: number
    result_msg: string
    data: any
}

export interface IHCInboundOrderDetailLotProps {
    production_date: string;
    supplier_code: string;
    storage_date: string;
    expiry_date: string;
    lot_prop1: string;
    lot_prop2: string;
    lot_prop3: string;
}

export interface IHCInboundOrderDetail {
    order_qty: number;
    expiry_date: string;
    order_allocated_qty: number;
    lot_prop1: string;
    order_finished_qty: number;
    lot_prop2: string;
    order_status: string;
    lot_prop3: string;
    order_detail_id: number;
    production_date: string;
    created_time: string;
    order_code: string;
    supplier_code: string;
    last_updated_time: string;
    line_no: number;
    storage_date: string;
    created_operator: string;
    item_code: string;
    last_updated_operator: string;
    lot_props: IHCInboundOrderDetailLotProps;
}

export interface IHCInboundOrder {
    [key: string]: any;
    external_order_code: string;
    related_code1: string;
    order_time: string;
    order_status: string;
    order_allocated_qty: number;
    created_time: string;
    created_operator: string;
    created_from: string;
    related_code2: string;
    order_code: string;
    order_type_code: string;
    order_qty: number;
    order_finished_qty: number;
    last_updated_time: string;
    last_updated_operator: string;
    order_details: IHCInboundOrderDetail[];
}

export interface IHCOutboundOrderDetailLotProps {
    production_date: string;
    supplier_code: string;
    storage_date: string;
    expiry_date: string;
    lot_prop1: string;
    lot_prop2: string;
    lot_prop3: string;
}

export interface IHCOutboundOrderDetail {
    order_qty: number;
    expiry_date: string;
    order_allocated_qty: number;
    lot_prop1: string;
    order_finished_qty: number;
    lot_prop2: string;
    order_status: string;
    lot_prop3: string;
    order_detail_id: number;
    production_date: string;
    created_time: string;
    order_code: string;
    supplier_code: string;
    last_updated_time: string;
    line_no: number;
    storage_date: string;
    created_operator: string;
    item_code: string;
    last_updated_operator: string;
    lot_props: IHCOutboundOrderDetailLotProps;
}

export interface IHCOutboundOrder {
    [key: string]: any;
    external_order_code: string;
    related_code1: string;
    order_time: string;
    order_status: string;
    order_allocated_qty: number;
    created_time: string;
    created_operator: string;
    created_from: string;
    related_code2: string;
    order_code: string;
    order_type_code: string;
    order_qty: number;
    order_finished_qty: number;
    receiver_name: string;
    receiver_contact_tel: string;
    receiver_contact_name: string;
    last_updated_time: string;
    last_updated_operator: string;
    order_details: IHCOutboundOrderDetail[];
}

export interface IHCWcsTask {
    [key: string]: any;
    wcs_task_code: string;
    task_type: string;
    wcs_task_status: string;
    box_code: string;
    location_code: string;
    pick_station_code: string;
    created_time: string;
    created_operator: string;
    last_updated_time: string;
    last_updated_operator: string;
}

export interface IHCItem {
    item_width: number
    lot_prop1_as_lot: boolean
    has_serial_no: boolean
    last_updated_time: string
    item_external_code1: string
    item_height: number
    lot_prop2_as_lot: boolean
    count_cycle_days: number
    created_operator: string
    item_code: string
    item_weight: number
    lot_prop3_as_lot: boolean
    last_updated_operator: string
    item_external_code2: string
    item_volume: number
    max_qty_per_box: number
    storage_strategy: string
    created_from: string
    item_name: string
    production_date_as_lot: boolean
    production_date_mixed_days: number
    pick_strategy: string
    item_alias_name: string
    supplier_as_lot: boolean
    storage_date_mixed_days: string
    item_status: string
    package_unit: string
    storage_date_as_lot: boolean
    expiry_date_mixed_days: number
    created_time: string
    item_length: number
    expiry_date_as_lot: boolean
    abc_type: string
}