import {ArrayConfig} from '../interfaces'

const {floor} = Math
const {keys} = Object

export const evalWithContextData =  function (key: string, object: {}) {
    // In this (way, we can pass object and use inside the eval string
    return eval(key)
}

export const fieldArrayCalcLength = function (config: ArrayConfig) {
    let length
    if (config.fixedLength) {
        length = config.length
    } else {
        length = Math.floor((Math.random() * config.length) + 1)
    }
    return length
}

//General utils

export const stringToFn = function (module: {}, string: string, db: {}, object:{}) {

    let re = /(^[a-zA-Z.]*)/   //aZ.aZ
    let matches = re.exec(string)
    let fn
    let arg
    let arraySelect
    let value
    if (matches && matches.length === 2){
        let path = matches[1].split('.')
        fn = module[path[0]][path[1]]
    }

    re = /(\{[a-zA-Z0-9_:,'"\s]*\})/ //Match ({'wew':weqw})
    matches = re.exec(string)
    if (matches && matches[1]){
        arg = JSON.parse(matches[1])
    } else {
        re = /\((.*?)\)/ //Match ()
        matches = re.exec(string)
        if (matches && matches[1]){
            arg = eval(matches[1])
        }
    }

    re = /\[(\w+)(\w+)?\]/ //Match []
    matches = re.exec(string)
    if (matches && matches[1]){
        arraySelect = matches[1]
    }

    if (!arg) {
        value = fn.call()
    } else {
        value = fn.call(this, arg)
    }

    let val = value
    if (arraySelect){
        val = value[arraySelect]
    }

    return val
}

export const iamLastParent = function(obj: {}) {
    let last = false
    if (this.isObject(obj)) {
        let ks = Object.keys(obj)

        for (let i = 0; i < ks.length; i++) {
            let k = ks[i]
            last = this.iamLastChild(obj, k)
            if (!last){
                break
            }
        }
    } else {
        last = true
    }
    return last
}

export const iamLastChild = function (parent: {}, k: string) {
    if (this.isObject(parent[k])) {
        return false
    } else {
        return true
    }
}

export const isConditional = function (str: string) {
    let arr = str.split(',')
    if (arr.length > 1){
        return true
    } else {
        return false
    }
}



export const repeatFN = function (times: number, fn: Function, callback: Function) {
    let completed = 0;
    let iterate = function () {
        fn(function () {
            completed += 1;
            if (completed >= times) {
                callback();
            } else {
                iterate();
            }
        })
    }
    iterate()
};

export const eachSeries = function (arr: Object[], iterator: Function, callback: Function) {
    callback = callback || function () {}
    if (!arr.length) {
        return callback()
    }
    let completed = 0
    let iterate = function () {
        iterator(arr[completed], function (err) {
            if (err) {
                callback(err)
                callback = function () {}
            }
            else {
                completed += 1
                if (completed >= arr.length) {
                    callback()
                }
                else {
                    iterate()
                }
            }
        })
    }
    iterate()
}

export const isArray = function (x: any) {
    if (Object.prototype.toString.call(x) === '[object Array]'){
        return true
    }
    return false
}

export const isObject = function (x: any) {
    if (Object.prototype.toString.call(x) === '[object Object]'){
        return true
    }
    return false
}


export const getKeys = function(object: {}) {
    var keys_ = keys(object)
    if (this.isArray(object)) {
        // skip sort
    } else if(this.isArrayLike(object)) {
        // only integer values
        keys_ = keys_.filter((key) => floor(Number(key)) == (key as any))
        // skip sort
    } else {
        // sort
        keys_ = keys_.sort()
    }
    return keys_
}

export const isArrayLike = function(any: any) {
    if (!this.isObject(any)) return false
    if (this.isGlobalObject(any)) return false
    if(!('length' in any)) return false
    var length = any.length
    if(length === 0) return true
    return (length - 1) in any
}

const GLOBAL_OBJECT = new Function('return this')()
export const isGlobalObject = function(any: any) {
    return any === GLOBAL_OBJECT
}
