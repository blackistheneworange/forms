const util = require('util')
const path=require('path');
var {Storage}=require('@google-cloud/storage');
var serviceKey=require('./keys');


var storage=new Storage({
  projectId:'forms-images',
  keyFilename:path.join(__dirname,'keys.json')
});


const bucket = storage.bucket('forms-images-store')



exports.uploadImage = (file,fileName) => new Promise((resolve, reject) => {
  const { originalname, buffer } = file


  const blob = bucket.file(fileName)
  
  const blobStream = blob.createWriteStream({
    resumable: false
  })
  
  blobStream
  .on('finish', () => {
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`
   
    resolve(publicUrl)
  })
  .on('error', (err) => {
  
    reject(`Unable to upload image, something went wrong`)
  })
  .end(buffer)
})