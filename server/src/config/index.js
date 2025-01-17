require('dotenv').config();

const {
  PORT,
  APP_KEY,
  MONGODB_HOST,
  MONGODB_USER,
  MONGODB_PASSWORD,
  MONGODB_DATABASE,
  ATLAS_URI,
  EMAIL_ACC,
  EMAIL_PASS,
  FRONTEND_DOMAIN,
  APP_DOMAIN,
} = process.env;

const port = PORT || 5000;

module.exports = {
  port,
  appKey: APP_KEY,
  domains: {
    frontend: FRONTEND_DOMAIN,
    api: APP_DOMAIN,
  },
  mail: {
    account: EMAIL_ACC,
    password: EMAIL_PASS,
  },
  uri: ATLAS_URI,
  db: {
    host: MONGODB_HOST,
    user: MONGODB_USER,
    password: MONGODB_PASSWORD,
    database: MONGODB_DATABASE,
  },
};
