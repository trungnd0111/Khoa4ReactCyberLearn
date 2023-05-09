import Axios from 'axios'
import { push } from 'react-router-redux';
import { takeLatest, call, put, takeEvery, fork, take, delay, select } from 'redux-saga/effects'
import { cyberbugsService } from '../../../services/CyberbugsServices';
import { STATUS_CODE, TOKEN, USER_LOGIN } from '../../../util/constants/settingSystem';
import { GET_ALL_PROJECT_CATEGORY, GET_ALL_PROJECT_CATEGORY_SAGA} from '../../constants/Cyberbugs/Cyberbugs';
import { DISPLAY_LOADING, HIDE_LOADING } from '../../constants/LoadingConst'

//Sử dụng để lấy projectCategory từ backend về
function* getAllProjectCategory() {
    try {
        //Gọi api lấy dữ liệu về
        const { data, status } = yield call(() => cyberbugsService.getAllProjectCategory())
        // console.log('data', data)
        if (status === STATUS_CODE.SUCCCESS) {
            //Gọi api thành công thì dispatch lên reducer thông qua put
            yield put({
                type: GET_ALL_PROJECT_CATEGORY,
                arrProjectCategory: data.content
            })
        }
    } catch (error) {
        console.log(error.response.data)
    }
}


export function* theoDoigetAllProjectCategory() {
    yield takeLatest(GET_ALL_PROJECT_CATEGORY_SAGA, getAllProjectCategory)
}