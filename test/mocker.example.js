var mocker = require('../lib')
var util = require('util')

var situation = {
    exampleVirtual:{
        static: 'hi',
        virtual: true
    },
    id: {
        function() {
            return this.object.exampleVirtual
        }
    },
    places: {
        values: ['HOUSE', 'CAR', 'MOTORBIKE']
    },
    deep:{
        more:{
            field:{
                static: 'im here',
                virtual: true
            },
            field2:{
                static: 'im here',
                virtual: true
            },
            f:{
                function(){
                    return this.object.exampleVirtual
                }
            }
        },
        dani:{
            static: 'ready!'
        }
    }
};
var cat = {
    name: {
        values: ['txuri', 'pitxi', 'kitty']
    }
};
var m = mocker()
    .schema('cat', cat, 3)
    .schema('cat2', cat, {uniqueField: 'name'})
    .schema(situation, 'situation', 5)
    .build(function(data){
        console.log(util.inspect(data, {depth:10}))
    })
