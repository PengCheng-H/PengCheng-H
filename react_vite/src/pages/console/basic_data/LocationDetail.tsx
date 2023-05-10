import { Input, Row } from "antd";

import { IHCLocation } from "src/interfaces/interface";
import './index.css';

interface CellDetailProps {
    location: IHCLocation
    setLocation: (newData: IHCLocation) => void
}

export default function LocationDetail(props: CellDetailProps) {
    return <div className="modal-detail">
        <Row><label>料箱编码：</label><span>{props.location.location_code}</span></Row>
        <Row><label>料箱状态：</label><Input value={props.location.location_status} onChange={(e) => props.setLocation({ ...props.location, location_status: e.target.value })} /></Row>
        <Row><label>长度：</label><Input value={props.location.location_row} onChange={(e) => props.setLocation({ ...props.location, location_row: parseInt(e.target.value) })} /></Row>
        <Row><label>宽度：</label><Input value={props.location.location_column} onChange={(e) => props.setLocation({ ...props.location, location_column: parseInt(e.target.value) })} /></Row>
        <Row><label>高度：</label><Input value={props.location.location_layer} onChange={(e) => props.setLocation({ ...props.location, location_layer: parseInt(e.target.value) })} /></Row>
        <Row><label>深度：</label><Input value={props.location.location_depth} onChange={(e) => props.setLocation({ ...props.location, location_depth: parseInt(e.target.value) })} /></Row>
        <Row><label>ABC类型：</label><Input value={props.location.abc_type} onChange={(e) => props.setLocation({ ...props.location, abc_type: e.target.value })} /></Row>
    </div>
}