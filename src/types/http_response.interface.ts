import { IHCBox, IHCBoxDetail, IHCInboundOrder, IHCItem, IHCLocation, IHCOrderType, IHCOutboundOrder, IHCPickStation, IHCSupplier, IHCWcsTask } from "./interface"

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
    data: {
        task_type: string
        box_code: string
        region_task_details: IHCBoxDetail[]
    }
}

export interface IHCGetOderTypeDetailRes extends HttpResponse {
    data: IHCOrderType
}

export interface IHCGetPickStationRes extends HttpResponse {
    data: IHCPickStation
}
export interface IHCGetPickStationsRes extends HttpResponse {
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

export interface IHCGetWorkbenchWcsTasksRes extends HttpResponse {
    data: {
        total_count: number
        page_no: number
        page_size: number
        data_list: IHCWcsTask[]
    }
}