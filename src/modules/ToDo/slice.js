import { createSlice } from "@reduxjs/toolkit";

const initialValue = [
    { key: 1, taskName: "Hello", status: "created" },
    { key: 2, taskName: "World", status: "processing" },
    { key: 3, taskName: "World1", status: "processing" },
    { key: 4, taskName: "World2", status: "processing" },
];

export const slice = createSlice({
    name: "taskSlice",
    initialState: {
        task: [],
    },
    reducers: {
        addNewTask: (state, action) => {
            state.task.push(action.payload);
        },
        editTask: (state, action) => {
            const record = action.payload;
            const newTask = [...state.task];
            const index = newTask.findIndex(item => record.key !== item.key)
            newTask[index] = record;
            state.task = newTask;
        },
        deleteTask: (state, action) => {
            const newTask = state.task.filter(
                (item) => item.key !== action.payload
            );
            state.task = newTask;
        },
        fetchTodos: () => {

        },
        fetchTodosSuccess: (data) => {
            // state.task = data;
        },
        fetchTodosFailure: (error) => {
            console.log(error);
        }
    }
});

export const { addNewTask, editTask, deleteTask, fetchTodosSuccess, fetchTodosFailure } = slice.actions;
export const taskSelector = (state) => state.taskSlice.task;
export default slice.reducer;