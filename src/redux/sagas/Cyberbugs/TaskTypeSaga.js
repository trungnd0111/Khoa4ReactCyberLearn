import { takeLatest } from "redux-saga/effects"
import { call, put } from "redux-saga/effects"
import { taskTypeService } from "../../../services/TaskTypeService"
import { STATUS_CODE } from "../../../util/constants/settingSystem"
import { GET_ALL_TASK_TYPE, GET_ALL_TASK_TYPE_SAGA } from "../../constants/Cyberbugs/TaskTypeConstant"

function* getAllTaskTypeSaga(action) {
    try {
        const { data, status } = yield call(() => taskTypeService.getAllTaskType())
        if (STATUS_CODE.SUCCCESS === status) {
            yield put({
                type: GET_ALL_TASK_TYPE,
                arrTaskType: data.content
            })
        }
    } catch (error) {
        console.log(error)
    }
}
export function* theoDoigetAllTaskTypeSaga() {
    yield takeLatest(GET_ALL_TASK_TYPE_SAGA, getAllTaskTypeSaga);
}