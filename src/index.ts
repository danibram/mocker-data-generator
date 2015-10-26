import faker = require('faker')
import * as utils from './utils.ts'

///MAKE the config object the final object!!!!

export default class Mocker {

    public data = {}
    public entity = {}
    public initialData = null
    public path = []
    constructor(private config: any) {}

    generate(entity: string, options: any) {
        return new Promise((resolve, reject) => {
            let d = []
            if ((Number as any).isInteger(options)){
                for (let i = 0; i < options; i++) {
                    this.generateEntity(this.config[entity], function(data){
                        d.push(data)
                    })
                }
                this.data[entity + 's'] = d
                resolve(this.data)

                /*this.data[entity + 's'] = []
                utils.syncForFN(
                    options,
                    (nxt) => {
                        this.generateEntity(this.config[entity], (data) => {
                            this.data[entity + 's'].push(data)
                            console.log(d)
                            nxt()
                        })
                    },
                    () => {
                        console.log(this)
                        console.log(this.data[entity + 's'] )

                        this.data[entity + 's'] = d
                        console.log(this.data[entity + 's'] )
                        d = []
                        resolve(this.data)
                    }
                )*/
            } else {
                let cfg = this.config[entity]
                let f = options.uniqueField
                let possibleValues = cfg[f].values
                let length = possibleValues.length
                this.initialData = {}

                utils.eachSeries(
                    possibleValues,
                    (k, nxt) => {
                        this.initialData[f] = k
                        (this.generateEntity as any)(this.config[entity], (data) => {
                            this.data[entity + 's'].push(data)
                            nxt()
                        }).bind(this)
                    },
                    () => {
                        resolve(this.data)
                    }
                )
            }
        })
    }

    generateEntity(entityConfig: Object, cb) {
        this.entity = (Object as any).assign(entityConfig)

        if (this.initialData){
            this.entity = (Object as any).assign(entityConfig, this.initialData)
        }

        this.iterator (this.entity, function (object){
            cb(object)
        })
    }

    iterator(object, cb) {
        utils.overObject(
            object,
            (k, obj, nxt) => {
                let fieldCalculated
                let lvl = obj[k]
                if (utils.iamLastChild(lvl)){
                    this.generateField(lvl, function(fieldCalculated){
                        if (!utils.isConditional(k)){
                            obj[k] = fieldCalculated
                        } else {
                            var key = k.split(',')
                            if (utils.evalWithContextData(key[0], this.entity)){
                                obj[key[1]] = fieldCalculated
                            }
                        }
                        nxt()
                    })

                } else {
                    this.iterator(lvl, function (){
                        nxt()
                    })
                }
            },
            () => {
                cb(object)
            }
        )
    }

    generateField(field, cb) {
        if ( utils.isArray(field) ){
            cb(this.generateArrayField(field[0], field[1]))
        } else {
            cb(this.generateNormalField(field))
        }
    }

    generateArrayField(fieldConfig, arrayConfig) {
        let array = []
        let length = utils.fieldArrayCalcLength(arrayConfig)
        for (let i = 0; i < length; i++) {
            array.push(this.generateNormalField(fieldConfig))
        }
        return array
    }

    generateNormalField(config) {
        let object = this.entity
        let db = this.data

        if (config.faker){
            let split = config.faker.split('.')
            return (faker as any)[split[0]][split[1]].call()
        } else if (config.values) {
            return (faker as any).random.arrayElement(config.values)
        } else if (config.function) {
            return config.function.call({object, faker, db})
        } else if (config.static) {
            return config.static
        } else {
            return null
        }
    }

}
