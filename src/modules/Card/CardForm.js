import { React } from 'react';
import { Form, Input, Button, Space } from 'antd';

const CardForm = (props) => {
    const handleClose = (e) => {
        if (props.isEditing) {
            props.handleEditCard();
        }
        if (props.isAdding) {
            props.handleAddCard();
        }
    }

    const handleAddCard = () => {
        const taskInput = document.querySelector('#task_input');
        if (taskInput) {
            if (taskInput.value) {
                props.handleAddCard(taskInput.value);
            }
        }
    }

    const handleEditCard = () => {
        const taskInput = document.querySelector('#task_input');
        props.handleEditCard(taskInput.value)
    }

    const handleDeleteCard = () => {
        props.handleDeleteCard();
    }

    return (
        <Form layout="vertical">
            <Form.Item name="cardName">
                <Input id="task_input" defaultValue={props.taskName} />
            </Form.Item>
            <Form.Item>
                <Space>
                    {props.isAdding &&
                        <Button type="primary" onClick={() => handleAddCard()}>Add a card</Button>
                    }
                    {props.isEditing &&
                        <>
                            <Button type="primary" onClick={() => handleEditCard()}>Save</Button>
                            <Button type="danger" onClick={() => handleDeleteCard()}>Delete</Button>
                        </>
                    }
                    <Button id="close-form" onClick={(e) => handleClose(e)}>Close</Button>
                </Space>
            </Form.Item>
        </Form>
    )
}

export default CardForm;