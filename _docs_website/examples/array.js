module.exports = `var person_with_pseudonyms = {
    id: {
        chance: 'guid'
    },
    real_name: {
        faker: "name.firstName"
    },
    pseudonyms:   [{
            faker: 'name.firstName',
            length: 10,
            fixedLength: true
    }]    
};

mocker()
    .schema('person_with_pseudonyms', person_with_pseudonyms, 5)
`