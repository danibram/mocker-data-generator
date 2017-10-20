let fs = require('fs')
let path = require('path')

let filenames = fs.readdirSync(path.join(__dirname, 'examples'))
let info = filenames.reduce((acc, val) => {
    let file = require(path.join(__dirname, 'examples', val))
    acc[val.split('.')[0]] = file
    return acc
}, {})

fs.writeFileSync(
    path.join(__dirname, 'static', 'examples.json'),
    JSON.stringify(info, null, 4)
)
