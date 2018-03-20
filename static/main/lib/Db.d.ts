export default class Database {
    db: Map<string, any>;
    constructor();
    get(Model?: any): any;
    add(Model: any, data: any): void;
}
