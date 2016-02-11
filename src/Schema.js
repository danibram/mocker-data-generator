import {isObject, isArray, iamLastParent, iamLastChild, fieldArrayCalcLength, stringToFn, evalWithContextData, isConditional} from './utils'
import faker from 'faker'
import Chance from 'chance'
const chance = new Chance()

let iterate = function (obj, res, currentPath) {
    if (!currentPath) { currentPath = [] }
    Object.keys(obj)
        .map((k) => {
            let value = obj[k]

            let path = currentPath.slice(0)
            path.push(k)


            if (iamLastParent(value)) {

                if (path){
                    if ( isArray(value) ){
                        if (value[0] && value[0].virtual){
                            this.virtualPaths.push(path.toString())
                        }
                    } else {
                        if (value.virtual){
                            this.virtualPaths.push(path.toString())
                        }
                    }
                }

                let fieldCalculated = this.proccessLeaf(value)

                if (!isConditional(k)){
                    res[k] = fieldCalculated
                } else {
                    let key = k.split(',')
                    if (evalWithContextData(key[0], this.result)){
                        res[key[1]] = fieldCalculated
                    }
                }
            } else {
                res[k] = {}
                iterate.call(this, value, res[k], path)
            }
        })
}

export default class Schema {
    constructor(name, cfg, options){
        this.schema = cfg
        this.name = name
        this.options = options

        // Temp fields
        this.db = {}
        this.result = {}
        this.virtualPaths = []
    }

    proccessLeaf (field) {

        if ( isArray(field) ){
            let fieldConfig = field[0]
            let array = []
            let na = []

            if (fieldConfig.concat){
                na = evalWithContextData(fieldConfig.concat, this.result, this.db)
                //Strict Mode
                na = (fieldConfig.concatStrict) ? [...new Set(na)] : na
            }

            let length = fieldArrayCalcLength(fieldConfig, na.length)

            for (let i = 0; i < length; i++) {
                array.push(this.generateField(fieldConfig))
            }

            return array.concat(na)
        } else {
            return this.generateField(field)
        }
    }

    generateField(config) {
        let object = this.result
        let db = this.db

        if (config.faker){
            return stringToFn('faker', config.faker, db, object)
        } else if (config.chance) {
            return stringToFn('chance', config.chance, db, object)
        } else if (config.values) {
            let i = Math.floor(config.values.length * Math.random());
            return config.values[i]
        } else if (config.function) {
            return config.function.call({object, faker, chance, db})
        } else if (config.static) {
            return config.static
        } else if (config.hasOwnProperty('incrementalId')) {
            let n = 0

            if (db[this.name] && db[this.name].length){
                n = db[this.name].length
            }
            if (config.incrementalId === true){
                config.incrementalId = 0
            }
            return (n + parseInt(config.incrementalId))
        } else {
            return null
        }
    }

    buildSingle (schema) {
        if (iamLastParent(schema)) {
            this.result = this.proccessLeaf(schema)
        } else {
            iterate.call(this, schema, this.result)
        }
    }

    build (db){
        this.result = {}
        this.db = db ? db : {}
        this.db[this.name] = []
        if (Number.isInteger(this.options)){

            /*Array.from(new Array(this.options)).map(() => {
                this.buildSingle(this.schema)
                this.db[this.name].push(this.result)
                this.result = {}
            })*/

            /*for (var i = 0; i < this.options; i++) {
                this.buildSingle(this.schema)
                this.db[this.name].push(this.result)
                this.result = {}
            }*/

            for (var i=0, il=this.options; i<il; i++) {
                this.buildSingle(this.schema)
                this.db[this.name].push(this.result)
                this.result = {}
            }
/*
            let count = 0
            while (count < this.options) {
                this.buildSingle(this.schema)
                this.db[this.name].push(this.result)
                this.result = {}
                count += 1
            }*/

        } else if (isObject(this.options)){
            let f = this.options.uniqueField
            let entityConfig = this.schema
            let possibleValues
            if (f === '.') {
                possibleValues = this.schema.values
            } else {
                if (this.schema[f]){
                    if (isArray(this.schema[f].values)){
                        possibleValues = this.schema[f].values
                    } else {
                        possibleValues = this.schema[f]
                    }
                } else {
                    console.error('The field ' + f + ', on the scheema ' + this.name + ' not exists.')
                    return this.db[this.name]
                }

            }

            if ( !isArray(possibleValues) ){
                console.error('The field ' + f + ', on the scheema ' + this.name + ' is not an array.')
                return this.db[this.name]
            }

            possibleValues.map((value) => {

                if (f === '.') {
                    return
                }

                entityConfig[f] = {static: value}

                this.buildSingle(entityConfig)
                this.db[this.name].push(this.result)
                this.result = {}
            })
        } else {
            console.error('An string ' + this.options + ', is not recognized as a parameter.')
        }
        return this.db[this.name]
    }


}
