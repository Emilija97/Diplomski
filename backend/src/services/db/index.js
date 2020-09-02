const mongoose = require('mongoose');
const logger = require('services/logger');
const { db } = require('config');

module.exports = () => {
    // const {
    //     host, user, password, database,
    // } = db;

    mongoose
        .connect(
            `mongodb+srv://emili:APLKiH5YV45r9hq@diplomski.vgboc.mongodb.net/hrapp?retryWrites=true&w=majority`,
            {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useCreateIndex: true
            }
            // `mongodb://${host}`,
            // {
            //   user,
            //   pass: password,
            //   dbName: database,
            //   authSource: 'admin',
            // },
        ).then(() => {
            console.log("Connected to database !");
        })
        .catch(ex => logger.error(ex));
};