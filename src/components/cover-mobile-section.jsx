var React = require('react');
var BackgroundUtil = require('../common/background-util');
var _ = require('underscore');
var CoverCategoryPreview = React.createClass({
	render: function() {
		return (
			<div style={{float: 'left', maxWidth: 200, borderRight: '1px solid white', padding: '0 20px', height: '100%'}}>
				<h5 style={{color: 'white', fontFamily: 'Open Sans', fontWeight: 'bold', fontSize: 12, marginBottom: 5, textTransform: 'uppercase'}}>{this.props.categories[0]}</h5>
				<p style={{color: 'white', fontSize: 20, lineHeight: '20px', fontFamily: 'ThaiSansNeue-UltraLight'}}>{this.props.title}</p>
			</div>
		);
	}
});
var CoverSection = React.createClass({
	getInitialState: function() {
		var size = this.getSizeState();
		return {
			width: size.width,
			height: size.height
		};
	},	
	componentDidMount: function() {
		window.addEventListener('resize', this.handleResize);
	},
	componentWillUnmount: function() {		
		window.removeEventListener('resize', this.handleResize);
	},
	handleResize: function() {
		this.setState(this.getSizeState());
	},
	getSizeState: function() {
		var width = window.innerWidth;
		var height = window.innerHeight;
		return {
			width: width,
			height: height
		};
	},
	render: function() {
		var coverSrc = '/images/cover-mobile.jpg';		
		return (
			<div style={_.extend({width: this.state.width, height: this.state.height}, BackgroundUtil.getBackgroundProps(this.props.data[0], window.innerWidth, window.innerHeight))}>
				<div className="gradient-black-bottom" style={{position: 'absolute', left: 0, bottom: 0, paddingBottom: 20, width: this.props.data.length * 300, minWidth: '100%'}}>
					{this.props.data.map((d)=><CoverCategoryPreview {...d}/>)}
				</div>
				<img src={'/images/Logo_GMLive_for_profile_white.png'} style={{position: 'absolute', left: 20, top: 20, width: 120}}/>				
			</div>
		);
	}
});
module.exports = CoverSection;