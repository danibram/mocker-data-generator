//import * as Chance from 'chance'


let Immutable = require('immutable')

let faker = require('faker')
let util = require('util')
let Chance = require('chance')
let extend = require('extend')
const chance = new Chance()

import * as utils from './utils/index.ts'
import pluralize from './utils/pluralizator.ts'
import cleanObject from './utils/cleanObject.ts'

export default class Mocker {

    public config: Immutable.Map<string, number>
    public generalOptions = {
        pluralizeOutputEntity: false
    }

    public data = {}
    public entity = {}
    public path = []
    public virtual = false
    public virtualPaths = []
    private entityOutputName = ''
    private entityName = ''

    constructor(config: any, generalOptions: any) {
        this.config = Immutable.fromJS(config)

        generalOptions = generalOptions ? generalOptions : {}
        this.generalOptions = extend({}, this.generalOptions, generalOptions)
    }

    scheema(config, entityName, options){
        this.entityName = entityName

        // Calc Pluralization
        let outputName
        if (this.generalOptions.pluralizeOutputEntity){
            outputName = pluralize(entityName)
        } else {
            outputName = entityName
        }
        this.entityOutputName = outputName
        this.data[outputName] = []

        try {

            const end = (data) => {
                this.data[this.entityOutputName].push(data)
            }

            if ((Number as any).isInteger(options)){

                const gen = (fn, entityConfig) => {
                    fn.call(this, entityConfig, end)
                }

                Array.apply(null, Array(options)).map(() => {
                    let entityConfig = (this.config.get(entityName) as any).toJS()
                    utils.iamLastParent(entityConfig)
                     ? gen(this.proccessLeaf, entityConfig)
                     : gen(this.proccessNode, entityConfig)
                })

            } else {

                let entityConfig = (this.config.get(entityName) as any).toJS()
                let f = options.uniqueField
                let possibleValues
                if (f === '.') {
                    possibleValues = entityConfig.values
                } else {
                    possibleValues = entityConfig[f].values
                }


                possibleValues.map((value) => {
                    entityConfig = (this.config.get(entityName) as any).toJS()

                    if (f === '.') {
                        end(value)
                        return
                    }

                    entityConfig[f] = {static: value}

                    this.proccessNode(entityConfig, end)
                })
            }

            return this
        } catch (e){
            console.log('Exception: mocker-data-generator')
            console.log('Error generating ' + this.entityOutputName + ' : ' + e)
            console.log(e.stack)
        }
    }

    generate(entity: string, options: any) {
        let entityConfig = (this.config.get(entity) as any).toJS()
        return this.scheema(entityConfig, entity, options)
    }

    build(cb) {
        let result = this.data
        this.data = {}
        return cb(result)
    }

    proccessNode(entityConfig: Object, cb) {

        this.entity = entityConfig

        let pNode = (obj, k, value, path?) => {
            if (path){
                if ( utils.isArray(value) ){
                    if (value[0].virtual){
                        this.virtualPaths.push(path.toString())
                    }
                } else {
                    if (value.virtual){
                        this.virtualPaths.push(path.toString())
                    }
                }
            }

            this.proccessLeaf(value, (fieldCalculated) => {
                if (!utils.isConditional(k)){
                    obj[k] = fieldCalculated
                } else {
                    let key = k.split(',')
                    if (utils.evalWithContextData(key[0], this.entity)){
                        obj[key[1]] = fieldCalculated
                        delete obj[k]
                    } else {
                        delete obj[k]
                    }
                }
                return fieldCalculated
            })
        }

        let iterate = (obj: {}, currentPath?: string[]) => {
            if (!obj) { return }
            if (!currentPath) { currentPath = [] }

            let fields = Object.keys(obj)
            for (var i = 0; i< fields.length; i++) {
                let k = fields[i]
                let value = obj[k]

                let path = currentPath.slice(0)
                path.push(k)

                if (utils.iamLastParent(value)) {
                    pNode(obj, k, value, path)
                } else {
                    iterate.call(this, value, path)
                }
            }
        }

        iterate.call(this, this.entity)

        if (this.virtualPaths.length > 0){
            cb(cleanObject(this.virtualPaths, this.entity, {strict: true, symbol: ','}))
        } else {
            cb(this.entity)
        }
    }

    proccessLeaf(field, fn) {
        if ( utils.isArray(field) ){
            let fieldConfig = field[0]
            let array = []
            let length = utils.fieldArrayCalcLength(fieldConfig)
            for (let i = 0; i < length; i++) {
                array.push(this.generateField(fieldConfig))
            }
            return fn(array)
        } else {
            return fn(this.generateField(field))
        }
    }

    generateField(config) {
        let object = this.entity
        let db = this.data

        if (config.faker){
            return utils.stringToFn('faker', config.faker, db, object)
        } else if (config.chance) {
            return utils.stringToFn('chance', config.chance, db, object)
        } else if (config.values) {
            return (faker as any).random.arrayElement(config.values)
        } else if (config.function) {
            return config.function.call({object, faker, chance, db})
        } else if (config.static) {
            return config.static
        } else if (config.hasOwnProperty('incrementalId')) {
            let n = 0
            if (db[this.entityOutputName] && db[this.entityOutputName].length){
                n = db[this.entityOutputName].length
            }
            if (config.incrementalId === true){
                config.incrementalId = 0
            }
            return (n + parseInt(config.incrementalId))
        } else {
            return null
        }
    }

}
