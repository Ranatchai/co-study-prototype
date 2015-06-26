'use strict';
/**
Cropping provides static functions to crop an image inside a frame.

@class Cropping
@static
**/
var $ = require('jquery');
var Cropping = {};

/**
Calculate a clip rectangle to crop an image to fit inside the frame.

@method cropFitInside
@param srcWidth {Number} Width of the original image.
@param srcHeight {Number} Height of the original image.
@param frameWidth {Number} Width of the frame to fit the image inside.
@param frameHeight {Number} Height of the frame to fit the image inside.
@return {Object} x, y, width, and height of the clip rectangle that fit inside the frame.
**/
Cropping.cropFitInside = function(srcWidth, srcHeight, frameWidth, frameHeight) {  
  var  ratio = Cropping.getFitInsideRatio(srcWidth, srcHeight, frameWidth, frameHeight);
  return Cropping.crop(srcWidth, srcHeight, frameWidth, frameHeight, ratio, ratio);
};
Cropping.getFitInsideRatio = function(srcWidth, srcHeight, frameWidth, frameHeight) {    
  var hRatio = frameWidth / srcWidth;
  var vRatio = frameHeight / srcHeight;
  var ratio = Math.min(hRatio, vRatio);
  ratio = Cropping._roundingRatioValue(ratio);
  return ratio;
};
Cropping.getFitOutsideRatio = function(srcWidth, srcHeight, frameWidth, frameHeight) {    
  var hRatio = frameWidth / srcWidth;
  var vRatio = frameHeight / srcHeight;
  var ratio = Math.max(hRatio, vRatio);
  ratio = Cropping._roundingRatioValue(ratio);
  return ratio;
};
/**
Calculate a clip rectangle to crop an image to fit outside the frame.

@method cropFitOutside
@param srcWidth {Number} Width of the original image.
@param srcHeight {Number} Height of the original image.
@param frameWidth {Number} Width of the frame to fit the image outside.
@param frameHeight {Number} Height of the frame to fit the image outside.
@return {Object} x, y, width, and height of the clip rectangle that fit outside the frame.
**/
Cropping.cropFitOutside = function(srcWidth, srcHeight, frameWidth, frameHeight) {      
  var ratio = Cropping.getFitOutsideRatio(srcWidth, srcHeight, frameWidth, frameHeight);
  return Cropping.crop(srcWidth, srcHeight, frameWidth, frameHeight, ratio, ratio);
};

Cropping._roundingRatioValue = function(value) {
  // 2 digits is not accurate enough
  // because resolution might be at level of thousands pixel
  return Math.round(value * 1000000) / 1000000;
};

/**
Calculate a clip rectangle to scale an image with the defined ``ratio``,
then crop it by the frame.

@method crop
@param srcWidth {Number} Width of the original image.
@param srcHeight {Number} Height of the original image.
@param frameWidth {Number} Width of the frame to fit the image outside.
@param frameHeight {Number} Height of the frame to fit the image outside.
@param ratio {Number} Ratio to scale the image.
@return {Object} x, y, width, and height of the clip rectangle.
**/
Cropping.crop = function(srcWidth, srcHeight, frameWidth, frameHeight, scaleX, scaleY) {
  var width = frameWidth / scaleX;
  var height = frameHeight / scaleY;
  var x = (srcWidth - width) / 2;
  var y = (srcHeight - height) / 2;
  x = Cropping._roundingRatioValue(-(x * scaleX));
  y = Cropping._roundingRatioValue(-(y * scaleY));
  width = Cropping._roundingRatioValue(srcWidth * scaleX);
  height = Cropping._roundingRatioValue(srcHeight * scaleY);
  // crop has to save as width/height, not scaleX/Y to support vary resolution of asset
  return {
    x: x,
    y: y,
    width: width,
    height: height
  };
};

Cropping.getTranslatePositon = function(frameWidth, frameHeight, srcWidth, srcHeight){
  var scale = Math.min(frameWidth /  srcWidth, frameHeight /  srcHeight);
  var left = Math.floor((frameWidth - srcWidth * scale)/2);
  var top = Math.floor((frameHeight - srcHeight * scale)/2);
  return {
    left: left,
    top: top,
    scale: scale
  };
};

