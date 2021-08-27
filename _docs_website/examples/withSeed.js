module.exports = `var seedCats = [{
    "id": "bde09c8b-7d66-5818-a5bd-d46d780e7256",
    "age": 32,
    "country": "Vietnam",
    "favorite_greeting": "feed you and me",
    "name": "kitty bond"
}]



var cat = {
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
    .seed('cats', seedCats)
    .schema('cats', cat, 1)
`