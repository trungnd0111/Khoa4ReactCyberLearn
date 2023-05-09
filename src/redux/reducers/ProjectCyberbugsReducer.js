import { GET_ALL_PROJECT } from "../../util/constants/CyberBugs/ProjectConstants";


const stateDefault = {
    projectList: [
        {
            "id": 10696,
            "projectName": "project demo",
            "description": "<p>alo alo</p>",
            "categoryId": 2,
            "categoryName": "Dự án phần mềm",
            "alias": "project-demo",
            "deleted": false
        }
    ],
    projectDetail:{

    },
    arrProject: [] //get all project cho dropdown

}


export const ProjectCyberbugsReducer = (state = stateDefault, action) => {


    switch (action.type) {

        case 'GET_LIST_PROJECT': {
            state.projectList = action.projectList;
            // console.log("projectList", action.projectList)
            return { ...state };
        }
        case 'GET_PROJECT_DETAIL':{
            state.projectDetail = action.projectDetail
            return {...state}
        }
        case GET_ALL_PROJECT: {
            state.arrProject = action.arrProject;
            return { ...state };
        }

        default: return { ...state }
    }
}