// Port Config
process.env.PORT = process.env.PORT || 3000;

// Environment
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// DataBase
let dbUrl;
if (process.env.NODE_ENV === 'dev') {
    dbUrl = 'mongodb://localhost:27017/employeesdb';
} else {
    dbUrl = 'mongodb+srv://ingenio:wh8CkvlPyrwOjp2q@cluster0.d7edr.mongodb.net/employeesdb';
}

process.env.BDURL = dbUrl;

// Token Generation Data
/* 60 sec, 60 min, 24 hour, 30 days */
process.env.TOKEN_TIME = '48h';

process.env.SEED_TOKEN = process.env.SEED_TOKEN || 'CiDeNeTeMpLoYeEs';