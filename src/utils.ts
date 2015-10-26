export const each = function(arr, fn) {
  for (let i = 0; i < arr.length; ++i) {
    fn(arr[i]);
  }
}

export const iamLastChild = function (obj){
    if (!this.isArray(obj)) {
        let ks = Object.keys(obj)
        let last = null
        ks.map((k) => {
            if (this.isObject(obj[k])){
                last = false
                return
            } else {
                last = true
            }
        })
        return last
    } else {
        return true
    }
}

export const iamLastParent = function (obj){
    let ks = Object.keys(obj)
    let last = null

    for (let i = 0; i < ks.length; i++) {
        let key = ks[i]
        if (obj[key] && this.iamLastChild(obj[key])){
            last = true
            break
        } else {
            last = false
            break
        }
    }
    return last
}

export const isConditional = function (str: String){
    let arr = str.split(',')
    if (arr.length > 1){
        return true
    } else {
        return false
    }
}

export const evalWithContextData =  function (key, object){
    // In this way, we can pass object and use inside the eval string
    return eval(key)
}

export const fieldArrayCalcLength = function (config){
    if (config.fixedLength){
        return config.length
    } else {
        return Math.floor((Math.random() * config.length) + 1)
    }
}

export const isArray = function (x){
    if (Object.prototype.toString.call(x) === '[object Array]'){
        return true
    }
    return false
}

export const isObject = function (x){
    if (Object.prototype.toString.call(x) === '[object Object]'){
        return true
    }
    return false
}

export const syncForFN = function (times, iterator, callback) {
    callback = callback || function () {};

    let completed = 0;
    let iterate = function () {
        iterator(function (err) {
            if (err) {
                callback(err);
                callback = function () {};
            }
            else {
                completed += 1;
                if (completed >= times) {
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
