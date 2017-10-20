const isProd = process.env.NODE_ENV === 'production'

module.exports = {
    assetPrefix: isProd ? '/mocker-data-generator' : '',
    exportPathMap: function() {
        return {
            '/': { page: '/' }
        }
    }
}
