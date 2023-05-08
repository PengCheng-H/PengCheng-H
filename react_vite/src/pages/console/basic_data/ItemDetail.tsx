import { Input, Row } from "antd";
import { useEffect, useState } from "react";
import { IHCItem } from "src/interfaces/interface";
import './index.css';

interface ItemDetailProps {
    item: IHCItem
    setItem: (newData: IHCItem) => void
}

export default function ItemDetail(props: ItemDetailProps) {
    return <div className="modal-detail">
        <Row><label>货码：</label><span>{props.item.item_code}</span></Row>
        <Row><label>名称：</label><Input value={props.item.item_name} onChange={(e) => props.setItem({ ...props.item, item_name: e.target.value })} /></Row>
        <Row><label>别名：</label><Input value={props.item.item_alias_name} onChange={(e) => props.setItem({ ...props.item, item_alias_name: e.target.value })} /></Row>
        <Row><label>扩展码1：</label><Input value={props.item.item_extend_code1} onChange={(e) => props.setItem({ ...props.item, item_extend_code1: e.target.value })} /></Row>
        <Row><label>扩展码2：</label><Input value={props.item.item_extend_code2} onChange={(e) => props.setItem({ ...props.item, item_extend_code2: e.target.value })} /></Row>
    </div>
}