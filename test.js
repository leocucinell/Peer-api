/*
    Secrets manager:
*/

const AWS = require('aws-sdk');
const   region = "us-west-2";
const  secretName = "peerSdkUser";
require('dotenv').config();

// Create a Secrets Manager client
const sm = new AWS.SecretsManager({
    region: region,
    accessKeyId: process.env.ID,
    secretAccessKey: process.env.SECRET_ID
});

async function retrieveSecret(key){
    const params = {
        SecretId: key
    }

    try{
        const secret = await sm.getSecretValue(params).promise();
        console.log(JSON.parse(secret.SecretString));
    }catch(e){
        console.log(e);
    }
}

retrieveSecret(secretName);