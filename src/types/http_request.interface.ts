import * as IBase from "./interface";

export interface IHCRequest { }

export interface IHCInventoryFindEmptyBoxesReq extends IHCRequest {
    box_code?: string;
    is_allocated?: boolean;
    include_item_code?: string;
    rows?: number[];
    columns?: number[];
    layers?: number[];
    pagination_param?: IBase.IHCPagination;
}

// OrderInboundManualAllocateDetails
export interface IHCOrderInboundManaulAllocateDetailsReq extends IHCRequest {
    order_code: string,
    order_details: {
        order_detail_id: number,
        box_code: string,
        allocate_quantity: number
    }[]
}