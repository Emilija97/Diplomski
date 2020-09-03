const mongoose = require('mongoose');
const logger = require('services/logger');

module.exports = () => {
    mongoose
        .connect(
            `mongodb+srv://emili:APLKiH5YV45r9hq@diplomski.vgboc.mongodb.net/hrapp?retryWrites=true&w=majority`,
            {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useCreateIndex: true
            }
        ).then(() => {
            console.log(`Connected to database!`);
        })
        .catch(ex => logger.error(ex));
};