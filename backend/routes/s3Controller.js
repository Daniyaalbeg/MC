var uuid = require('uuid');
var aws = require('aws-sdk');
const verifyToken = require('../verifyToken');

aws.config.update({
  region: process.env.BUCKET_REGION,
  accessKeyId: process.env.S3_KEY,
  secretAccessKey: process.env.S3_SECRET
});

const S3_BUCKET = process.env.BUCKET_NAME_PROD;
const S3_BUCKET_CNIC_FILES = process.env.BUCKET_NAME_PROD_CNIC

exports.uploadDocument = (verifyToken, (req, res, next) => {
  const s3 = new aws.S3();
    const fileName = req.body.fileName
    const uniqueFileName= 'documents/'+ uuid.v4() +'.xlsx'
    const fileType = req.body.fileType;
    const s3Params = {
      Bucket: S3_BUCKET_CNIC_FILES,
      Key: uniqueFileName,
      Expires: 500,
      ContentType: fileType,
      Metadata: {
        "Cache-Control" : "max-age=31556926"
      }
    };

    s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).json({success: false, error: err})
      }


      const returnData = {
        oldName: fileName,
        newName: uniqueFileName,
        signedRequest: data,
        url: `https://${S3_BUCKET_CNIC_FILES}/${uniqueFileName}`,
        fileType: fileType
      };

      res.status(200).json({ success: true, data: { returnData }})
    });
})

async function deleteFile(objectNames) {
  const s3 = new aws.S3()
  var params = {
    Bucket: S3_BUCKET,
    Delete: {
      Objects: objectNames.map(o => ({Key: o.split('/')[4]}))
    },
  }

  console.log('waited')

  // s3.deleteObjects(params)
  // .then((result) => {
  //   console.log(result)
  //   console.log("deleted")
  //   return true
  // })
  // .catch((err) => {
  //   console.log(err)
  //   console.log("error deleting")
  //   return false
  // })

  return await s3.deleteObjects(params, (err, data) => {
    if (err) {
      console.log(err)
      return false
    }
    if (data) {
      console.log(data)
      return true
    }
  })
}

const sign_s3 = ((req, res) => {
  if (req.body.fileSize > 1500000) {
    res.writeHead(500, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '-1',
      'X-XSS-Protection': '1;mode=block',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN'
    });
    res.status(500).send("File Too Large");

  } else {
    const s3 = new aws.S3();
    const imageCategory = req.body.imageCategory
    const fileName = req.body.fileName
    const uniqueFileName= imageCategory +'/'+ uuid.v4()
    const fileType = req.body.fileType;
    const s3Params = {
      Bucket: S3_BUCKET,
      Key: uniqueFileName,
      Expires: 500,
      ContentType: fileType,
      ACL: 'public-read',
      Metadata: {
        "Cache-Control" : "max-age=31556926"
      }
    };

    s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).json({success: false, error: err})
      }


      const returnData = {
        oldName: fileName,
        newName: uniqueFileName,
        signedRequest: data,
        url: `https://${S3_BUCKET}/${uniqueFileName}`,
        fileType: fileType
      };

      res.status(200).json({ success: true, data: { returnData }})
    });
  }
})

module.exports.sign_s3 = sign_s3
module.exports.deleteFile = deleteFile