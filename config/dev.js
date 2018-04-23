module.exports = {
  port: 3000,
  sessionSecret: ['how matter it is'],
  session: {
    key: 'wotermelon',
    maxAge: 12 * 60 * 60 * 1000
  },
  db: {
    database: 'eee',
    host: '127.0.0.1',
    port: '27017',
    username: 'kk',
    password: 'kk',
    authSource: true
  },
  admin: {
    username: 'w',
    password: 'w',
    email: '593244920@qq.com'
  }
}
