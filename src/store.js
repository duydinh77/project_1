import {configureStore} from '@reduxjs/toolkit'
import taskReducer from './modules/Card/slice';
const store = configureStore({
    reducer: {
        taskSlice: taskReducer
    }
});

export default store;