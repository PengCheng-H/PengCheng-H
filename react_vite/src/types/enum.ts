export enum WorkTypes {
    INBOUND = '0',
    OUTBOUND = '1',
}


export enum CreatedFrom {
    API = '0',
    MANUAL = '1',
    AUTO = '2',
}


export enum StorageStrategy {
    MIN_BOX_USERD = '1',
    LOT_FIRST = '2',
}


export enum PickStrategy {
    MAX_BOX_RELEASED = '1',
    FIFO = '2',
}

export enum ItemStatus {
    DISABLED = '0',
    ENABLED = '1',
    IGNORED = '2',
}

export enum SupplierStatus {
    DISABLED = '0',
    ENABLED = '1',
}


export enum LocationStatus {
    DISABLED = '0',
    ENABLED = '1',
}


export enum PickStationStatus {
    DISABLED = '0',
    IDLE = '1',
    ALLOCATED = '2',
}


export enum BoxStatus {
    DISABLED = '0',
    ENABLED = '1',
}


export enum SequenceNoType {
    INBOUND_ORDER_CODE = 1,
    OUTBOUND_ORDER_CODE = 2,
    WMS_TASK_CODE = 3,
    WCS_TASK_CODE = 4,
}

export enum OrderStatus {
    CREATED = '0',
    ACTIVATED = '1',
    PAUSED = '2',
    WORKING = '3',
    DONE = '4',
    CLOSED = '7',
    IGNORED = '8',
    DELETED = '9',
}