Cropping.fitToFrame = function(innerDOM, frameWidth, frameHeight, srcWidth, srcHeight, allowExpand,position){
  var scale = Math.min(frameWidth /  srcWidth, frameHeight /  srcHeight);  
  if (typeof allowExpand !== 'undefined' && allowExpand === false & scale > 1.0) {
    scale = 1.0;
  }   
  var left = Math.floor((frameWidth - srcWidth * scale)/2);
  var top = Math.floor((frameHeight - srcHeight * scale)/2);

  // var transform = 'translate('+ left +'px,'+ top +'px) scale('+ scale +')';    
  var transformOrigin = '0px 0px';  
  /*apply precious css3 to browser แทนที่ของเก่า*/
  var setProps = {
    position: position||'absolute',
    x: left,
    y: top,
    scale: scale,
    transformOrigin: transformOrigin,
    width: srcWidth,
    height: srcHeight
  };
  TweenLite.set(innerDOM, setProps);

  return setProps;
};

Cropping.fitToParent = function(innerDOM)  {    
  var parentDOM = innerDOM.parent();
  Cropping.fitToFrame(innerDOM, parentDOM.width(), parentDOM.height(), innerDOM.width(), innerDOM.height());
};


Cropping.fitOutsideThumbnail = function($img, srcWidth, srcHeight, frameWidth, frameHeight) {        
  var hRatio = frameWidth / srcWidth;
  var vRatio = frameHeight / srcHeight;    
  $img.css('position', 'absolute');  
  if (hRatio > vRatio) {
    TweenLite.set($img, {
      top: '50%',
      y: '-50%',
      width: '100%'
    });
  } else {            
    TweenLite.set($img, {
      left: '50%',
      x: '-50%',
      height: '100%'
    });
  }    
};
/**
* @params {Number} hAlignRatio - value from 0 to 1 - 0 is left, 1 is right, 0.5 is center.
**/
Cropping.fitToFrameHeight = function(innerDOM, frameWidth, frameHeight, srcWidth, srcHeight, allowExpand, hAlignRatio){
  if (typeof hAlignRatio === 'undefined') {
    hAlignRatio = 0.5;
  }
  var scaleX = frameWidth / srcWidth;
  var scaleY = frameHeight / srcHeight;
  var scale;
  if (typeof allowExpand !== 'undefined' && allowExpand === false & scale > 1.0) {
    scale = 1.0;
  } else if ((frameHeight / frameWidth) > (srcHeight / srcWidth)) {
    // when container's height/width exceed default presentation's
    // we will expand presentation player to fit it
    scale = scaleX;
    // change srcHeight
    srcHeight = frameHeight / scaleX;
  } else {
    scale = Math.min(scaleX, scaleY);  
  }
  var left = Math.floor((frameWidth - srcWidth * scale) * hAlignRatio);
  var top = Math.floor((frameHeight - srcHeight * scale)/2);

  // var transform = 'translate('+ left +'px,'+ top +'px) scale('+ scale +')';    
  var transformOrigin = '0px 0px';  
  /*apply precious css3 to browser แทนที่ของเก่า*/
  TweenLite.set(innerDOM, {
    position: 'absolute',
    left: left,
    scale: scale,
    transformOrigin: transformOrigin,
    height: srcHeight
  });

  return {
    left: left,
    top: top,
    scale: scale,
    height: srcHeight
  };
};


/**
* @params {Number} hAlignRatio - value from 0 to 1 - 0 is left, 1 is right, 0.5 is center.
**/
Cropping.fitToFrameWidth = function(innerDOM, frameWidth, frameHeight, srcWidth, srcHeight, allowExpand,position){
  var scale = frameWidth /  srcWidth;   
  if (typeof allowExpand !== 'undefined' && allowExpand === false & scale > 1.0) {
    scale = 1.0;
  }   
  var left = Math.floor((frameWidth - srcWidth * scale)/2);
  var top = Math.floor((frameHeight - srcHeight * scale)/2);

  // var transform = 'translate('+ left +'px,'+ top +'px) scale('+ scale +')';    
  var transformOrigin = '0px 0px';  
  /*apply precious css3 to browser แทนที่ของเก่า*/

  var outPosition = position||'absolute';
  if(outPosition !== 'absolute'){
    left = 0;
  }
  var setProps = {
    position: outPosition,
    x: left,
    y: top,
    scale: scale,
    transformOrigin: transformOrigin,
    width: srcWidth,
    height: srcHeight
  };
  TweenLite.set(innerDOM, setProps);

  return setProps;
};

