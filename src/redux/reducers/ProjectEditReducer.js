const initialState = {

    projectEdit: {
        "id": 0,
        "projectName": "string",
        "creator": 0,
        "description": "string",
        "categoryId": "1"
    }

}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'EDIT_PROJECT':{
            state.projectEdit = action.projectEditModel
            return {...state}
        }
        default:
            return {...state}
    }
}
