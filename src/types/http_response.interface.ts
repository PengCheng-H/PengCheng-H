import { IHCBox, IHCBoxDetail, IHCInboundOrder, IHCItem, IHCLocation, IHCOrderType, IHCOutboundOrder, IHCPickStation, IHCSupplier, IHCWcsTask } from "./interface"

export interface IHCResponse {
    result_code: number
    result_msg: string
    data: any
}

export interface IHCResPagination extends IHCResponse {
    data: {
        total_count: number
        page_no: number
        page_size: number
        data_list: any[]
    }
}

export interface IHCGetItemsRes extends IHCResPagination {
    data: {
        total_count: number
        page_no: number
        page_size: number
        data_list: IHCItem[]
    }
}

export interface IHCGetItemDetailRes extends IHCResponse {
    data: IHCItem
}

export interface IHCGetSupplierRes extends IHCResPagination {
    data: {
        total_count: number
        page_no: number
        page_size: number
        data_list: IHCSupplier[]
    }
}

export interface IHCGetSupplierDetailRes extends IHCResponse {
    data: IHCSupplier
}

export interface IHCGetLocationDetailRes extends IHCResponse {
    data: IHCLocation
}

export interface IHCGetBoxDetailRes extends IHCResponse {
    data: {
        task_type: string
        box_code: string
        region_task_details: IHCBoxDetail[]
    }
}

export interface IHCGetOderTypeDetailRes extends IHCResponse {
    data: IHCOrderType
}

export interface IHCGetPickStationRes extends IHCResponse {
    data: IHCPickStation
}
export interface IHCGetPickStationsRes extends IHCResponse {
    data: IHCPickStation[]
}

export interface IHCGetInboundOrdersRes extends IHCResPagination {
    data: {
        total_count: number
        page_no: number
        page_size: number
        data_list: IHCInboundOrder[]
    }
}

export interface IHCGetOutboundOrdersRes extends IHCResPagination {
    data: {
        total_count: number
        page_no: number
        page_size: number
        data_list: IHCOutboundOrder[]
    }
}

export interface IHCGetWorkbenchWcsTasksRes extends IHCResponse {
    data: {
        total_count: number
        page_no: number
        page_size: number
        data_list: IHCWcsTask[]
    }
}