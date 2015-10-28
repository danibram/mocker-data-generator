const {floor} = Math;
const {keys} = Object;

//Specific field utils

export const evalWithContextData =  function (key, object){
    // In this (way, we can pass object and use inside the eval string
    return eval(key)
}

export const fieldArrayCalcLength = function (config){
    if (config.fixedLength){
        return config.length
    } else {
        return Math.floor((Math.random() * config.length) + 1)
    }
}

//General utils

export const iamLastParent = function(obj) {
    if (this.isObject(obj)) {
        let ks = Object.keys(obj)
        let last = null
        ks.map((k) => {
            last = this.iamLastChild(obj, k)
            if (!last){
                return
            }
        })
        return last
    } else {
        return true
    }
}

export const iamLastChild = function (parent, k){
    if (this.isObject(parent[k])) {
        return false
    } else {
        return true
    }
}

export const isConditional = function (str: String){
    let arr = str.split(',')
    if (arr.length > 1){
        return true
    } else {
        return false
    }
}



export const repeatFN = function (times, fn, callback) {
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

export const eachSeries = function (arr, iterator, callback) {
    callback = callback || function () {};
    if (!arr.length) {
        return callback();
    }
    let completed = 0;
    let iterate = function () {
        iterator(arr[completed], function (err) {
            if (err) {
                callback(err);
                callback = function () {};
            }
            else {
                completed += 1;
                if (completed >= arr.length) {
                    callback();
                }
                else {
                    iterate();
                }
            }
        });
    };
    iterate();
};

export const overObject = function (obj, iterator, callback) {
    callback = callback || function () {};
    let arr = Object.keys(obj)
    if (!arr.length) {
        return callback();
    }
    let completed = 0;
    let iterate = function () {
        let k = arr[completed]
        iterator(k, obj, function (err) {
            if (err) {
                callback(err);
                callback = function () {};
            } else {
                completed += 1;
                if (completed >= arr.length) {
                    callback();
                }
                else {
                    iterate();
                }
            }
        });
    };
    iterate();
};

export const isArray = Array.isArray

export const isObject = function (x){
    if (Object.prototype.toString.call(x) === '[object Object]'){
        return true
    }
    return false
}


export const getKeys = function(object) {
    var keys_ = keys(object);
    if (this.isArray(object)) {
        // skip sort
    } else if(this.isArrayLike(object)) {
        // only integer values
        keys_ = keys_.filter((key) => floor(Number(key)) == (key as any));
        // skip sort
    } else {
        // sort
        keys_ = keys_.sort();
    }
    return keys_;
}

export const isArrayLike = function(any) {
    if (!this.isObject(any)) return false;
    if (this.isGlobalObject(any)) return false;
    if(!('length' in any)) return false;
    var length = any.length;
    if(length === 0) return true;
    return (length - 1) in any;
}

const GLOBAL_OBJECT = new Function('return this')();
export const isGlobalObject = function(any) {
    return any === GLOBAL_OBJECT;
}
