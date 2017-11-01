import { Schema } from './Schema'
import { cleanVirtuals } from './utils'

export type PromiseCb = Promise<any> | void
export type IDB = {
    [key: string]: any[]
}
export class Mocker {
    schemas: Schema[] = []
    DB: IDB = {}
    options = {}

    constructor(options = {}) {
        this.options = options
        this.DB = {}
    }

    schema(name: string, schema: {}, options?: {}): Mocker {
        this.schemas.push(new Schema(name, schema, options))
        return this
    }

    reset(): Mocker {
        this.DB = {}
        return this
    }

    restart(): Mocker {
        this.DB = {}
        this.schemas = []
        return this
    }

    build(cb?: ((_: any) => void)): Promise<any>
    build(cb?: ((_: any) => void)): void
    build(cb?: ((_: any) => void)): any {
		let error
        this.schemas.reduce((acc, schema) => {
            let instances
            try {
                instances = schema.build(acc)
            } catch (e) {
				error = new Error(' Schema: "' + schema.name + '" ' + e)
                console.error(error)
            }

            // Clean virtuals
            if (schema.virtualPaths.length > 0) {
                instances.forEach(x =>
                    cleanVirtuals(schema.virtualPaths, x, {
                        strict: true,
                        symbol: ','
                    })
                )
            }

            // Add to db
            acc[schema.name] = instances

            return acc
        }, this.DB)

        if (cb) {
            return cb(this.DB)
        } else if(error) {
			return Promise.reject(error);
		} else {
            return Promise.resolve(this.DB)
        }
    }
}
