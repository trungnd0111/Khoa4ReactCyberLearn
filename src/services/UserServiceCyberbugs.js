import { baseService } from "./baseService";

export class UserServiceCyberbugs extends baseService {
    constructor() {
        super();
    }
    getUser = (keyWord) => {
        return this.get(`Users/getUser?keyword=${keyWord}`)
    }
    assignUserProject = (userProject) =>{
        return this.post(`Project/assignUserProject`, userProject)
    }
    getUserByProjectId = (idProject) =>{
        return this.get(`Users/getUserByProjectId?idProject=${idProject}`)
    }
}

export const UserServices= new UserServiceCyberbugs();