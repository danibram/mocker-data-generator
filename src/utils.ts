export const each = function(arr, fn) {
  for (let i = 0; i < arr.length; ++i) {
    fn(arr[i]);
  }
}

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

export const pluralize = function (str){

    var plural = {
        '(quiz)$'               : "$1zes",
        '^(ox)$'                : "$1en",
        '([m|l])ouse$'          : "$1ice",
        '(matr|vert|ind)ix|ex$' : "$1ices",
        '(x|ch|ss|sh)$'         : "$1es",
        '([^aeiouy]|qu)y$'      : "$1ies",
        '(hive)$'               : "$1s",
        '(?:([^f])fe|([lr])f)$' : "$1$2ves",
        '(shea|lea|loa|thie)f$' : "$1ves",
        'sis$'                  : "ses",
        '([ti])um$'             : "$1a",
        '(tomat|potat|ech|her|vet)o$': "$1oes",
        '(bu)s$'                : "$1ses",
        '(alias)$'              : "$1es",
        '(octop)us$'            : "$1i",
        '(ax|test)is$'          : "$1es",
        '(us)$'                 : "$1es",
        's$'                    : "s"
    };

    var singular = {
        '(quiz)zes$'             : "$1",
        '(matr)ices$'            : "$1ix",
        '(vert|ind)ices$'        : "$1ex",
        '^(ox)en$'               : "$1",
        '(alias)es$'             : "$1",
        '(octop|vir)i$'          : "$1us",
        '(cris|ax|test)es$'      : "$1is",
        '(shoe)s$'               : "$1",
        '(o)es$'                 : "$1",
        '(bus)es$'               : "$1",
        '([m|l])ice$'            : "$1ouse",
        '(x|ch|ss|sh)es$'        : "$1",
        '(m)ovies$'              : "$1ovie",
        '(s)eries$'              : "$1eries",
        '([^aeiouy]|qu)ies$'     : "$1y",
        '([lr])ves$'             : "$1f",
        '(tive)s$'               : "$1",
        '(hive)s$'               : "$1",
        '(li|wi|kni)ves$'        : "$1fe",
        '(shea|loa|lea|thie)ves$': "$1f",
        '(^analy)ses$'           : "$1sis",
        '((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$': "$1$2sis",
        '([ti])a$'               : "$1um",
        '(n)ews$'                : "$1ews",
        '(h|bl)ouses$'           : "$1ouse",
        '(corpse)s$'             : "$1",
        '(us)es$'                : "$1",
        's$'                     : ""
    };

    var irregular = {
        'move'   : 'moves',
        'foot'   : 'feet',
        'goose'  : 'geese',
        'sex'    : 'sexes',
        'child'  : 'children',
        'man'    : 'men',
        'tooth'  : 'teeth',
        'person' : 'people'
    };

    var uncountable = [
        'sheep',
        'fish',
        'deer',
        'series',
        'species',
        'money',
        'rice',
        'information',
        'equipment'
    ];

    // save some time in the case that singular and plural are the same
    if(uncountable.indexOf(str.toLowerCase()) >= 0)
      return str;

    // check for irregular forms
    for(let word in irregular){

        var pattern = new RegExp(word+'$', 'i');
        var replace = irregular[word];
        if(pattern.test(str))
            return str.replace(pattern, replace);
    }

    var array = plural;

    // check for matches using regular expressions
    for(let reg in array){

        var pattern = new RegExp(reg, 'i');

        if(pattern.test(str))
            return str.replace(pattern, array[reg]);
    }

    return str + 's';
}
