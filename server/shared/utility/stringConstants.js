module.exports = {
    production: 'production',
    routePrefix: '/waves/api',
    mongoDbConStr: process.env.NODE_ENV === 'production' ? 'mongodb://clarosian:<PASSWORD>@guitars-shard-00-00-pqspz.mongodb.net:27017,guitars-shard-00-01-pqspz.mongodb.net:27017,guitars-shard-00-02-pqspz.mongodb.net:27017/test?ssl=true&replicaSet=guitars-shard-0&authSource=admin&retryWrites=true' : 'mongodb://localhost:27017/waves'
};