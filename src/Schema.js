import {isObject, isArray, iamLastParent, iamLastChild, fieldArrayCalcLength, stringToFn, evalWithContextData, isConditional, fnCallWithContext, randexpWrapper} from './utils'

import Generator from './Generator'

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
                    if (evalWithContextData(key[0], this.object)){
                        res[key[1]] = fieldCalculated
                    }
                }
            } else {
                res[k] = {}
                iterate.call(this, value, res[k], path)
            }
        })
}

export default class Schema extends Generator{
    constructor(name, cfg, options){
        super()
        this.schema = cfg
        this.name = name
        this.options = options

        // Temp fields
        this.DB = {}
        this.object = {}
        this.virtualPaths = []
    }

    proccessLeaf (field) {

        if ( isArray(field) ){
            let fieldConfig = field[0]
            let na = []
            let array = []
            if (fieldConfig.concat){
                na = evalWithContextData(fieldConfig.concat, this.object, this.DB)
                //Strict Mode
                na = (fieldConfig.concatStrict) ? [...new Set(na)] : na
            }

            let length = fieldArrayCalcLength(fieldConfig, na.length)

            Array.from(new Array(length)).map(() => {
                array.push(this.generateField(fieldConfig))
            })

            return array.concat(na)
        } else {
            return this.generateField(field)
        }
    }

    generateField(cfg) {
        let result = null
        let generators = ['faker', 'chance', 'casual', 'randexp', 'self', 'db', 'hasOne', 'hasMany', 'static', 'function', 'values', 'incrementalId']

            generators.map((key) => {
                try {
                    if (cfg.hasOwnProperty(key)){
                        result = this[key](cfg)
                    }
                } catch(e){
                    result = null
                    console.error('Error on generator [' + key + ']: ', e)
                }
            })


        return result
    }

    buildSingle (schema) {
        if (iamLastParent(schema)) {
            this.object = this.proccessLeaf(schema)
        } else {
            iterate.call(this, schema, this.object)
        }
    }

    build (db){
        this.object = {}
        this.DB = db ? db : {}
        this.DB[this.name] = []
        if (Number.isInteger(this.options)){

            Array.from(new Array(this.options)).map(() => {
                this.buildSingle(this.schema)
                this.DB[this.name].push(this.object)
                this.object = {}
            })

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
                    return this.DB[this.name]
                }

            }

            if ( !isArray(possibleValues) ){
                console.error('The field ' + f + ', on the scheema ' + this.name + ' is not an array.')
                return this.DB[this.name]
            }

            possibleValues.map((value) => {

                if (f === '.') {
                    return
                }

                entityConfig[f] = {static: value}

                this.buildSingle(entityConfig)
                this.DB[this.name].push(this.object)
                this.object = {}
            })
        } else {
            console.error('An string ' + this.options + ', is not recognized as a parameter.')
        }
        return this.DB[this.name]
    }


}
