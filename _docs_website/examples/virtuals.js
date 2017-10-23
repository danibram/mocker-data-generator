module.exports = `var model = {
    exampleVirtual: {
        incrementalId: 0,
        virtual: true
    },

    id: {
        function: function() {
            return this.object.exampleVirtual
        }
    }
}

mocker()
    .schema('situation', model, 3)
`
