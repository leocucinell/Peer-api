const S3 = require('aws-sdk/clients/s3');

/* SECTION: Configuration */

const accessId = process.env.ID;
const secretId = process.env.SECRET_ID;
const bucketName = process.env.BUCKET;
const bucketRegion = process.env.AWS_BUCKET_REGION;

const s3 = new S3({
    region: bucketRegion,
    accessKeyId: accessId,
    secretAccessKey: secretId
});

/* SECTION: Connection methods to AWS-S3 */

//NOTE: Uploads a file to s3

//NOTE: Downloads a file to s3