import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Input, Select, Form, Button, Space } from 'antd';
import { addNewTask, editTask, deleteTask, taskSelector } from './slice';

const originData = [];

for (let i = 0; i < 3; i++) {
    originData.push({
        key: i.toString(),
        taskName: `Edrward ${i}`,
        taskStatus: 32,
    });
}

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

const EditableTable = () => {
    const [form] = Form.useForm();
    const taskList = useSelector(taskSelector);
    const dispatch = useDispatch();
    // const [data, setData] = useState(taskList);
    const [editingKey, setEditingKey] = useState('');


    const isEditing = (record) => record.key === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
            taskName: '',
            status: '',
            ...record,
        });
        setEditingKey(record.key);
    };

    const handleDelete = (key) => {
        // const newData = [...data];
        // setData(newData.filter(item => item.key !== key));
    }

    const handleAddTask = () => {
        const newRecord = {};
        // setData([...data, newRecord]);
        form.setFieldsValue({
            taskName: '',
            status: '',
            ...newRecord,
        });
        setEditingKey(newRecord.key);
    }

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            row.key = key;
            // const newData = [...data];
            // const index = newData.findIndex((item) => key === item.key);

            // if (index > -1) {
            // const item = newData[index];
            // newData.splice(index, 1, { ...item, ...row });
            // setData(newData);
            dispatch(editTask(row));
            setEditingKey('');
            // } else {
            // dispatch(addNewTask())
            // setEditingKey('');
            // }
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
                            onClick={() => save(record.key)}
                            style={{
                                marginRight: 8,
                            }}
                        >Save</Button>
                        <Button type="link" onClick={cancel}>Cancel</Button>
                    </span>
                ) : (
                    <Space align="center">
                        <Button type="primary" disabled={editingKey !== ''} onClick={() => edit(record)}>
                            Edit
                        </Button>
                        <Button type="danger" disabled={editingKey !== ''} onClick={() => handleDelete(record)}>
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

export default EditableTable;