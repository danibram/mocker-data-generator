var mocker = require('../lib')
var util = require('util')


var User  = {
    userData: {
        firstName: {
            faker: 'name.firstName'
        },
        lastName: {
            faker: 'name.lastName'
        },
        uid: {
                  function() {
                        return this.object.userData.lastName.slice(0,5) + this.object.userData.firstName.slice(0,2) + 1
                  }
        },
        displayName: {
            function() {
                return this.object.userData.uid
            }
        }
    },
    iepa: {
        static: []
    }
}

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
    name: ['txuri', 'pitxi', 'kitty']
};
var cat2 = {
    name: {
        values: ['txuri', 'pitxi', 'kitty']
    }
};
var m = mocker()
    .schema('User', User, 3)
    .schema('cat', cat, {uniqueField: 'name'})
    .schema('cat2', cat2, {uniqueField: 'name'})
    .schema('situation', situation, 5)
    .build(function(data){
        console.log(util.inspect(data, {depth:10}))
    })
