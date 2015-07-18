'use strict';
var React = require('react');
var BackgroundUtil = require('../common/background-util');
var _ = require('underscore');

var LoadedImage = [];
var ArticleImage = React.createClass({
	getInitialState: function() {
		var src = this.getSrc();
		var loaded = (LoadedImage.indexOf(src) >= 0) || (this.props.width < 100 && this.props.height < 100);		
		return {
			loaded: loaded
		};
	},
	componentDidMount: function() {		
		var img = new Image(),
			src = this.getSrc();
		img.onload = ()=>{
			LoadedImage.push(src);
			this.setState({loaded: true})
		};
		img.src = src;
	},
	getSrc: function() {
		var { article, width, height } = this.props;
		return BackgroundUtil.getImageSrc(article, width, height);
	},
	render: function() {
		var { article, width, height, style, ...other } = this.props;
		var imageWidth = width, imageHeight = height;
		if (!this.state.loaded) {
			imageWidth = 50;
			imageHeight = 50;
		}
		style = _.extend({
			width: width,
			height: height
		}, BackgroundUtil.getBackgroundProps(article, imageWidth, imageHeight), style);
		return <div {...other} style={style}/>
	}
});
module.exports = ArticleImage;