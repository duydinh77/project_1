import { React, useState } from 'react';
import { Form, Input, Button, Space } from 'antd';

const CardForm = (props) => {
    const [form] = Form.useForm();

    const handleCard = (e) => {
        if (props.isEditing) {
            props.handleEdit();
        }
        if (props.isAdding) {
            props.handleAddCard();
        }
    }

    const handleAddCard = () => {
        const taskInput = document.querySelector('#task_input');
        props.handleAddCard(taskInput.value);
    }

    const handleEditCard = () => {
        const taskInput = document.querySelector('#task_input');
        props.handleEditCard(taskInput.value)
    }

    return (
        <Form layout="vertical" form={form}>
            <Form.Item name="cardName">
                <Input id="task_input" defaultValue={props.taskName} />
            </Form.Item>
            <Form.Item>
                <Space>
                    {props.isAdding &&
                        <Button type="primary" onClick={() => handleAddCard()}>Add a card</Button>
                    }
                    {props.isEditing &&
                        <Button type="primary" onClick={() => handleEditCard()}>Save</Button>
                    }
                    <Button id="close-form" onClick={(e) => handleCard(e)}>Close</Button>
                </Space>
            </Form.Item>
        </Form>
    )
}

export default CardForm;