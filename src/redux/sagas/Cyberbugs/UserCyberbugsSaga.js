import Axios from 'axios'
import { push } from 'react-router-redux';
import { takeLatest, call, put, takeEvery, fork, take, delay, select } from 'redux-saga/effects'
import { cyberbugsService } from '../../../services/CyberbugsServices';
import { UserServices } from '../../../services/UserServiceCyberbugs';
import { GET_USER_BY_PROJECT_ID, GET_USER_BY_PROJECT_ID_SAGA } from '../../../util/constants/CyberBugs/UserContants';
import { STATUS_CODE, TOKEN, USER_LOGIN } from '../../../util/constants/settingSystem';
import { notifiFunction } from '../../../util/Notification/notificationCyberbugs';
import { USER_SIGNIN_API, USLOGIN } from '../../constants/Cyberbugs/Cyberbugs';
import { DISPLAY_LOADING, HIDE_LOADING } from '../../constants/LoadingConst'
//Quản lý các action saga
function* signinSaga(action) {
    // console.log(action)

    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(3000);

    //Gọi API
    try {
        const { data, status } = yield call(() => cyberbugsService.signinCyberBugs(action.userLogin));
        console.log(data);
        //Lưu vào LocalStorage khi đăng nhập thành công
        localStorage.setItem(TOKEN, data.content.accessToken);
        localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));

        yield put({
            type: USLOGIN,
            userLogin: data.content
        })

        let history = yield select(state => state.HistoryReducer.history)

        history.push('/home');
    } catch (err) {
        console.log(err.response.data)
    }

    yield put({
        type: HIDE_LOADING
    })
}

export function* theoDoiSigninApi() {
    yield takeLatest(USER_SIGNIN_API, signinSaga)
}


function* getUserSaga(action) {
    // console.log(action)


    //Gọi API
    try {
        const { data, status } = yield call(() => UserServices.getUser(action.keyWord));
        // console.log(data);
        yield put({
            type: 'GET_USER_SEARCH',
            listUserSearch: data.content
        })
    } catch (err) {
        console.log(err.response.data)
    }

}

export function* theoDoiGetUser() {
    yield takeLatest('GET_USER_API', getUserSaga)
}


function* addUserProjectSaga(action) {
    // console.log(action)


    //Gọi API
    try {
        const { data, status } = yield call(() => UserServices.assignUserProject(action.userProject));
        console.log(data);
        yield put({
            type: 'GET_LIST_PROJECT_SAGA',
            listUserSearch: data.content
        })
    } catch (err) {
        console.log(err.response.data)
    }

}

export function* theoDoiaddUserProjectSaga() {
    yield takeLatest('ADD_USER_PROJECT_API', addUserProjectSaga)
}

//bai59
function* getUserByProjectSaga(action) {
    // console.log(action)
    //Gọi API
    try {
        const { data, status } = yield call(() => UserServices.getUserByProjectId(action.idProject));
        console.log('action.idProject',action.idProject)
        if (STATUS_CODE.SUCCCESS === status) {
            // console.log('checkdata', data);
            yield put({
                type: GET_USER_BY_PROJECT_ID,
                arrUser: data.content
            })
        }
    } catch (err) {
        console.log(err.response.data)
        if(err.response?.data.statusCode === STATUS_CODE.NOT_FOUND){
            yield put({
                type: GET_USER_BY_PROJECT_ID,
                arrUser: []
            })
        }
    }

}

export function* theoDoiGetUserByProjectSaga() {
    yield takeLatest(GET_USER_BY_PROJECT_ID_SAGA, getUserByProjectSaga)
}

//Logout user
function* userLogoutlocalStorage(action) {
    // console.log(action)
    //Gọi API
    try {
        yield localStorage.removeItem(USER_LOGIN);
        yield localStorage.removeItem(TOKEN);
        let history = yield select(state => state.HistoryReducer.history)
        history.push('/login');
        yield notifiFunction('success', 'Log out Success !', `Log out successful !`)
    } catch (err) {
        console.log(err)
    }

}

export function* theoDoiuserLogoutlocalStorage() {
    yield takeLatest('LOG_OUT_USER_SAGA', userLogoutlocalStorage)
}