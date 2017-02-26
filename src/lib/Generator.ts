
import * as R from 'randexp'
import * as f from 'faker'
import * as c from 'casual'
import * as Ch from 'chance'
const ch = new Ch()

export class Generator {
    name: string
    DB: {}
    object: {}
    schema: {
        values: string[]
    }
    options: {
        uniqueField: string
    }
    virtualPaths: string[]

    faker(cfg) {
        let faker = f
        let db = this.DB
        let object = this.object

        let re = /(^[a-zA-Z.]*)/   //aZ.aZ
        let matches = re.exec(cfg.faker)
        let strFn
        if (matches && matches.length === 2){
            strFn = 'faker.' + cfg.faker
        }

        re = /\((.*?)\)/ //Match ()
        matches = re.exec(cfg.faker)
        if (!matches){
            strFn = 'faker.' + cfg.faker + '()'
        }

        return eval(strFn)
    }

    chance(cfg){
        let chance = ch
        let db = this.DB
        let object = this.object

        let re = /(^[a-zA-Z.]*)/   //aZ.aZ
        let matches = re.exec(cfg.chance)
        let strFn
        if (matches && matches.length === 2){
            strFn = 'chance.' + cfg.chance
        }

        re = /\((.*?)\)/ //Match ()
        matches = re.exec(cfg.chance)
        if (!matches){
            strFn = 'chance.' + cfg.chance + '()'
        }

        return eval(strFn)
    }

    casual(cfg){
        let casual = c
        let re = /(^[a-zA-Z.]*)/   //aZ.aZ
        let matches = re.exec(cfg.casual)
        let strFn
        if (matches && matches.length === 2){
            strFn = 'casual.' + cfg.casual
        }

        return eval(strFn)
    }

    randexp(cfg){
        return new R(cfg.randexp).gen()
    }

    self(cfg){
        let object = this.object
        return eval('object.' + cfg.self)
    }

    db(cfg){
        let db = this.DB
        return eval('db.' + cfg.db)
    }

    eval(cfg){
        let db = this.DB
        let object = this.object
        let faker = f
        let chance = ch
        let casual = c
        let randexp = R

        return eval(cfg.eval)
    }

    values(cfg){
        let i = Math.floor(cfg.values.length * Math.random());
        return cfg.values[i]
    }

    function (cfg, ...args){
        let object = this.object
        let db = this.DB
        let faker = f
        let chance = ch
        let casual = c
        let randexp = R

        return cfg.function.call({object, db, faker, chance, casual, randexp}, ...args)
    }

    static (cfg){
        return cfg.static
    }

    incrementalId (cfg){
        let n = 0
        let db = this.DB

        if (db[this.name] && db[this.name].length){
            n = db[this.name].length
        }
        if (cfg.incrementalId === true){
            cfg.incrementalId = 0
        }
        return (n + parseInt(cfg.incrementalId))
    }

    hasOne(cfg){
        let db = this.DB
        let i = Math.floor(db[cfg.hasOne].length * Math.random());
        let entity = db[cfg.hasOne][i]

        if (cfg.get){
            return eval('entity.' + cfg.get)
        } else {
            return entity
        }
    }

    hasMany(cfg){
        let amount = 1
        let db = this.DB

        let min = (cfg.min) ? cfg.min : 1
        let max = (cfg.max) ? cfg.max : db[cfg.hasMany].length

        if (cfg.amount){
            amount = cfg.amount
        } else {
            amount = Math.floor(Math.random() * (max - min + 1)) + min;
        }

        return Array.from(new Array(amount)).map(() => this.hasOne({hasOne: cfg.hasMany}))
    }
}
