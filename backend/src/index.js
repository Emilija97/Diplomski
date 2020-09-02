const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('./services/logger');
require('./models/people');
require('services/db')();
const mongoose = require('mongoose');

const app = express();

/**
 * Init middleware
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use('/uploads', express.static('uploads'));

if (process.env.NODE_ENV === 'development') {
    app.use((req, res, next) => {
        logger.info(`${req.method}: ${req.url}`);
        next();
    });
    require('mongoose').set('debug', true).set('useFindAndModify', false);
}
// app.use('/api', require('./routes'));
app.use("/people", require("./routes/index"));
/**
 * Exports express
 * @public
 */
module.exports = app;




// const express = require("express");
// const mongoose = require("mongoose");
// const path = require("path");
// const router = express.Router();
// const config = require("config");

// const app = express();

// // Bodyparser Middleware
// app.use(express.json());

// // app.use(bodyParser.json());
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader(
//         "Access-Control-Allow-headers",
//         "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT, OPTIONS");
//     next();
// });

// // DB Config
// // const db = config.get("mongoURI");

// // Connect to Mongo
// mongoose
//     .connect(
//         'mongodb+srv://emili:APLKiH5YV45r9hq@diplomski.vgboc.mongodb.net/hrapp?retryWrites=true&w=majority',
//         {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         })
//     .then(() => {
//         console.log("Connected to database !");
//     })
//     .catch(err => {
//         console.error(err);
//     });

// // Use Routes
// app.use("/people", require('../src/routes/index'));

// //Warnings set false
// mongoose.set("useFindAndModify", false);
// mongoose.set("useCreateIndex", true);

// // Serve static assets if in production
// if (process.env.NODE_ENV === "production") {
//     // Set static folder
//     app.use(express.static("client/build"));

//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//     });
// }

// const port = process.env.PORT || 5000;

// app.listen(port, () => console.log(`Server started on port ${port}`));