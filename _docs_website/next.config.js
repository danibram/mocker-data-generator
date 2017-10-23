const isProd = process.env.NODE_ENV === 'production'
let dir = isProd ? '/mocker-data-generator' : ''

module.exports = {
    assetPrefix: dir,
    webpack: config => {
        config.output.publicPath = `${dir}${config.output.publicPath}`
        return config
    },
    exportPathMap: function() {
        return {
            '/': { page: '/' }
        }
    }
}
