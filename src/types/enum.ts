export const em_order_status: { [s: string]: string } = {
    "0": "订单已创建",
    "1": "订单已激活",
    "2": "订单暂停中",
    "3": "订单进行中",
    "4": "订单已完成",
    "5": "订单已终止",
}

export const em_wcs_task_status: { [s: string]: string } = {
    "0": "已创建",
    "1": "已激活",
    "2": "料箱到达拣货台",
    "3": "料箱离开拣货台",
    "4": "已完成",
    "5": "已终止",
}

export const em_pick_station_status: { [s: string]: string } = {
    "0": "已禁用",
    "1": "空闲中",
    "2": "已分配任务",
}

export const em_wcs_task_types: { [s: string]: string } = {
    "0": "入库单任务",
    "1": "出库单任务",
}