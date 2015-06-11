var Q = require('q'),
  validator = require('validator'),
  mongoose = require('mongoose'),
  request = require('request'),
  path = require('path'),
  im = require('imagemagick'),
  fs = require('fs'),
  uuid = require('node-uuid'),
  Schema = mongoose.Schema;

var AWS      = require('aws-sdk');


var accessKeyId = 'AKIAJZV2A3COYI6NVOEA',
  secretAccessKey = '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';

AWS.config.update({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey
});

var s3Stream = require('s3-upload-stream')(new AWS.S3());

var Asset;

var AssetSchema = new Schema({
	width: Number,
	height: Number,	
	type: String,
	filename: String,
	size: Number,
	src: String,
	key: String,
	extra: Schema.Types.Mixed
});

function getImageDimension(filePath) {
  return Q.denodeify(im.identify)(['-format', '%wx%hx%b-', filePath]).then(function(result) {    
    var infoStrings = result.split('-')[0].split('x');
    return {
      width: +infoStrings[0],
      height: +infoStrings[1],
      size: +infoStrings[2].split('B')[0]
    }
  });
}
function getImageDimensionFromStream(readStream) {
  var deferred = Q.defer();
  var tmpFilePath = '.tmp/' + uuid.v1();
  var writeStream = fs.createWriteStream(tmpFilePath);
  writeStream.on('error', deferred.reject);
  writeStream.on('finish', deferred.resolve);
  readStream.pipe(writeStream);
  return deferred.promise.then(function() {
    return getImageDimension(tmpFilePath);
  }).then(function(dimension) {
    return Q.ninvoke(fs, 'unlink', tmpFilePath).then(function() {
      return dimension;
    });
  })
};

AssetSchema.statics.createFromFilepath = function(readStream, assetProps) {
  readStream.pause();
  var deferred = Q.defer();
  var ext = assetProps.type.split('image/')[1];
  var upload = s3Stream.upload({
    'Bucket': 's-dev',
    'Key': uuid.v1() + '.' + ext,
    'ACL': 'public-read',
    'ContentType': assetProps.type,
    'CacheControl': 'max-age=31536000',
    'StorageClass': 'REDUCED_REDUNDANCY'
  }).on('error', deferred.reject)
    .on('uploaded', deferred.resolve);

  readStream.pipe(upload);
  readStream.resume();

  return Q.all([deferred.promise, getImageDimensionFromStream(readStream)]).spread(function(details, dimension) {
    console.log('dimension', dimension);
    assetProps.extra = details;
    assetProps.src = details.Location;
    assetProps.size = dimension.size;
    assetProps.width = dimension.width;
    assetProps.height = dimension.height;
    return Asset.create(assetProps);
  });
};

AssetSchema.statics.createFromURL = function(url) {
  var readStream = request(url);
  var deferred = Q.defer();
  readStream.on('response', function(response) {    
    var assetProps = {
      filename: path.basename(url),
      size: response.headers['content-length'],
      type: response.headers['content-type']
    };
    deferred.resolve(assetProps)    
  }).on('error', deferred.reject);

  return deferred.promise.then(function(assetProps) {
    return Asset.createFromFilepath(readStream, assetProps);
  });
};
AssetSchema.statics.createFromFile = function(streamFile, details) {  
  return Asset.createFromFilepath(streamFile, details);
};

Asset = mongoose.model('Asset', AssetSchema);

exports.model = Asset;

exports.options = {
	create: function(req, res, next) {
    var promise;
    if (req.body.url) {
      promise = Asset.createFromURL(req.body.url);      
    } else {      
      var deferred = Q.defer();
		  req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        Asset.createFromFile(file, {filename: filename, type: mimetype}).then(deferred.resolve, deferred.reject);
      });       
      req.busboy.on('error', deferred.reject);      
      req.pipe(req.busboy);
      promise = deferred.promise;
    }
    promise.then(function(asset) {
      res.json(asset);
    }).then(null, next);
	}
};