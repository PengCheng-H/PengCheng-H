import { Input, Row } from "antd";

import { IHCSupplier } from "src/interfaces/interface";
import './index.css';

interface SupplierDetailProps {
    supplier: IHCSupplier
    setSupplier: (newData: IHCSupplier) => void
}

export default function SupplierDetail(props: SupplierDetailProps) {
    return <div className="modal-detail">
        <Row><label>供应商编号：</label><span>{props.supplier.supplier_code}</span></Row>
        <Row><label>供应商名称：</label><Input value={props.supplier.supplier_name} onChange={(e) => props.setSupplier({ ...props.supplier, supplier_name: e.target.value })} /></Row>
        <Row><label>供应商别名：</label><Input value={props.supplier.supplier_alias_name} onChange={(e) => props.setSupplier({ ...props.supplier, supplier_alias_name: e.target.value })} /></Row>
        <Row><label>供应商状态：</label><Input value={props.supplier.supplier_status} onChange={(e) => props.setSupplier({ ...props.supplier, supplier_status: e.target.value })} /></Row>
    </div>
}