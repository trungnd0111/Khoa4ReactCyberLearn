import Axios from 'axios'
import { takeLatest } from 'redux-saga/effects'
import { call, put, takeEvery } from 'redux-saga/effects'
import { fork, take, delay } from 'redux-saga/effects'
import { ADD_TASK_API, CHECK_TASK_API, DELETE_TASK_API, GET_TASKLIST_API, GET_TASK_API, REJECT_TASK_API } from '../constants/ToDoListConst'
import { toDoListService } from '../../services/ToDoListServices'
import { STATUS_CODE } from '../../util/constants/settingSystem'
import { DISPLAY_LOADING, HIDE_LOADING } from '../constants/LoadingConst'
/*redux 2 loại action: 
    Loại 1: action => object (action thường)
    Loại 2: action => function (thường dùng để xử lý api hoặc gọi các action khác )

*/
//Action call api Lấy taskList từ backend về
function* getTaskApi(action) {
    // put (giống dispatch bên thunk)
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(3800);
    try {
        let { data, status } = yield call(toDoListService.getTaskApi)
        //Sau khi lấy giá trị thành công dùng put (giống dispatch bên thunk) 

        if (status = STATUS_CODE.SUCCCESS) {
            yield put({
                type: GET_TASK_API,
                taskList: data
            })
        } else {
            console.log('error')
        }
    } catch (error) {
        console.log('error', error.response.data)
    }
    yield put({
        type: HIDE_LOADING
    })
}
export function* theoDoiActionGetTaskApi() {
    yield takeLatest(GET_TASKLIST_API, getTaskApi)
}

//Action đưa task nhập từ bphím lên backend (AddTask)

function* addTaskApiAction(action) {
    const { taskName } = action;
    //Gọi api
    try {
        const { data, status } = yield call(() => { 
            return toDoListService.addTaskApi(taskName) });
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASKLIST_API
            })
        }

    } catch (err) {
        console.log(err);
    }
    //Hiển thị loading
    //thành công thì load lại task = cách gọi lại action saga load tasklist
}
export function* theoDoiActionAddTaskApi() {
    yield takeLatest(ADD_TASK_API, addTaskApiAction)
}
//Action xóa task lên backend (AddTask)

function* deleteTaskApi(action) {
    const { taskName } = action;
    //Gọi api
    try {
        const { data, status } = yield call(() => { 
            return toDoListService.deleteTaskApi(taskName) });
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASKLIST_API
            })
        }

    } catch (err) {
        console.log(err);
    }
    //Hiển thị loading
    //thành công thì load lại task = cách gọi lại action saga load tasklist
}
export function* theoDoiActiondeleteTaskApi() {
    yield takeLatest(DELETE_TASK_API, deleteTaskApi)
}

//Action check task lên backend (AddTask)

function* checkDoneTask(action) {
    const { taskName } = action;
    //Gọi api
    try {
        const { data, status } = yield call(() => { 
            return toDoListService.checkDoneTask(taskName) });
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASKLIST_API
            })
        }

    } catch (err) {
        console.log(err);
    }
    //Hiển thị loading
    //thành công thì load lại task = cách gọi lại action saga load tasklist
}
export function* theoDoiActiondoneTask() {
    yield takeLatest(CHECK_TASK_API, checkDoneTask)
}

//Action reject task lên backend (AddTask)

function* rejectTask(action) {
    const { taskName } = action;
    //Gọi api
    try {
        const { data, status } = yield call(() => { 
            return toDoListService.rejectTask(taskName) });
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASKLIST_API
            })
        }

    } catch (err) {
        console.log(err);
    }
    //Hiển thị loading
    //thành công thì load lại task = cách gọi lại action saga load tasklist
}
export function* theoDoiActionrejectTask() {
    yield takeLatest(REJECT_TASK_API, rejectTask)
}