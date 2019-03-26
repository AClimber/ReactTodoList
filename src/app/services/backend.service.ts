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

    addTask(task: ITask): Promise<ITask> {
        this.taskList = addItemToArray<ITask>(this.taskList, task);

        return getPromise<ITask>(task)
    }

    deleteTask(task: ITask): Promise<ITask> {
        this.taskList = deleteArray<ITask>(this.taskList, task);

        return getPromise<ITask>(task)
    }

    updateTask(task: ITask): Promise<ITask> {
        this.taskList = updateArray<ITask>(this.taskList, task);

        return getPromise<ITask>(task)
    }
}

const addItemToArray = <T>(array: T[], item: T): T[] => {
    return array.concat(item);
};

const updateArray = <T>(array: T[], item: T): T[] => {
    return array.map((value: T) => {
        if (value === item) {
            return item;
        }

        return value;
    });
};

const deleteArray = <T>(array: T[], item: T): T[] => {
    return array.filter((value: T) => {
        return value !== item;
    })
};

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
