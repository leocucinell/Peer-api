const S3 = require('aws-sdk/clients/s3');
const fs = require("fs");
require('dotenv').config();

/* SECTION: Configuration */

const accessId = process.env.ID;
const secretId = process.env.SECRET_ID;
const Bucket = process.env.BUCKET;
const bucketRegion = process.env.AWS_BUCKET_REGION;
console.log(Bucket)

const s3 = new S3({
    region: bucketRegion,
    accessKeyId: accessId,
    secretAccessKey: secretId
});

/* SECTION: Connection methods to AWS-S3 */

//NOTE: Uploads a file to s3
const uploadToS3 = (file) => {
    //read the file form the upload (staging) area
    const fileStream = fs.createReadStream(file.path);

    //confijgure the params to upload to s3
    console.log(Bucket)
    const uploadParams = {
        Bucket,
        Body: fileStream,
        Key: file.filename 
    }

    //upload to s3
    return s3.upload(uploadParams).promise();
}

//NOTE: Downloads a file to s3

/* SECTION: Exports */
module.exports = {
    uploadToS3,
}