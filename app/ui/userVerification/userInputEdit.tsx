import { Button, Form, Input, Space } from "antd"
import { EditOutlined } from "@ant-design/icons"
import { useState } from "react";
import { getAntdFieldRequiredRule } from "@/app/helpers/validation";

export default function UserInputEdit(props: any) {

    const [inputDisabled, setInputDisabled] = useState(true);

    const editButton = (
        <Button className="float-right" icon={<EditOutlined/>} onClick={() => {
            setInputDisabled(!inputDisabled);
        }}>
        </Button>
    )

    return (
        <Form.Item name={props.name} label={props.label} rules={getAntdFieldRequiredRule("This field is required")}>
            <Space.Compact>
                <Input defaultValue={props.value} disabled={inputDisabled} type={props.type || "text"} /> {editButton}
            </Space.Compact>
        </Form.Item>
    )
}