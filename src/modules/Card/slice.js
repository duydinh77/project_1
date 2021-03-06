import { createSlice } from "@reduxjs/toolkit";

const initialValue = [{ taskName: "Hello", status: "created" }, { taskName: "World", status: "processing" }];

export const slice = createSlice({
    name: "taskSlice",
    initialState: {
        task: initialValue,
    },
    reducers: {
        addNewTask: (state, action) => {
            const newTask = { taskName: action.payload };
            state.task = [...state.task, newTask];
        },
        editTask: (state, action) => {
            const index = action.payload[1];
            const newTask = [...state.task];
            newTask[index] = action.payload[0];
            state.task = newTask;
        },
        deleteTask: (state, action) => {
            const newTask = state.task.filter(

            );
            state.task = newTask;
        }
    }
});

export const { addNewTask, editTask, deleteTask } = slice.actions;
export const taskSelector = (state) => state.taskSlice.task;
export default slice.reducer;