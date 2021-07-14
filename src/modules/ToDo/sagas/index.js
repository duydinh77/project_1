import { all, call, put, takeLatest } from "@redux-saga/core/effects"
import { fetchToDo } from "../../../api/taskApi";
import {fetchTodosSuccess, fetchTodosFailure} from '../slice';

export default function* toDoSaga() {
    yield all([takeLatest('taskSlice/fetchTodos', fetchToDos)]);
}

function* fetchToDos(action) {
    try {
        const res = yield call(fetchToDo);
        yield put(fetchTodosSuccess(res));
    } catch (error) {
        yield put(fetchTodosFailure(error))
    }
}