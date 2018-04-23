const config = process.env.SERVER_ENV === 'production' ? require('./prod') : require('./dev')

module.exports = config
