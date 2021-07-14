import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Input, Select, Form, Button, Space } from 'antd';
import { addNewTask, editTask, deleteTask, taskSelector } from './slice';

// "https://60ee57a1eb4c0a0017bf43bf.mockapi.io/tasks"

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    let inputNode = <Input />;
    if (inputType === 'select') {
        inputNode =
            <Select>
                <Select.Option key="Created" >Created</Select.Option>
                <Select.Option key="Processing" >Processing</Select.Option>
                <Select.Option key="Done" >Done</Select.Option>
            </Select>
    }

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const ToDo = () => {
    const [form] = Form.useForm();
    const taskList = useSelector(taskSelector);
    const dispatch = useDispatch();
    const [editingKey, setEditingKey] = useState('');


    const isEditing = (record) => record.key === editingKey;

    const handleEdit = (record) => {
        form.setFieldsValue({
            taskName: '',
            status: '',
            ...record,
        });
        setEditingKey(record.key);
    };

    const handleDelete = (key) => {
        dispatch(deleteTask(key));
    }

    const handleAddTask = () => {
        const newRecord = {};
        form.setFieldsValue({
            taskName: '',
            status: '',
            ...newRecord,
        });
        setEditingKey(newRecord.key);
        dispatch(addNewTask(newRecord));
    }

    const handleCancle = () => {
        setEditingKey('');
    };

    const handleSave = async (key) => {
        try {
            const data = await form.validateFields();
            data.key = key;
            dispatch(editTask(data));
            setEditingKey('');
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: 'Task',
            dataIndex: 'taskName',
            editable: true,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            editable: true,
        },
        {
            title: 'Action',
            dataIndex: 'taskAction',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Button type="link"
                            onClick={() => handleSave(record.key)}
                            style={{
                                marginRight: 8,
                            }}
                        >Save</Button>
                        <Button type="link" onClick={handleCancle}>Cancel</Button>
                    </span>
                ) : (
                    <Space align="center">
                        <Button type="primary" disabled={editingKey !== ''} onClick={() => handleEdit(record)}>
                            Edit
                        </Button>
                        <Button type="danger" disabled={editingKey !== ''} onClick={() => handleDelete(record.key)}>
                            Delete
                        </Button>
                    </Space>
                );
            },
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'status' ? 'select' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <>
            <Button
                onClick={() => handleAddTask()}
                type="primary"
                style={{
                    marginBottom: 16,
                }}
            >Add a task
            </Button>
            <Form form={form} component={false}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    bordered
                    dataSource={taskList}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={false}
                />
            </Form>
        </>
    );
};

export default ToDo;