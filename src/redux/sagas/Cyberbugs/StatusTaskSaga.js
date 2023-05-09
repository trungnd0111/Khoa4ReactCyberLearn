import { takeLatest } from "redux-saga/effects"
import { call, put } from "redux-saga/effects"
import { statusService } from "../../../services/StatusService"
import { GET_ALL_STATUS_TASK, GET_ALL_STATUS_TASK_SAGA } from "../../../util/constants/CyberBugs/StatusConstants"
import { STATUS_CODE } from "../../../util/constants/settingSystem"

function* getAllStatusTaskSaga(action) {
    try {
        const { data, status } = yield call(() => statusService.getAllStatus())
        if (STATUS_CODE.SUCCCESS === status) {
            yield put({
                type: GET_ALL_STATUS_TASK,
                arrStatus: data.content
            })
        }
    } catch (error) {
        console.log(error)
    }
}
export function* theoDoigetAllTaskTypeSaga() {
    yield takeLatest(GET_ALL_STATUS_TASK_SAGA, getAllStatusTaskSaga);
}