import { Input, Row } from "antd";
import { IHCItem } from "src/interfaces/interface";
import './index.css';

interface ItemDetailProps {
    item: IHCItem
    setItem: (newData: IHCItem) => void
}

export default function ItemDetail(props: ItemDetailProps) {
    return <div className="modal-detail">
        <Row><label>物品码：</label><span>{props.item.item_code}</span></Row>
        <Row><label>状态</label><Input value={props.item.item_status} onChange={(e) => props.setItem({ ...props.item, item_status: e.target.value })} /></Row>
        <Row><label>名称：</label><Input value={props.item.item_name} onChange={(e) => props.setItem({ ...props.item, item_name: e.target.value })} /></Row>
        <Row><label>别名：</label><Input value={props.item.item_alias_name} onChange={(e) => props.setItem({ ...props.item, item_alias_name: e.target.value })} /></Row>
        <Row><label>扩展码1：</label><Input value={props.item.item_extend_code1} onChange={(e) => props.setItem({ ...props.item, item_extend_code1: e.target.value })} /></Row>
        <Row><label>扩展码2：</label><Input value={props.item.item_extend_code2} onChange={(e) => props.setItem({ ...props.item, item_extend_code2: e.target.value })} /></Row>
        <Row><label>长度(mm)：</label><Input value={props.item.item_length} onChange={(e) => props.setItem({ ...props.item, item_length: parseInt(e.target.value) })} /></Row>
        <Row><label>宽度(mm)：</label><Input value={props.item.item_width} onChange={(e) => props.setItem({ ...props.item, item_width: parseInt(e.target.value) })} /></Row>
        <Row><label>高度(mm)：</label><Input value={props.item.item_height} onChange={(e) => props.setItem({ ...props.item, item_height: parseInt(e.target.value) })} /></Row>
        <Row><label>体积(mm³)：</label><Input value={props.item.item_volume} onChange={(e) => props.setItem({ ...props.item, item_volume: parseInt(e.target.value) })} /></Row>
        <Row><label>重量(g)：</label><Input value={props.item.item_weight} onChange={(e) => props.setItem({ ...props.item, item_weight: parseInt(e.target.value) })} /></Row>
        <Row><label>包装单位：</label><Input value={props.item.package_unit} onChange={(e) => props.setItem({ ...props.item, package_unit: e.target.value })} /></Row>
        <Row><label>满箱数量：</label><Input value={props.item.max_qty_per_box} onChange={(e) => props.setItem({ ...props.item, max_qty_per_box: parseInt(e.target.value) })} /></Row>
        <Row><label>ABC类型：</label><Input value={props.item.abc_type} onChange={(e) => props.setItem({ ...props.item, abc_type: e.target.value })} /></Row>
    </div>
}