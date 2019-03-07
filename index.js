
const AWS = require('aws-sdk');
const s3 = new AWS.S3({ signatureVersion: 'v4' });

exports.handler = (event, context, callback) => {
    let responseCode = 200;
    const bucket = process.env.bucket
    const key = event['fileName'];

    try {
        if (!bucket) {
            callback(new Error(`bucket not set`));
        }

        if (!key) {
            callback(new Error('FileName is missing'));
            return;
        }
        const params = { 'Bucket': bucket, 'Key': key };

        s3.getSignedUrl('putObject', params, (error, url) => {
            if (error) {
                callback(error);
            } else {
                let response = {
                    statusCode: responseCode,
                    url: url,
                };
                callback(null, response);
            }
        });

    } catch (error) {
        console.info(error)
    }
};