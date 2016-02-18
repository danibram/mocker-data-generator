var mocker = require('../lib')
var util = require('util')
var moment = require('moment')

var cat = {
    name: ['txuri', 'pitxi', 'kitty']
};
var cat2 = {
    name: {
        values: ['txuri', 'pitxi', 'kitty']
    },
    emails: [{
        faker: 'lorem.words()[0]',
        length: 10,
        concat: '[object.name, object.name]',
        concatStrict: true,
        fixedLength: true
    }],
    get:{
        function(){
            return this.emails.casa
        }
    }
};
var start = moment()
var m = mocker()
    .schema('cat', cat2, 1)
    .build(function(data){
        console.log('Time: ' + moment().diff(start, 's'))
        console.log(util.inspect(data, {depth:10}))
    })
