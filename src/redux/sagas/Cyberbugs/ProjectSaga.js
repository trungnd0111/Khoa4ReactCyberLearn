import Axios from 'axios'
import { takeLatest, call, put, takeEvery, fork, take, delay, select } from 'redux-saga/effects'
import { cyberbugsService } from '../../../services/CyberbugsServices';
import { STATUS_CODE, TOKEN, USER_LOGIN } from '../../../util/constants/settingSystem';
import { DISPLAY_LOADING, HIDE_LOADING } from '../../constants/LoadingConst'
import { history } from '../../../util/history';
import { projectService } from '../../../services/ProjectService';
import { notifiFunction } from '../../../util/Notification/notificationCyberbugs';
import { GET_ALL_PROJECT, GET_ALL_PROJECT_SAGA } from '../../../util/constants/CyberBugs/ProjectConstants';

//Sử dụng để tạo newProject và gửi đến backend
function* createProjectSaga(action) {

    // console.log('actionCreateProject', action)
    //HIỂN THỊ LOADING
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);

    try {

        //Gọi api lấy dữ liệu về
        const { data, status } = yield call(() => cyberbugsService.createProjectAuthorization(action.newProject));
        //Gọi api thành công thì dispatch lên reducer thông qua put
        if (status === STATUS_CODE.SUCCESS) {
            // console.log(data)
            yield notifiFunction('success', 'Create project Success !', `Create project successful !`)

        }


    } catch (err) {
        console.log(err);
    }

    yield put({
        type: HIDE_LOADING
    })
}

//Bai40 saga dùng để get all project từ api
export function* theoDoicreateProjectSaga() {
    yield takeLatest('CREATE_PROJECT_SAGA', createProjectSaga)
}

//Saga dùng để get all project từ api 
//Khải - Code ngày dd/MM/yyyy

function* getListProjectSaga(action) {

    try {
        const { data, status } = yield call(() => cyberbugsService.getListProject());
        // console.log('data',data)
        //Sau khi lấy dữ liệu từ api về thành công
        if (status === STATUS_CODE.SUCCCESS) {
            // console.log('thành công',data)
            yield put({
                type: 'GET_LIST_PROJECT',
                projectList: data.content
            })
        }
    } catch (err) {
        console.log(err)
    }

}

export function* theoDoiGetListProjectSaga() {
    yield takeLatest('GET_LIST_PROJECT_SAGA', getListProjectSaga);
}

//Saga dùng để update project từ api 

function* updateProjectSaga(action) {
    console.log(action)
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);
    try {
        const { data, status } = yield call(() => cyberbugsService.updateProject(action.projectUpdate));
        // console.log('data',data)
        //Sau khi lấy dữ liệu từ api về thành công
        if (status === STATUS_CODE.SUCCCESS) {
            console.log('thành công', data)
            yield put({
                type: 'GET_LIST_PROJECT_SAGA'
            })
            yield put({
                type: 'CLOSE_DRAWER'
            })
            yield notifiFunction('success', 'Edit project Success !', `Edit project successful !`)
        }
    } catch (err) {
        console.log(err)
    }
    yield put({
        type: HIDE_LOADING
    })

}


export function* theoDoiupdateProjectSaga() {
    yield takeLatest('UPDATE_PROJECT_SAGA', updateProjectSaga);
}

//Saga dùng để delete project từ api 

function* deleteProjectSaga(action) {
    console.log(action)
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);
    try {
        const { data, status } = yield call(() => projectService.deleteProject(action.idProject));
        // console.log('data',data)
        //Sau khi lấy dữ liệu từ api về thành công
        if (status === STATUS_CODE.SUCCCESS) {
            yield put({
                type: 'GET_LIST_PROJECT_SAGA'
            })
            yield put({
                type: 'CLOSE_DRAWER'
            })
            yield notifiFunction('success', 'Delete Success !', `Delete project id ${action.idProject} successful !`)
        }
    } catch (err) {
        console.log(err)
        yield notifiFunction('error', 'Delete unSuccess !', `Delete project id ${action.idProject} unsuccessful !`)
    }
    yield put({
        type: HIDE_LOADING
    })

}

export function* theoDoideleteProjectSaga() {
    yield takeLatest('DELETE_PROJECT_SAGA', deleteProjectSaga);
}


//Saga dùng để delete user trong project từ api 

function* removeUserFromProject(action) {

    try {
        const { data, status } = yield call(() => projectService.removeUserFromProject(action.userProject));
        // console.log('data',data)
        //Sau khi lấy dữ liệu từ api về thành công
        if (status === STATUS_CODE.SUCCCESS) {
            yield put({
                type: 'GET_LIST_PROJECT_SAGA'
            })
            yield notifiFunction('success', 'Remove User Success !', `Remove User successful !`)
        }
    } catch (err) {
        console.log(err)
        yield notifiFunction('error', 'Remove User unSuccess !', `Remove User unsuccessful !`)
    }


}

export function* theoDoiremoveUserFromProjectSaga() {
    yield takeLatest('REMOVE_USER_PROJECT_API', removeUserFromProject);
}

//Saga dùng để get projectDetail từ api 

function* getProjectDetailSaga(action) {
    // console.log(action)
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);
    try {
        const { data, status } = yield call(() => projectService.getProjectDetail(action.projectId));
        // console.log('data',data)
        //Sau khi lấy dữ liệu từ api về thành công
        if (status === STATUS_CODE.SUCCCESS) {
            yield put({
                type: 'GET_PROJECT_DETAIL',
                projectDetail: data.content
            })
        }
    } catch (err) {
        console.log(err)
        history.push('/projectmanagement')
    }
    yield put({
        type: HIDE_LOADING
    })

}

export function* theoDoigetProjectDetailSaga() {
    yield takeLatest('GET_PROJECT_DETAIL_SAGA', getProjectDetailSaga);
}

function* getProjectAllSaga(action) {

    try {
        const { data, status } = yield call(() => projectService.getAllProject());
        // console.log('data',data)
        //Sau khi lấy dữ liệu từ api về thành công
        if (status === STATUS_CODE.SUCCCESS) {
            // console.log('thành công',data)
            yield put({
                type: GET_ALL_PROJECT,
                arrProject: data.content
            })
        }
    } catch (err) {
        console.log(err)
    }

}

export function* theoDoiGetProjectAllSaga() {
    yield takeLatest(GET_ALL_PROJECT_SAGA, getProjectAllSaga);
}