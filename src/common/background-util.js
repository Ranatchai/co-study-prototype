var Cropping = require('./cropping');
module.exports = {
	getImageSrc: function(article, width, height) {
		if (!article.thumbnail) {
      return null;
    }
    var thumbnail = article.thumbnail; 
    var imageUrl = thumbnail.src;
    var srcSet = thumbnail.srcSet;
    if (!thumbnail.srcSet) {
      return imageUrl;
    }
    var ratio = Cropping.getFitOutsideRatio(thumbnail.width, thumbnail.height, width, height);    
    var expectWidth = (thumbnail.width * ratio);
    var expectHeight = (thumbnail.height * ratio);
    var min = 999999, minIndex = false;
    for (var i = 0; i < srcSet.length; i++) {
      if (srcSet[i].width >= expectWidth && srcSet[i].height >= expectHeight && srcSet[i].width < min) {
        min = srcSet[i].width;
        minIndex = i;
      }
    }
    imageUrl = srcSet[minIndex]? srcSet[minIndex].src: thumbnail.src;
    return imageUrl;
	},
  getBackgroundPosition: function(article) {
    return article.coverConfig && article.coverConfig.backgroundPosition;
  },
  getBackgroundProps: function(article, width, height) {
    var backgroundImage = article.thumbnail? 'url(' + this.getImageSrc(article, width, height) + ')': false;
    var backgroundPosition = (article.coverConfig && article.coverConfig.backgroundPosition) || 'center center';
    return {
      backgroundImage: backgroundImage,
      backgroundPosition: backgroundPosition,
      backgroundSize: 'cover'
    };
  },
  getWordbreak: function(article, attr) {    
    var wordbreakSequence = article.wordbreakSequence;
    if (!wordbreakSequence || !article[attr] || !wordbreakSequence[attr] || !wordbreakSequence[attr].length) {
      return false;
    }
    var result = [];
    var word = article[attr];
    var seq = wordbreakSequence[attr];
    seq.forEach(function(pos, index) {
      if (!seq[index + 1]) {
        return;
      }
      result.push(word.substring(seq[index], seq[index+1]));
    });
    return result;
  }
};