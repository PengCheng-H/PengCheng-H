import { IHCAllocatedBox, IHCBox, IHCInboundOrder, IHCInventoryBox, IHCInventoryItem, IHCInventorySummary, IHCItem, IHCLocation, IHCOrderType, IHCOutboundOrder, IHCPickStation, IHCSupplier, IHCTaskDetail, IHCWcsTask } from "./interface"

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

export interface IHCGetLocationRes extends IHCResPagination {
    data: {
        total_count: number
        page_no: number
        page_size: number
        data_list: IHCLocation[]
    }
}

export interface IHCGetBoxDetailRes extends IHCResponse {
    data: IHCTaskDetail;
}
export interface IHCGetBoxRes extends IHCResPagination {
    data: {
        total_count: number
        page_no: number
        page_size: number
        data_list: IHCBox[]
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

export interface IHCInventoryFindEmptyBoxesRes extends IHCResponse {
    data: {
        total_count: number
        page_no: number
        page_size: number
        data_list: IHCAllocatedBox[]
    }
}

export interface IHCInventorySummaryFindRes extends IHCResponse {
    data: {
        total_count: number
        page_no: number
        page_size: number
        data_list: IHCInventorySummary[]
    }
}

export interface IHCInventoryBoxesFindRes extends IHCResponse {
    data: {
        total_count: number
        page_no: number
        page_size: number
        data_list: IHCInventoryBox[]
    }
}

export interface IHCInventoryItemsFindRes extends IHCResponse {
    data: {
        total_count: number
        page_no: number
        page_size: number
        data_list: IHCInventoryItem[]
    }
}