// config.js
const env = process.env.NODE_ENV; // 'dev' or 'prod'
const dbPassword = process.env.DB_PASS

const dev = {
    app: {
        port: parseInt(process.env.DEV_APP_PORT) || 5000,
        host: "0.0.0.0"
    },
    db: {
        connectionString: 'mongodb://localhost:27017/pwnpals',
        options: {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
        }
    },
    sessionStore: {
        connectionString: 'mongodb://localhost:27017/pwnpals-sessions'
    }
};

const prod = {
    app: {
        port: parseInt(process.env.PROD_APP_PORT) || 5000,
        host: "0.0.0.0"
    },
    db: {
        connectionString: `mongodb+srv://doadmin:${dbPassword}@db-mongodb-nyc1-pwnpals-64d3ae37.mongo.ondigitalocean.com/pwnpals?authSource=admin&replicaSet=db-mongodb-nyc1-pwnpals`,
        options: {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            ssl: true,
            sslValidate: false,
            sslCA: `${__dirname}/ca-certificate.crt`
        }
    },
    sessionStore: {
        connectionString: `mongodb+srv://doadmin:${dbPassword}@db-mongodb-nyc1-pwnpals-64d3ae37.mongo.ondigitalocean.com/pwnpals-sessions?authSource=admin&replicaSet=db-mongodb-nyc1-pwnpals&tls=true&tlsCAFile=${__dirname}/ca-certificate.crt`
    }
};

const config = {
    dev,
    prod
};
   
module.exports = config[env];