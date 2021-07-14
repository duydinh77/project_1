import { configureStore } from '@reduxjs/toolkit'
import taskReducer from './modules/ToDo/slice';
import createSagaMiddleware from 'redux-saga';
import toDoSaga from './modules/ToDo/sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        taskSlice: taskReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware)
});
sagaMiddleware.run(toDoSaga);
export default store;