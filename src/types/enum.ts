// export enum emOrderStatus {
//     CREATED = '0',
//     ACTIVATED = '1',
//     PAUSED = '2',
//     WORKING = '3',
//     DONE = '4',
//     ABORT = '5',
// }

export let emOrderStatus: { [s: string]: string } = {
    "0": "CREATED",
    "1": "ACTIVATED",
    "2": "PAUSED",
    "3": "WORKING",
    "4": "DONE",
    "5": "ABORT",
}