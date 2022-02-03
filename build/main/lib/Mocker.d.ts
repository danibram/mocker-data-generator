import { Schema } from './Schema';
export declare type PromiseCb = Promise<any> | void;
export declare type IDB = {
    [key: string]: any[];
};
export declare class Mocker {
    schemas: Schema[];
    DB: IDB;
    options: {};
    constructor(options?: {});
    seed(name: string, data: any[]): Mocker;
    schema(name: string, schema: {}, options?: {}): Mocker;
    reset(): Mocker;
    restart(): Mocker;
    private _buildSync;
    buildSync(): IDB;
    build(cb?: (error: Error | null, _?: any) => void): Promise<any>;
    build(cb?: (error: Error | null, _?: any) => void): void;
}
