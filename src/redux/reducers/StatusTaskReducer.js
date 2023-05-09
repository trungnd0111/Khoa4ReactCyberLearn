import { GET_ALL_STATUS_TASK } from "../../util/constants/CyberBugs/StatusConstants"

const initialState = {
    arrStatus:[]
}

export const StatusTaskReducer = (state = initialState, action) => {
  switch (action.type) {

  case GET_ALL_STATUS_TASK:
    state.arrStatus = action.arrStatus
    return { ...state}

  default:
    return { ...state}
  }
}
