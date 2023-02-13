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
