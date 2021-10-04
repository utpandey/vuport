const dotenv = require("dotenv");

dotenv.config();

module.exports = {
    port: process.env.PORT,
    jwtKey: process.env.JWT_KEY,
    databaseURL: process.env.DATABASE_URI,
    databaseUser: process.env.DATABASE_USERNAME,
    databasePass: process.env.DATABASE_PASSWORD,
    databaseHost: process.env.DATABASE_HOST,
    databasePort: process.env.DATABASE_PORT,
    databaseDb: process.env.DATABASE_DB,
    baseURL: process.env.BASE_URI,
    region: process.env.AWS_REGION,
    bucketName: process.env.AWS_BUCKET_NAME,
    bucketVersion: process.env.AWS_BUCKET_VERSION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    emailUser: process.env.EMAIL_USER,
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectURL: process.env.REDIRECT_URI,
    refreshToken: process.env.REFRESH_TOKEN,
};