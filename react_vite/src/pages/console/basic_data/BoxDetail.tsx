import { Input, Row } from "antd";

import { IHCBox } from "src/interfaces/interface";
import './index.css';

interface BoxDetailProps {
    box: IHCBox
    setBox: (newData: IHCBox) => void
}

export default function BoxDetail(props: BoxDetailProps) {
    return <div className="modal-detail">
        <Row><label>料箱编号：</label><span>{props.box.box_code}</span></Row>
        <Row><label>料箱状态：</label><Input value={props.box.box_status} onChange={(e) => props.setBox({ ...props.box, box_status: e.target.value })} /></Row>
        <Row><label>长度：</label><Input value={props.box.box_length} onChange={(e) => props.setBox({ ...props.box, box_length: parseInt(e.target.value) })} /></Row>
        <Row><label>宽度：</label><Input value={props.box.box_width} onChange={(e) => props.setBox({ ...props.box, box_width: parseInt(e.target.value) })} /></Row>
        <Row><label>高度：</label><Input value={props.box.box_height} onChange={(e) => props.setBox({ ...props.box, box_height: parseInt(e.target.value) })} /></Row>
        <Row><label>分区数量：</label><Input value={props.box.box_region_count} onChange={(e) => props.setBox({ ...props.box, box_region_count: parseInt(e.target.value) })} /></Row>
        <Row><label>默认满箱数量：</label><Input value={props.box.box_rated_capacity} onChange={(e) => props.setBox({ ...props.box, box_rated_capacity: parseInt(e.target.value) })} /></Row>
        <Row><label>货位码：</label><Input value={props.box.location_code} onChange={(e) => props.setBox({ ...props.box, location_code: e.target.value })} /></Row>
    </div>
}