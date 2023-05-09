import { all } from "redux-saga/effects";
import { call, takeLatest } from "redux-saga/effects";
import * as ToDoListSaga from './ToDoListSaga'
import * as UserCyberbugsSaga from './Cyberbugs/UserCyberbugsSaga'
import * as ProjectCategorySaga from './Cyberbugs/ProjectCategorySaga'
import * as ProjectSaga from './Cyberbugs/ProjectSaga'
import * as TaskTypeSaga from './Cyberbugs/TaskTypeSaga'
import * as PrioritySaga from './Cyberbugs/PrioritySaga'
import * as CreateTaskProjectSaga from './Cyberbugs/CreateTaskProjectSaga'
import * as StatusTaskSaga from './Cyberbugs/StatusTaskSaga'
export function* rootSaga() {

    yield all([
        //Nghiệp vụ theo dõi các action saga todolisttodolist
        ToDoListSaga.theoDoiActionGetTaskApi(),
        ToDoListSaga.theoDoiActionAddTaskApi(),
        ToDoListSaga.theoDoiActiondeleteTaskApi(),
        ToDoListSaga.theoDoiActiondoneTask(),
        ToDoListSaga.theoDoiActionrejectTask(),

        //Nghiệp vụ theo dõi các action saga cyberbugs
        UserCyberbugsSaga.theoDoiSigninApi(),
        ProjectCategorySaga.theoDoigetAllProjectCategory(),
        ProjectSaga.theoDoicreateProjectSaga(),
        ProjectSaga.theoDoiGetListProjectSaga(),
        ProjectSaga.theoDoiupdateProjectSaga(),
        ProjectSaga.theoDoideleteProjectSaga(),
        UserCyberbugsSaga.theoDoiGetUser(),
        UserCyberbugsSaga.theoDoiaddUserProjectSaga(),
        ProjectSaga.theoDoiremoveUserFromProjectSaga(),
        ProjectSaga.theoDoigetProjectDetailSaga(),
        ProjectSaga.theoDoiGetProjectAllSaga(),
        TaskTypeSaga.theoDoigetAllTaskTypeSaga(),
        PrioritySaga.theoDoigetAllTaskTypeSaga(),
        CreateTaskProjectSaga.theoDoigetAllTaskTypeSaga(),
        StatusTaskSaga.theoDoigetAllTaskTypeSaga(),
        UserCyberbugsSaga.theoDoiGetUserByProjectSaga(),
        CreateTaskProjectSaga.theoDoigetTaskDetailSaga(),
        CreateTaskProjectSaga.theoDoiUpdateTaskStatusSaga(),
        CreateTaskProjectSaga.theoDoiUpdateTaskSaga(),
        CreateTaskProjectSaga.theoDoihandleChangePostApi(),
        //Test logout
        UserCyberbugsSaga.theoDoiuserLogoutlocalStorage(),
    ])

}