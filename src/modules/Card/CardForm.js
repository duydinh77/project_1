import {React, useState} from 'react';
import { Form, Input, Button, Space } from 'antd';

const CardForm = (props) => {
    const [form] = Form.useForm();
    const [isAdding, setIsAdding] = useState(false);
    setIsAdding(
        (props.isAdding ? true : false)
    )

    return (
        <Form layout="vertical" form={form}>
            <Form.Item name="cardName">
                <Input value="123" />
            </Form.Item>
            <Form.Item>
                <Space>
                    <Button type="primary">
                        {isAdding && "Add Card"}
                        {!isAdding && "Edit"}
                    </Button>
                    <Button>Close</Button>
                </Space>
            </Form.Item>
        </Form>
    )
}

export default CardForm;