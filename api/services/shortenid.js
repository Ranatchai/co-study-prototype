var Q = require('q');
var Hashids = require('hashids'),
	hashids = new Hashids('bslleindde');

var N = 1;
exports.generate = function(cb) {
	var deferred = Q.defer();
	var count, hash;
	redisC.incr('url-gen-count', function(err, _count) {
		count = _count;
		if (err) {
			if (cb) {cb(err);}
			deferred.reject(err);
			return;
		}
		hash = hashids.encode(count, N);
		if (cb) {cb(null, hash);}
		deferred.resolve(hash);
  });
  return deferred.promise;
};