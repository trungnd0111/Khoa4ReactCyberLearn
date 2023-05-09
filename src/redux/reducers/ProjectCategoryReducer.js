import { GET_ALL_PROJECT_CATEGORY } from "../constants/Cyberbugs/Cyberbugs"

const initialState = {
    arrProjectCategory :[
      
  ]
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PROJECT_CATEGORY :
      state.arrProjectCategory = action.arrProjectCategory
      return {...state}
  default:
    return {...state}
  }
}
