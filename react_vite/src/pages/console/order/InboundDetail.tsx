import { Form, Table } from "antd";


interface EditableRowProps {
    index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            {/* <EditableContext.Provider value={form}> */}
                {/* <tr {...props} /> */}
            {/* </EditableContext.Provider> */}
        </Form>
    );
};

const SecondEditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            {/* <EditableContext.Provider value={form}> */}
                {/* <tr {...props} /> */}
            {/* </EditableContext.Provider> */}
        </Form>
    );
};

export default function InboundDetail() {
    return <Table
        className="virtual-table"
        // components={{
        //     body: {
        //         row: SecondEditableRow,
        //         cell: SecondEditableCell,
        //     },
        // }}
        // rowClassName={() => 'editable-row'}
        // bordered
        // columns={second_columns_final as ColumnsType<IHCInboundOrderDetail>}
        // dataSource={record.order_details || []}
        pagination={false}
        scroll={{ x: 960, y: 300 }}
        style={{ marginLeft: "65px" }}
    />;
}