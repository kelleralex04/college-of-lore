const express = require('express')
const multer = require('multer')
const multerS3 = require('multer-s3')
const AWS = require('@aws-sdk/client-s3')
require('dotenv').config()

const BUCKET_NAME = process.env.S3_BUCKET
const REGION = process.env.REGION
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new AWS.S3({
    credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
    },
    region: REGION
})

const multerUpload = () => multer({
    storage: multerS3({
        s3: s3,
        bucket: BUCKET_NAME,
        metadata: function(req, file, cb) {
            cb(null, {fieldname: file.fieldname})
        },
        key: function(req, file, cb) {
            cb(null, file.originalname)
        }
    })
}).array('s3Images', 2)

const uploadToAWS = (req, res) => {
    console.log('test')
    const upload = multerUpload();

    upload(req, res, err => {
        if (err) {
            console.log(err)
            res.json({err, msg: 'Error occurred while uploading'})
            return
        }
        res.json({msg: 'files uploaded successfully', files: req.files})
    })
}

const fetchImages = (req, res) => {
    s3.listObjects({Bucket: BUCKET_NAME})
    .then(data => {
        let baseURL = 'https://college-of-lore-seir-1030.s3.us-west-2.amazonaws.com/'
        let urlArr = data.Contents.map(e => baseURL + e.Key)
        res.status(200).json({urlArr})
    })
}

const router = express.Router()

router.post('/upload', uploadToAWS)
router.get('/fetchall', fetchImages)

module.exports = router