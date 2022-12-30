import { CustomGeneratorRun } from './types'
import { loopInside, stringToPathOrCall } from './utils'

export class Generator<T> {
    name: string
    DB: {}
    object: T
    schema: {
        values: string[]
    }
    options: {
        uniqueField: string
        max: number
        min: number
    }
    virtualPaths: string[]
    generators: {}

    self(cfg: { self: any; eval?: boolean }) {
        let object = this.object
        return cfg.eval
            ? eval('object.' + cfg.self)
            : loopInside(this.object, cfg.self)
    }

    db(cfg: { eval?: boolean; db: any }) {
        let db = this.DB
        if (cfg.eval) {
            return eval('db.' + cfg.db)
        } else {
            return loopInside(this.DB, cfg.db)
        }
    }

    custom(cfg: {
        generator: any
        input: string | RegExp
        run?: CustomGeneratorRun
        adapter?: (generator: any, input: string | RegExp) => any
        eval?: boolean
    }) {
        let db = this.DB
        let object = this.object
        let re
        let matches
        let strFn
        let generator = cfg.generator

        if (cfg.run) {
            return cfg.run(generator, cfg.input)
        } else if (cfg.eval) {
            return eval('generator.' + cfg.input)
        } else {
            return stringToPathOrCall.call(
                generator,
                'generator',
                generator,
                cfg.input
            )
        }
    }

    eval(cfg: { eval: string }) {
        let db = this.DB
        let object = this.object
        let generators = this.generators

        return eval(cfg.eval)
    }

    values(cfg: { values: any[] }) {
        let i = Math.floor(cfg.values.length * Math.random())
        return cfg.values[i]
    }

    function(cfg: { function: any }, ...args) {
        let object = this.object
        let db = this.DB
        let generators = this.generators

        return cfg.function.call({ object, db, generators }, ...args)
    }

    static(cfg: { static: any }) {
        return cfg.static
    }

    incrementalId(cfg: { incrementalId: number | true | string }) {
        let n = 0
        let db = this.DB

        if (db[this.name] && db[this.name].length) {
            n = db[this.name].length
        }
        if (cfg.incrementalId === true) {
            cfg.incrementalId = '0'
        }
        return n + parseInt(cfg.incrementalId as string, 10)
    }

    hasOne(cfg: {
        hasOne: string
        get?: string
        eval?: boolean
        uniqueDB?: any[]
    }) {
        let db = this.DB

        let entity = null

        if (cfg.uniqueDB) {
            const dbString = JSON.stringify(cfg.uniqueDB)
            for (let i = 0; i < db[cfg.hasOne].length; i++) {
                let element = db[cfg.hasOne][i]

                element = cfg.get
                    ? cfg.eval
                        ? eval('element.' + cfg.get)
                        : loopInside(element, cfg.get)
                    : element

                if (
                    cfg.uniqueDB.length === 0 ||
                    dbString.indexOf(JSON.stringify(element)) < 0
                ) {
                    entity = element
                    break
                }
            }

            if (entity === null) {
                throw `Can´t get unique data. Source "${cfg.hasOne}" has not enough data`
            }
        } else {
            let i = Math.floor(db[cfg.hasOne].length * Math.random())
            entity = db[cfg.hasOne][i]

            entity = cfg.get
                ? cfg.eval
                    ? eval('entity.' + cfg.get)
                    : loopInside(entity, cfg.get)
                : entity
        }

        return entity
    }

    hasMany(cfg: {
        min?: number
        max?: number
        hasMany: string
        amount?: number
        get?: string
        eval?: boolean
        unique?: boolean
    }) {
        let amount = 1
        let db = this.DB

        let min = cfg.min || cfg.min === 0 ? cfg.min : 1
        let max = cfg.max ? cfg.max : cfg.hasMany ? db[cfg.hasMany].length : 1

        if (cfg.amount) {
            amount = cfg.amount
        } else {
            amount = Math.floor(Math.random() * (max - min + 1)) + min
        }

        let newCfg = {
            hasOne: cfg.hasMany,
            get: cfg.get ? cfg.get : undefined,
            eval: cfg.eval ? true : false
        }

        return cfg.unique
            ? Array.from(new Array(amount)).reduce(
                  (acc, val) => [
                      ...acc,
                      this.hasOne({ ...newCfg, uniqueDB: acc })
                  ],
                  []
              )
            : Array.from(new Array(amount)).map(() => this.hasOne(newCfg))
    }
}
