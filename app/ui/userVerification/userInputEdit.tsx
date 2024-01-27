import { Button, Form, Input, Space } from "antd"
import { EditOutlined } from "@ant-design/icons"
import { useState } from "react";

export default function UserInputEdit(props: any) {

    const [inputDisabled, setInputDisabled] = useState(true);

    const editButton = (
        <Button className="float-right" icon={<EditOutlined/>} onClick={() => {
            setInputDisabled(!inputDisabled);
        }}>
        </Button>
    )

    if (props.type=="date") return (
        <Form.Item name={props.name} label={props.label} rules={[{ required: !inputDisabled }]} 
        initialValue={props.value}>
            <Space.Compact>
                <Input defaultValue={props.value} disabled={inputDisabled} type="date" /> {editButton}
            </Space.Compact>
        </Form.Item>
    )

    if (props.type=="codFisc") return (
        <Form.Item name={props.name} label={props.label} rules={[{ required: !inputDisabled }]} initialValue={props.value}>
            <Space.Compact>
                <Input defaultValue={props.value} disabled={inputDisabled} type="text" maxLength={16} className='uppercase'/> {editButton}
            </Space.Compact>
        </Form.Item>
    )

    return (
        <Form.Item name={props.name} label={props.label} rules={[{ required: !inputDisabled }]} initialValue={props.value}>
            <Space.Compact>
                <Input defaultValue={props.value} disabled={inputDisabled} type="text" /> {editButton}
            </Space.Compact>
        </Form.Item>
    )

    
}