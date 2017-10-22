export declare class Generator {
    name: string;
    DB: {};
    object: {};
    schema: {
        values: string[];
    };
    options: {
        uniqueField: string;
        max: number;
        min: number;
    };
    virtualPaths: string[];
    faker(cfg: any): any;
    chance(cfg: any): any;
    casual(cfg: any): any;
    randexp(cfg: any): any;
    self(cfg: any): any;
    db(cfg: any): any;
    eval(cfg: any): any;
    values(cfg: any): any;
    function(cfg: any, ...args: any[]): any;
    static(cfg: any): any;
    incrementalId(cfg: any): number;
    hasOne(cfg: any): any;
    hasMany(cfg: any): any[];
}
