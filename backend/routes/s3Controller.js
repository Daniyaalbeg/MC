var uuid = require('uuid');
var aws = require('aws-sdk');

aws.config.update({
  region: process.env.BUCKET_REGION,
  accessKeyId: process.env.S3_KEY,
  secretAccessKey: process.env.S3_SECRET
});

const S3_BUCKET = process.env.BUCKET_NAME;

exports.sign_s3 = ((req, res) => {
  if (req.body.fileSize > 2100000) {
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
      ACL: 'public-read'
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
        url: `https://${S3_BUCKET}.s3.amazonaws.com/${uniqueFileName}`,
        fileType: fileType
      };
      res.status(200).json({ success: true, data: { returnData }})
    });
  }
})