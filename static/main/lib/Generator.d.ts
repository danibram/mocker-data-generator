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
    faker(cfg: {
        locale?: string;
        faker: string;
        eval?: boolean;
    }): any;
    chance(cfg: {
        chance: string;
        eval?: boolean;
    }): any;
    casual(cfg: {
        eval?: boolean;
        casual: string;
    }): any;
    randexp(cfg: {
        randexp: any;
    }): any;
    self(cfg: {
        self: any;
        eval?: boolean;
    }): any;
    db(cfg: {
        eval?: boolean;
        db: any;
    }): any;
    eval(cfg: {
        eval: string;
    }): any;
    values(cfg: {
        values: any[];
    }): any;
    function(cfg: {
        function: any;
    }, ...args: any[]): any;
    static(cfg: {
        static: any;
    }): any;
    incrementalId(cfg: {
        incrementalId: number | true | string;
    }): number;
    hasOne(cfg: {
        hasOne: string;
        get?: string;
        eval?: boolean;
    }): any;
    hasMany(cfg: {
        min?: number;
        max?: number;
        hasMany: string;
        amount?: number;
        get?: string;
        eval?: boolean;
    }): any[];
}
