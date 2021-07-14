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
        task: initialValue,
    },
    reducers: {
        addNewTask: (state, action) => {
            state.task.push(action.payload);
        },
        editTask: (state, action) => {
            const record = action.payload;
            console.log(state.task);
            // const newTask = [...state.taskSlice.task];
            // console.log("Test1", newTask);
            // const index = newTask.findIndex(item => record.key === item.key)
            // newTask[index] = record;
            // console.log("Test2", newTask);
            // state.task = newTask;
        },
        deleteTask: (state, action) => {
            const newTask = state.task.filter(
                (item) => state.task.indexOf(item) !== action.payload
            );
            state.task = newTask;
        }
    }
});

export const { addNewTask, editTask, deleteTask } = slice.actions;
export const taskSelector = (state) => state.taskSlice.task;
export default slice.reducer;