import { applyMiddleware, combineReducers, createStore } from 'redux';
import ToDoListReducer from './reducers/ToDoListReducer'
import LoadingReducer from './reducers/LoadingReducer'
import ModalReducer from './reducers/ModalReducer'
import { HistoryReducer } from './reducers/HistoryReducer';
import { UserLoginCyberBugsReducer } from './reducers/UserCyberBugsReducer'
import ProjectCategoryReducer from './reducers/ProjectCategoryReducer'
import { ProjectCyberbugsReducer } from './reducers/ProjectCyberbugsReducer';
import {drawerReducer} from './reducers/DrawerCyberbugsReducer'
import ProjectEditReducer from './reducers/ProjectEditReducer'
import {TaskTypeReducer} from './reducers/TaskTypeReducer'
import PriorityReducer from './reducers/PriorityReducer'
import {StatusTaskReducer} from './reducers/StatusTaskReducer'
import TaskReducer from './reducers/TaskReducer'
import reduxThunk from 'redux-thunk'

//middlewware saga
import createMiddlewareSaga from 'redux-saga';
import { rootSaga } from './sagas/rootSaga'
const middlewwareSaga = createMiddlewareSaga()
//

const rootReducer = combineReducers({
    ToDoListReducer,
    LoadingReducer,
    ModalReducer,
    HistoryReducer,
    UserLoginCyberBugsReducer,
    ProjectCategoryReducer,
    ProjectCyberbugsReducer,
    drawerReducer,
    ProjectEditReducer,
    TaskTypeReducer,
    PriorityReducer,
    StatusTaskReducer,
    TaskReducer
})

const store = createStore(rootReducer, applyMiddleware(reduxThunk, middlewwareSaga));
//gọi saga
middlewwareSaga.run(rootSaga);
export default store;