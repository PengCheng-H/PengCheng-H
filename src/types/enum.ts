export let emOrderStatus: { [s: string]: string } = {
    "0": "订单已创建",
    "1": "订单已激活",
    "2": "订单暂停中",
    "3": "订单进行中",
    "4": "订单已完成",
    "5": "订单已终止",
}

export let emWcsTaskStatus: { [s: string]: string } = {
    "0": "任务已创建",
    "1": "任务已激活",
    "2": "料箱已到达拣货台",
    "3": "料箱已离开拣货台",
    "4": "任务已完成",
    "5": "任务已终止",
}

export let emWPickStationStatus: { [s: string]: string } = {
    "0": "拣货台已被禁用",
    "1": "拣货台空闲中",
    "2": "拣货台已被占用",
}
