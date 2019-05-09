import {IDataStorage} from "./dataStorage.interface";

export class DataStorage implements IDataStorage {
    public saveData(key: string, data: any): void {
        const serialObj: string = JSON.stringify(data);
        //update data
        localStorage.setItem(key, serialObj);
    }

    public getData(key: string): any {
        return JSON.parse(localStorage.getItem(key));
    }
}