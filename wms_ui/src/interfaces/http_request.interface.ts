export interface IHCRequest {
    [key: string]: unknown;
}

export interface IHCInventoryFindEmptyBoxesReq extends IHCRequest {
    box_code?: string;
    is_allocated?: boolean;
    include_item_code?: string;
    rows?: number[];
    columns?: number[];
    layers?: number[];
    page_no?: number
    page_size?: number
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