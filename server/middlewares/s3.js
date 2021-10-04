const serverConfig = require("../config");
const aws = require("aws-sdk");
const crypto = require("crypto");
// const { promisify } = require("util");
// const util = require('util');
// require('util.promisify').shim();
const promisify = f => (...args) => new Promise((a, b) => f(...args, (err, res) => err ? b(err) : a(res)));
const randomBytes = promisify(crypto.randomBytes);

const reg = serverConfig.region;
const access = serverConfig.accessKeyId;
const secretAccessKey = serverConfig.secretAccessKey;
const version = serverConfig.bucketVersion;
const bucketName = serverConfig.bucketName;

const s3 = new aws.S3({
    reg,
    access,
    secretAccessKey,
    version,
});

async function generateUploadURL() {
    const rawBytes = await randomBytes(16);
    const imageName = rawBytes.toString("hex");

    const params = {
        Bucket: bucketName,
        Key: imageName,
        Expires: 60,
    };

    const uploadURL = await s3.getSignedUrlPromise("putObject", params);
    return uploadURL;
}

module.exports.generateUploadURL = generateUploadURL;