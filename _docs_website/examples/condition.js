module.exports = `var conditional = {
    condition: {
        faker: 'helpers.randomize(["email", "user"])'
    },
    'object.condition==="email",show': {
        static: 'email'
    },
    'object.condition==="user",show': {
        static: 'user'
    },
    'object.condition==="email",email': {
        hasOne: 'emails'
    },
    'object.condition==="user",user': {
        hasOne: 'users'
    }
}

var user = {faker: 'name.findName'}
var email = {faker: 'internet.email'}

mocker()
    .schema('users', user, 2)
    .schema('emails', email, 2)
    .schema('situation', conditional, {min:2, max: 5})
`
