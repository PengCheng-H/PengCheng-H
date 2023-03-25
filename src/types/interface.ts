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
    [key: string]: any;
    line_no: number;
    order_code: string;
    item_code: string;
    supplier_code: string;
    order_qty: number;
    order_finished_qty: number;
    order_allocated_qty: number;
    order_cur_allocate_qty: number;
    allocate_box_code?: string;
    order_status: string;
    order_detail_id: number;
    created_operator: string;
    created_time: string;
    last_updated_operator: string;
    last_updated_time: string;
    production_date: string;
    storage_date: string;
    expiry_date: string;
    lot_prop1: string;
    lot_prop2: string;
    lot_prop3: string;
    lot_props?: IHCInboundOrderDetailLotProps;
}

export interface IHCInboundOrder {
    [key: string]: any;
    order_code: string;
    external_order_code: string;
    related_code1: string;
    related_code2: string;
    order_status: string;
    order_type_code: string;
    order_qty: number;
    order_finished_qty: number;
    order_allocated_qty: number;
    order_cur_allocate_qty: number;
    allocate_box_code?: string;
    order_time: string;
    order_details: IHCInboundOrderDetail[];
    created_from: string;
    created_operator: string;
    created_time: string;
    last_updated_operator: string;
    last_updated_time: string;
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
    key?: string | number;
    line_no: number;
    order_detail_id: number;
    order_code: string;
    order_status: string;
    supplier_code: string;
    item_code: string;
    order_qty: number;
    order_finished_qty: number;
    order_allocated_qty: number;
    order_cur_allocate_qty: number;
    storage_date: string;
    production_date: string;
    created_time: string;
    created_operator: string;
    last_updated_time: string;
    last_updated_operator: string;
    expiry_date: string;
    lot_prop1: string;
    lot_prop2: string;
    lot_prop3: string;
    lot_props?: IHCOutboundOrderDetailLotProps;
}

export interface IHCOutboundOrder {
    [key: string]: any;
    order_code: string;
    external_order_code: string;
    related_code1: string;
    related_code2: string;
    order_status: string;
    order_type_code: string;
    order_qty: number;
    order_finished_qty: number;
    order_allocated_qty: number;
    order_cur_allocate_qty: number;
    order_details: IHCOutboundOrderDetail[];
    order_time: string;
    receiver_name: string;
    receiver_contact_tel: string;
    receiver_contact_name: string;
    created_from: string;
    created_operator: string;
    created_time: string;
    last_updated_operator: string;
    last_updated_time: string;
}

export interface IHCWcsTask {
    key?: string | number;
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
    key?: string;
    item_width: number;
    lot_prop1_as_lot: boolean
    has_serial_no: boolean
    last_updated_time: string
    item_external_code1: string
    item_extend_code1: string
    item_extend_code2: string
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

export interface IHCSupplier {
    created_time: string
    supplier_code: string
    supplier_name: string
    created_operator: string
    created_from: string
    supplier_status: string
    last_updated_time: string
    last_updated_operator: string
}

export interface IHCLocation {
    location_code: string
    location_layer: number
    abc_type: string
    created_time: string
    created_operator: string
    location_row: number
    location_column: number
    location_depth: number
    location_status: string
    last_updated_time: string
    last_updated_operator: string
}

export interface IHCBox {
    box_length: number
    location_code: string
    box_height: number
    box_region_count: number
    created_time: string
    created_operator: string
    box_code: string
    box_width: number
    box_rated_capacity: number
    box_status: string
    last_updated_time: string
    last_updated_operator: string
}

export interface IHCBoxDetail {
    key?: string | number
    box_region_id: number
    item_code: string
    item_detail?: IHCItem
    quantity: number
    orders: { order_code: string, quantity: number }[]
}

export interface IHCOrderType {
    order_type_name: string
    work_type: string
    last_updated_time: string
    last_updated_operator: string
    created_time: string
    order_type_code: string
    created_operator: string
}

export interface IHCPickStation {
    key?: string | number
    pick_station_code: string
    pick_station_status: string
    box_code: string
    wcs_task_code: string
    created_time: string
    created_operator: string
    last_updated_time: string
    last_updated_operator: string
}

export interface IHCPagination {
    page_no?: number
    page_size?: number
    total_count?: number
}