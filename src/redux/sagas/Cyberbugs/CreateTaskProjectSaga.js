import { select, takeLatest } from "redux-saga/effects"
import { delay } from "redux-saga/effects"
import { call, put } from "redux-saga/effects"
import { taskService } from "../../../services/TaskService"
import { STATUS_CODE } from "../../../util/constants/settingSystem"
import { notifiFunction } from "../../../util/Notification/notificationCyberbugs"
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst"


function* getCreateTaskProjectSaga(action) {
    //HIỂN THỊ LOADING
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);

    try {
        const { data, status } = yield call(() => taskService.createTask(action.taskObject))
        if (STATUS_CODE.SUCCCESS === status) {
            yield put({
                type: 'GET_TASK_DETAIL_SAGA',
            })

            yield notifiFunction('success', 'Create Task Success !', `Create Task successful !`)
            yield put({
                type: 'CLOSE_DRAWER'
            })

        }
    } catch (error) {
        console.log(error.response.data)
        yield notifiFunction('error', 'error Create Task unSuccess !', `Error Create Task unsuccessful !`)

    }
    yield put({
        type: HIDE_LOADING
    })
}
export function* theoDoigetAllTaskTypeSaga() {
    yield takeLatest('CREATE_TASK_SAGA', getCreateTaskProjectSaga);
}

function* getTaskDetailSaga(action) {

    const { taskId } = action

    try {
        const { data, status } = yield call(() => taskService.getTaskDetail(taskId))
        if (STATUS_CODE.SUCCCESS === status) {
            yield put({
                type: 'GET_TASK_DETAIL',
                taskDetailModal: data?.content
            })
        }
    } catch (error) {
        console.log(error.response.data)
    }
}

export function* theoDoigetTaskDetailSaga() {
    yield takeLatest('GET_TASK_DETAIL_SAGA', getTaskDetailSaga);
}

//bai63
function* UpdateTaskStatusSaga(action) {

    const { taskUpdateStatus } = action

    try {
        //Cập nhật api status cho task hiện tại (Task đang mở modal)
        const { data, status } = yield call(() => taskService.updateStatusTask(taskUpdateStatus))
        if (STATUS_CODE.SUCCCESS === status) {
            //sau khi thành công gọi lại getProjectDetail saga để sắp xếp lại thông tin các task
            yield put({
                type: 'GET_PROJECT_DETAIL_SAGA',
                projectId: taskUpdateStatus.projectId
            })
        }
    } catch (error) {
        console.log(error.response.data)
    }
}
export function* theoDoiUpdateTaskStatusSaga() {
    yield takeLatest('UPDATE_STATUS_TASK_SAGA', UpdateTaskStatusSaga);
}

//Bài 67
function* UpdateTaskSaga(action) {

}

export function* theoDoiUpdateTaskSaga() {
    yield takeLatest('UPDATE_TASK_SAGA', UpdateTaskSaga)
}

export function* handleChangePostApi(action) {
    //Gọi action làm thay đổi taskDetail modal
    switch (action.actionType) {
        case 'CHANGE_TASK_MODAL': {
            const { value, name } = action
            yield put({
                type: 'CHANGE_TASK_MODAL',
                name,
                value
            })
        };
            break;
        case 'CHANGE_ASSIGNESS': {
            const { userSelected } = action
            yield put({
                type: "CHANGE_ASSIGNESS",
                userSelected
            })
        };
            break;
        case 'REMOVE_USER_ASSIGN': {
            const { userId } = action
            yield put({
                type: "REMOVE_USER_ASSIGN",
                userId
            })
        };
            break;
    }
    //Save qua api updateTaskSaga
    //Lấy dữ liệu từ state.taskDetailModal
    const { taskDetailModal } = yield select(state => state.TaskReducer)
    console.log('TaskDetailModal sau khi thay đổi', taskDetailModal)
    //Biến đổi dữ liệu state.taskDetailModal thành dữ liệu api cần
    const listUserAsign = taskDetailModal.assigness?.map((user, index) => {
        return user.id;
    });
    console.log('listUserAsign', listUserAsign)
    const taskUpdateApi = { ...taskDetailModal, listUserAsign }
    try {
        const { data, status } = yield call(() => taskService.updateTask(taskUpdateApi));
        if (status === STATUS_CODE.SUCCCESS) {
            //sau khi thành công gọi lại getProjectDetail saga để sắp xếp lại thông tin các task
            yield put({
                type: 'GET_PROJECT_DETAIL_SAGA',
                projectId: taskUpdateApi.projectId
            })
            yield put({
                type: 'GET_TASK_DETAIL_SAGA',
                taskId: taskUpdateApi.taskId
            })
        }
    } catch (error) {
        console.log(error.response.data)
    }

}

export function* theoDoihandleChangePostApi() {
    yield takeLatest('HANDLE_CHANGE_POST_API_SAGA', handleChangePostApi)
}