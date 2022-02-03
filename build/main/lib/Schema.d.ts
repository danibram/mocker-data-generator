import { Generator } from './Generator';
export declare class Schema extends Generator<any> {
    constructor(name: string, cfg: any, options: any);
    proccessLeaf(field: any): any;
    generateField(cfg: any, ...args: any[]): {};
    buildSingle(schema: any): void;
    build(db?: {}): any;
}
