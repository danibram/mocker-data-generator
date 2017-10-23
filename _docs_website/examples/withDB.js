module.exports = `var user = {
    id: {
        chance: 'guid'
    },
    name: {
        faker: 'name.findName'
    },
    email: {
        faker: 'internet.email'
    }
};
var house = {
    id: {
        chance: 'guid'
    },
    address: {
        faker: 'address.streetAddress'
    },
    householder: {
        hasOne: 'users'
    },
    mateIds: {
        hasMany: 'users',
        max: 3,
        min: 1,
        get: 'id'
    }
};

mocker()
    .schema('users', user, 3)
    .schema('houses', house, 1)
`
