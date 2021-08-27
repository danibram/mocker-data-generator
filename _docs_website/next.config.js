const isProd = process.env.NODE_ENV === 'production'
let dir = isProd ? '/mocker-data-generator' : ''

module.exports = {
    env: {
        ASSET_PREFIX: dir
    },
    assetPrefix: dir,
    webpack: (config) => {
        config.output.publicPath = `${dir}${
            config.output.publicPath ? config.output.publicPath : ''
        }`
        return config
    }
}
