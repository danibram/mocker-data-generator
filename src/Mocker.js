import Schema from './Schema'
import {cleanVirtuals} from './utils'

export default class Mocker {

    schemas = [];

    constructor(options) {
        this.options = options ? options : {}
        this.db = {}
    }

    schema(name, schema, options) {
        this.schemas.push(new Schema(name, schema, options))
        return this
    }

    reset () {
        this.db = {}
        return this
    }

    restart () {
        this.db = {}
        this.schemas = []
        return this
    }

    build(cb) {
        this.schemas.reduce((acc, schema) => {

            let instances = schema.build(acc)

            // Clean virtuals
            if (schema.virtualPaths.length > 0){
                instances.forEach(x => cleanVirtuals(schema.virtualPaths, x, {strict: true, symbol: ','}))
            }

            // Add to db
            acc[schema.name] = instances

            return acc
        }, this.db)
        return cb(this.db)
    }

    //proccessLeaf test
    proccessLeaf (schema){
        let s = new Schema()
        return s.proccessLeaf(schema)
    }

    proccessNode (schema){
        let s = new Schema()
        s.buildSingle(schema)
        return s.result
    }
}
