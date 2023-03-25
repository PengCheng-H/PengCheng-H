export const em_order_status: { [s: string]: string } = {
    "0": "已创建",
    "1": "已激活",
    "2": "暂停中",
    "3": "进行中",
    "4": "已完成",
    "5": "已终止",
    "7": "已关闭",
    "8": "已忽略",
    "9": "已删除",
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