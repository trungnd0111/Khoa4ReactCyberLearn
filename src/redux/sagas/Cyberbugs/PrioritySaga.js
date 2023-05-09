import { takeLatest } from "redux-saga/effects"
import { call, put } from "redux-saga/effects"
import { priorityService } from "../../../services/PriorityService"
import { STATUS_CODE } from "../../../util/constants/settingSystem"
import { GET_ALL_PRIORITY, GET_ALL_PRIORITY_SAGA } from "../../constants/Cyberbugs/TaskTypeConstant"

function* getAllPrioritySaga(action) {
    try {
        const { data, status } = yield call(() => priorityService.getAllPriority())
        if (STATUS_CODE.SUCCCESS === status) {
            yield put({
                type: GET_ALL_PRIORITY,
                arrPriority: data.content
            })
        }
    } catch (error) {
        console.log(error)
    }
}
export function* theoDoigetAllTaskTypeSaga() {
    yield takeLatest(GET_ALL_PRIORITY_SAGA, getAllPrioritySaga);
}