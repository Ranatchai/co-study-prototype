var React = require('react');
var TITLE_STYLE = {
	fontFamily: 'ThaiSansNeue-Bold',
	fontSize: '18px',
	color: '#494B4A',
	lineHeight: '19px'
};
var DESCRIPTION_STYLE = {
	fontFamily: 'ThaiSansNeue-UltraLight',
	fontSize: '16px',
	color: '#9B9B9B',
	lineHeight: '18px'
};
var Item = React.createClass({
	render: function() {
		return (
			<div {...this.props} className="latest-item" style={{float: 'left', width: 200, marginRight: 40}}>
				<h4 style={TITLE_STYLE}>{this.props.title}</h4>
				<div style={DESCRIPTION_STYLE}>{this.props.description}</div>
			</div>
		);
	}
});
var LatestSection = React.createClass({
	render: function() {
		var titleStyle = {
			fontFamily: '.HelveticaNeueDeskInterface-Regular',
			fontSize: '24px',
			color: '#222422',
			lineHeight: '28px',
			marginBottom: 15
		};
		return (
			<div style={{background: 'white', padding: 20, maxWidth: 1280, margin: 'auto', position: 'relative'}}>
				<h3 style={titleStyle}>Latest</h3>
				{this.props.data.map((item)=><Item {...item}/>)}
				<div style={{clear: 'both'}}/>
			</div>
		);
	}
});

module.exports = LatestSection;