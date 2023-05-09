import { GET_USER_BY_PROJECT_ID } from "../../util/constants/CyberBugs/UserContants";
import { USER_LOGIN } from "../../util/constants/settingSystem";
import { USLOGIN } from "../constants/Cyberbugs/Cyberbugs";

//Gắn thông tin người dùng ở localStorage vào state mặc định
let usLogin = {};
if(localStorage.getItem(USER_LOGIN)){
    usLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
    userLogin : usLogin,
    userSearch : [],
    // //bai59
    arrUser:[]
}
export const UserLoginCyberBugsReducer = (state = stateDefault, action) =>{
    switch (action.type) {
        case USLOGIN:{
            state.userLogin = action.userLogin
            return {...state}
        }
        case 'GET_USER_SEARCH' :{
            state.userSearch = action.listUserSearch
            return {...state}
        }
        case GET_USER_BY_PROJECT_ID :{
            state.arrUser = action.arrUser
            console.log( state.arrUser)
            return {...state}
        }
      default:  
        return {...state}
      }
}