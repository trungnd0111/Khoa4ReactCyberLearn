import { baseService } from "./baseService";

export class ProjectService extends baseService {
    constructor() {
        super();
    }
    deleteProject = (id) => {
        return this.delete(`/Project/deleteProject?projectId=${id}`)
    }
    removeUserFromProject = (userProject) =>{
        return this.post(`Project/removeUserFromProject`, userProject)
    }
    //bai52
    getProjectDetail = (projectId) =>{
        return this.get(`Project/getProjectDetail?id=${projectId}`)
    }
    //bai56
    getAllProject = () =>{
        return this.get(`Project/getAllProject`)
    }
}

export const projectService = new ProjectService();