import {ITask} from "../interfaces/interfaces";

export interface IBackendService {
    getTasks(): Promise<ITask[]>;
    addTask(task: ITask): Promise<ITask>;
    deleteTask(task: ITask): Promise<ITask>;
    updateTask(task: ITask): Promise<ITask>;
}
