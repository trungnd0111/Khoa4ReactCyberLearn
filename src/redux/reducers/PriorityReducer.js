import { GET_ALL_PRIORITY } from "../constants/Cyberbugs/TaskTypeConstant"

const initialState = {
    arrPriority: []
}

export default (state = initialState, action) => {
  switch (action.type) {

  case GET_ALL_PRIORITY:
    return { ...state, arrPriority:action.arrPriority }

  default:
    return state
  }
}