Cropping.fitCanvasHeight = function($dom, options) {
  var defaults = {
    parent: null,
    allowExpand: true,
    onAdjustSize: function(){},
    onResizeTrigger: true 
  };

  options = _.extend({}, defaults, options);

  var $this = $(this);
  var adjustSize = function() {
    var $parent = options.parent || $this.parent();
    var srcWidth = 1024.0;
    var srcHeight = 670.0;        
    var areaWidth =  $parent.width();
    var areaHeight = $parent.height();         
    var adjustPos = Cropping.fitToFrameHeight($this, areaWidth, areaHeight, srcWidth, srcHeight, options.allowExpand, options.hAlignRatio);        
    $this.data('transformPos', adjustPos);
    options.onAdjustSize(adjustPos, $this);
  };      

  if(options.onResizeTrigger === true){
    var resizeHandler = _.debounce(adjustSize, 200);
    if ($this.data('resizeHandler')) {
      $(window).off('resize', $this.data('resizeHandler'));
    }
    $this.data('resizeHandler', resizeHandler);        
    $(window).resize(resizeHandler);        
  }
  adjustSize();
};

Cropping.fitcanvas = function($dom, options) {
  var defaults = {
    parent: null,
    allowExpand: true,
    onResizeTrigger: true
  };

  options = _.extend({}, defaults, options);

  var resizeProps;
  var adjustSize = function() {
    $dom.each(function(index) {
      var $this = $(this);    
      if (index === 0) {
        var $parent = options.parent || $this.parent();
        var srcWidth = options.srcWidth || 1024.0;
        var srcHeight = options.srcHeight || 670.0;        
        var areaWidth = $parent.width();
        var areaHeight = $parent.height();        
        resizeProps = Cropping.fitToFrame($this, areaWidth, areaHeight, srcWidth, srcHeight, options.allowExpand,options.position);
      } else {
        TweenLite.set($this, resizeProps);
      }
      $this.data('transformPos', resizeProps);
    });
  };

  if(options.onResizeTrigger === true){
    var resizeHandler = _.debounce(adjustSize, 200);
    if ($dom.data('resizeHandler')) {
      $(window).off('resize', $dom.data('resizeHandler'));
    }
    $dom.data('resizeHandler', resizeHandler);
    $(window).resize(resizeHandler);        
  }
  adjustSize();

  return resizeProps.css.scale;
};
Cropping.fitcanvaswidth = function($dom, options) {
  var defaults = {
    parent: null,
    allowExpand: true,
    onResizeTrigger: true
  };

  options = _.extend({}, defaults, options);

  var resizeProps;
  var adjustSize = function() {
    $dom.each(function(index) {
      var $this = $(this);    
      if (index === 0) {
        var $parent = options.parent || $this.parent();
        var srcWidth = options.srcWidth || 1024.0;
        var srcHeight = options.srcHeight || 670.0;        
        var areaWidth = $parent.width();
        var areaHeight = $parent.height();        
        resizeProps = Cropping.fitToFrameWidth($this, areaWidth, areaHeight, srcWidth, srcHeight, options.allowExpand,options.position);
      } else {
        TweenLite.set($this, resizeProps);
      }
      $this.data('transformPos', resizeProps);
    });
  };

  if(options.onResizeTrigger === true){
    var resizeHandler = _.debounce(adjustSize, 200);
    if ($dom.data('resizeHandler')) {
      $(window).off('resize', $dom.data('resizeHandler'));
    }
    $dom.data('resizeHandler', resizeHandler);
    $(window).resize(resizeHandler);        
  }
  adjustSize();

  return resizeProps.css.scale;
};
module.exports = Cropping;