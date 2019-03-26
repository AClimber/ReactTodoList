import { IBackendService } from "./backend.interface";
import { ITask } from "../interfaces/interfaces";

export class BackendService implements IBackendService {
    private static instance: BackendService;

    private constructor(private taskList: ITask[]) {
    }

    static getInstance(): BackendService {
        if (!BackendService.instance) {
            return (BackendService.instance = new BackendService(defaultTasks));
        } else {
            return BackendService.instance;
        }
    }

    getTasks(): Promise<ITask[]> {
        return getPromise<ITask[]>(this.taskList);
    }

}

const getPromise = <T>(value: T): Promise<T> => {
    let promise: Promise<T> = new Promise((resolve, reject) => {
        setTimeout(() => resolve(value), 1000);
    });

    return promise;
};

const defaultTasks: ITask[] = [
    {
        id: 1,
        description: 'task 1'
    },
    {
        id: 2,
        description: 'task 2'
    }
];
