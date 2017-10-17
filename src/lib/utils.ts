export const isArray = function(arg: any): boolean {
    return Object.prototype.toString.call(arg) === '[object Array]'
}

export const isObject = function(arg: any): boolean {
    return Object.prototype.toString.call(arg) === '[object Object]'
}

export const evalWithContextData = function(key: string, object: {}, db?) {
    // In this (way, we can pass object and use inside the eval string
    return eval(key)
}

export const fieldArrayCalcLength = function(config, fixedArrayLength, schema) {
    let length
    if (typeof config.length === 'function') {
        length = config.length.call(schema)
    } else if (config.fixedLength) {
        length = config.length - fixedArrayLength
    } else {
        length = Math.floor(Math.random() * config.length + 1)
    }
    return length
}

export const iamLastChild = function(parent, k) {
    if (isArray(parent[k])) {
        let last = false

        if (parent[k].length === 0) {
            return true
        }

        for (let i = 0; i < parent[k].length; i++) {
            let el = parent[k][i]
            last = !isObject(el)
            if (last) {
                break
            }
        }
        return last
    } else {
        return !isObject(parent[k])
    }
}

export const iamLastParent = function(obj) {
    let last = false
    if (isObject(obj)) {
        let ks = Object.keys(obj)

        for (let i = 0; i < ks.length; i++) {
            let k = ks[i]
            last = iamLastChild(obj, k)
            if (!last) {
                break
            }
        }
    } else {
        last = true
    }
    return last
}

export const isConditional = function(str) {
    let arr = str.split(',')
    return arr.length > 1
}

export const cleanVirtuals = function(paths, object, options) {
    // clean specific paths
    let objectCleaner = function*(path, obj, options) {
        let lvls = path.split(options.symbol)
        let dest = obj

        if (!lvls || lvls.length === 0) {
            return
        }
        if (!obj) {
            return
        }

        for (let i = 0; i < lvls.length; i++) {
            let field = lvls[i]
            if (i === lvls.length - 1 && dest[field]) {
                if (Object.getOwnPropertyNames(dest[field]).length < 1) {
                    delete dest[field]
                    break
                }
            } else {
                dest = dest[field]
            }
        }
        lvls.pop()

        if (lvls.length > 0) {
            yield* objectCleaner(lvls.join(options.symbol), obj, options)
        } else {
            return
        }
    }

    let forEachPath = function*(path, object, options) {
        let lvls = path.split(options.symbol)
        let dest = object

        for (let i = 0; i < lvls.length; i++) {
            let field = lvls[i]
            if (i === lvls.length - 1) {
                // delete specific path
                delete dest[field]
                // clean specific path
                yield* objectCleaner(path, object, options)
            } else {
                dest = dest[field]
            }
        }
    }

    let forPaths = function*(paths, object, options) {
        for (let i = 0; i < paths.length; i++) {
            let path = paths[i]
            yield* Array.from(forEachPath(path, object, options))
        }
    }

    for (let res of Array.from(forPaths(paths, object, options))) {
    }

    return object
}
