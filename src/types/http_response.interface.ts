import { IHCBox, IHCInboundOrder, IHCItem, IHCLocation, IHCOrderType, IHCOutboundOrder, IHCSupplier, IHCWcsTask } from "./interface"

export interface HttpResponse {
    result_code: number
    result_msg: string
    data: any
}

export interface IHCResPagination extends HttpResponse {
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

export interface IHCGetItemDetailRes extends HttpResponse {
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

export interface IHCGetSupplierDetailRes extends HttpResponse {
    data: IHCSupplier
}

export interface IHCGetLocationDetailRes extends HttpResponse {
    data: IHCLocation
}

export interface IHCGetBoxDetailRes extends HttpResponse {
    data: IHCBox
}

export interface IHCGetOderTypeDetailRes extends HttpResponse {
    data: IHCOrderType
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

export interface IHCGetWorkbenchWcsTasksRes extends HttpResponse {
    data: {
        total_count: number
        page_no: number
        page_size: number
        data_list: IHCWcsTask[]
    }
}