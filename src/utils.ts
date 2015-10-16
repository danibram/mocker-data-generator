export const each = function(arr, fn) {
  for (var i = 0; i < arr.length; ++i) {
    fn(arr[i]);
  }
}

export const iamLastChild = function (obj){
    if (!this.isArray(obj)) {
        let ks = Object.keys(obj)
        let last = null

        for (let i = 0; i < ks.length; i++) {
            let key = ks[i]
            if (this.isObject(obj[key])){
                last = false
                break
            } else {
                last = true
            }
        }
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
        if (this.iamLastChild(obj[key])){
            last = true
        } else {
            last = false
            break
        }
    }
    return last
}

export const isConditional = function (str: String){
    var arr = str.split(',')
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
