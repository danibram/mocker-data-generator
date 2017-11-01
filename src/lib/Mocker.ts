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

<<<<<<< HEAD
    build(cb?: ((error: Error | null , _?: any) => void)): Promise<any>
    build(cb?: ((error: Error | null , _?: any) => void)): void
    build(cb?: ((error: Error | null , _?: any) => void)): any {
        try {
            this.schemas.reduce((acc, schema) => {
                let instances

                try {
                    instances = schema.build(acc)
                } catch (e) {
                    throw new Error('Schema: "' + schema.name + '" ' + e)
                }
=======
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
>>>>>>> 469d285cc07eb11c64830ae07b1b1bfbe79261ab

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

<<<<<<< HEAD
                return acc
            }, this.DB)
        } catch (e) {
            return (cb)
                ? cb(e)
                : Promise.reject(e)
=======
            return acc
        }, this.DB)

        if (cb) {
            return cb(this.DB)
        } else if(error) {
			return Promise.reject(error);
		} else {
            return Promise.resolve(this.DB)
>>>>>>> 469d285cc07eb11c64830ae07b1b1bfbe79261ab
        }

        return (cb)
            ? cb(null, this.DB)
            : Promise.resolve(this.DB)
    }
}
