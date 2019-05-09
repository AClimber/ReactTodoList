export interface IDataStorage {
    saveData(key: string, data: any): void;
    getData(key: string): any;
}