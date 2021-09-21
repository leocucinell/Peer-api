const S3 = require('aws-sdk/clients/s3');
const fs = require("fs");
require('dotenv').config();

/* SECTION: Configuration */

const accessId = process.env.ID;
const secretId = process.env.SECRET_ID;
const Bucket = process.env.BUCKET;
const bucketRegion = process.env.AWS_BUCKET_REGION;

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
    const uploadParams = {
        Bucket,
        Body: fileStream,
        Key: file.filename 
    }

    //upload to s3
    return s3.upload(uploadParams).promise();
}

//NOTE: Downloads a file to s3
const retrieveImageFromS3 = (fileKey) => {
    const downloadParams = {
        Key: fileKey,
        Bucket,
    }

    return s3.getObject(downloadParams).createReadStream();
}

//NOTE: Deletes a file from s3
const deleteFileFromS3 = (fileKey) => {
    const deleteParams = {
        Key: fileKey,
        Bucket,
    }

    return s3.deleteObject(deleteParams).promise();
}

/* SECTION: Exports */
module.exports = {
    uploadToS3,
    retrieveImageFromS3,
    deleteFileFromS3,
}