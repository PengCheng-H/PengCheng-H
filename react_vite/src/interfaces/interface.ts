import { OrderStatus } from "src/types/enum";

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
    order_code: string;
    line_no: number;
    order_detail_id: number;
    order_status: OrderStatus;
    item_code: string;
    supplier_code: string;
    package_unit: string;
    storage_date: string;
    production_date: string;
    order_qty: number;
    order_allocated_qty: number;
    order_finished_qty: number;
    cur_order_allocated_qty: number;
    cur_allocate_box: IHCAllocatedBox;
    created_time: string;
    created_operator: string;
    expiry_date: string;
    last_updated_time: string;
    last_updated_operator: string;
    extend_prop1: string;
    extend_prop2: string;
    lot_prop1: string;
    lot_prop2: string;
    lot_prop3: string;
    lot_props: IHCInboundOrderDetailLotProps[];
}

export interface IHCInboundOrder {
    [key: string]: any;
    order_code: string;
    order_status: OrderStatus;
    external_order_code: string;
    warehouse_code: string;
    order_qty: number;
    order_allocated_qty: number;
    order_finished_qty: number;
    cur_allocate_box: IHCAllocatedBox;
    order_time: string;
    order_type_code: string;
    related_code1: string;
    related_code2: string;
    created_from: string;
    created_time: string;
    created_operator: string;
    last_updated_time: string;
    last_updated_operator: string;
    order_details: IHCInboundOrderDetail[];
}

export interface IHCInboundOrderQuickAddItem {
    supplier_code: string;
    items: { item_code: string; quantity: number; }[]
}

export interface IHCOutboundOrderDetailLotProps {
    supplier_code: string;
    production_date: string;
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
    order_allocated_qty: number;
    order_finished_qty: number;
    package_unit: string;
    production_date: string;
    storage_date: string;
    expiry_date: string;
    created_time: string;
    created_operator: string;
    last_updated_time: string;
    last_updated_operator: string;
    lot_prop1: string;
    lot_prop2: string;
    lot_prop3: string;
    lot_props: IHCOutboundOrderDetailLotProps[];
}

export interface IHCOutboundOrder {
    [key: string]: any;
    order_code: string;
    order_type_code: string;
    order_status: string;
    warehouse_code: string;
    external_order_code: string;
    order_qty: number;
    order_allocated_qty: number;
    order_finished_qty: number;
    order_time: string;
    created_from: string;
    created_time: string;
    created_operator: string;
    last_updated_time: string;
    last_updated_operator: string;
    related_code1: string;
    related_code2: string;
    order_details: IHCOutboundOrderDetail[];
}

export interface IHCOutboundOrderQuickAddItem {
    item_code: string;
    supplier_code: string;
    quantity: number;
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
    item_code: string;
    item_status: string;
    item_name: string;
    item_alias_name: string;
    item_extend_code1: string;
    item_extend_code2: string;
    item_length: number;
    item_width: number;
    item_height: number;
    item_weight: number;
    item_volume: number;
    package_unit: string;
    abc_type: string;
    max_qty_per_box: number;
    lot_prop1_as_lot: boolean;
    lot_prop2_as_lot: boolean;
    lot_prop3_as_lot: boolean;
    supplier_as_lot: boolean;
    has_serial_no: boolean;
    count_cycle_days: number;
    production_date_as_lot: boolean;
    production_date_mixed_days: number;
    storage_strategy: string;
    storage_date_as_lot: boolean;
    storage_date_mixed_days: string;
    pick_strategy: string;
    expiry_date_as_lot: boolean;
    expiry_date_mixed_days: number;
    created_from: string;
    created_time: string;
    created_operator: string;
    last_updated_time: string;
    last_updated_operator: string;
    item_prop1: string;
    item_prop2: string;
    item_prop3: string;
    item_prop4: string;
    item_prop5: string;
}

export interface IHCSupplier {
    supplier_code: string;
    supplier_name: string;
    supplier_status: string;
    supplier_alias_name: string;
    created_from: string;
    created_time: string;
    created_operator: string;
    last_updated_time: string;
    last_updated_operator: string;
}

export interface IHCLocation {
    location_code: string;
    location_status: string;
    location_row: number;
    location_column: number;
    location_layer: number;
    location_depth: number;
    abc_type: string;
    created_time: string;
    created_operator: string;
    last_updated_time: string;
    last_updated_operator: string;
}

export interface IHCBox {
    box_code: string;
    location_code: string;
    box_length: number;
    box_width: number;
    box_height: number;
    box_status: string;
    box_region_count: number;
    box_rated_capacity: number;
    created_time: string;
    created_operator: string;
    last_updated_time: string;
    last_updated_operator: string;
}

export interface IHCAllocatedBox {
    box_code: string;
    location_code: string;
}

export interface IHCBoxDetail {
    key?: string | number;
    box_region_id: number;
    item_code: string;
    item_detail?: IHCItem;
    quantity: number;
    orders: { order_code: string, quantity: number }[];
}

export interface IHCOrderType {
    order_type_name: string;
    work_type: string;
    last_updated_time: string;
    last_updated_operator: string;
    created_time: string;
    order_type_code: string;
    created_operator: string;
}

export interface IHCPickStation {
    key?: string | number;
    pick_station_code: string;
    pick_station_status: string;
    box_code: string;
    wcs_task_code: string;
    created_time: string;
    created_operator: string;
    last_updated_time: string;
    last_updated_operator: string;
}

export interface IHCPagination {
    page_no?: number;
    page_size?: number;
    total_count?: number;
}

export interface IHCInventorySummary {
    key?: string | number;
    inventory_summary_id: number;
    item_code: string;
    quantity: number;
    package_unit: string;
    pick_allocated_qty: number;
    storage_allocated_qty: number;
    created_time: string;
    created_operator: string;
    last_updated_time: string;
    last_updated_operator: string;
}

export interface IHCInventoryBox {
    key?: string | number;
    inventory_summary_id: number;
    item_code: string;
    quantity: number;
    box_code: string;
    box_region_id: number;
    box_inventory_id: number;
    pick_allocated_qty: number;
    storage_allocated_qty: number;
    package_unit: string;
    created_time: string;
    created_operator: string;
    last_updated_time: string;
    last_updated_operator: string;
}

export interface IHCInventoryItem {
    key?: string | number;
    inventory_summary_id: number;
    item_code: string;
    quantity: number;
    box_code: string;
    box_region_id: number;
    box_inventory_id: number;
    pick_allocated_qty: number;
    storage_allocated_qty: number;
    package_unit: string;
    created_time: string;
    created_operator: string;
    last_updated_time: string;
    last_updated_operator: string;
}