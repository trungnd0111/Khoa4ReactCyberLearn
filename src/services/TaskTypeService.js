import { baseService } from "./baseService";

export class TaskTypeService extends baseService {
    constructor() {
        super();
    }
    //bai56
    getAllTaskType = () => {
        return this.get('TaskType/getAll');
    }
}

export const taskTypeService = new TaskTypeService();