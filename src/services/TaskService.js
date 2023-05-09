import { baseService } from "./baseService";

export class TaskService extends baseService {
    constructor() {
        super();
    }
    createTask = (taskObject) => {
        return this.post(`Project/createTask`, taskObject)
    }

    getTaskDetail = (taskId) =>{
        return this.get(`Project/getTaskDetail?taskId=${taskId}`)
    }
   updateStatusTask = (taskStatusUpdate)=>{
    return this.put(`Project/updateStatus`, taskStatusUpdate)
   }
   //Bài 67
   updateTask = (taskUpdate)=>{
    return this.post(`Project/updateTask`, taskUpdate)
   }
}

export const taskService = new TaskService();