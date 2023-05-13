import { IHCInboundOrder } from "src/interfaces/interface"

interface InboundAllocateDetailBoxProps {
    curOrder: IHCInboundOrder
    orderList: IHCInboundOrder[];
    setOrderList: (orders: IHCInboundOrder[]) => void;
}

export default function InboundAllocateDetailBox(props: InboundAllocateDetailBoxProps) {
    return <>
        <h1>InboundAllocateOrderBox</h1>
    </>
}