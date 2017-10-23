const isProd = process.env.NODE_ENV === 'production'

module.exports = {
    assetPrefix: isProd ? '/mocker-data-generator' : '',
    webpack: config => {
        config.output.publicPath = `/mocker-data-generator${config.output
            .publicPath}`
        return config
    },
    exportPathMap: function() {
        return {
            '/': { page: '/' }
        }
    }
}
