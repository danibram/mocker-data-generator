module.exports = `var cat = {
    id: {
        chance: 'guid'
    },
    age: {
        faker: 'random.number({"min": 1, "max": 17})'
    },
    country: {
        casual: 'country'
    },
    favorite_greeting: {
        randexp: /feed (me|you and me|he and me|she and me)/
    },
    name: {
        values: ['txuri', 'pitxi', 'kitty', 'obi']
    }
};

mocker()
    .schema('cats', cat, 1)
`
