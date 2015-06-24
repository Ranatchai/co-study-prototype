var React = require('react');
var GAP_BETWEEN_TITLE_DESCRIPTION = 6;
var TOTAL_NUMBER_OF_LINE = 7;
var LINE_HEIGHT = 18
var TITLE_STYLE = {	
	lineHeight: LINE_HEIGHT + 'px',
	maxHeight: LINE_HEIGHT * 3,
	marginBottom: GAP_BETWEEN_TITLE_DESCRIPTION
};
var DESCRIPTION_STYLE = {	
	lineHeight: LINE_HEIGHT + 'px',
	maxHeight: LINE_HEIGHT * 4
};
var Item = React.createClass({
	render: function() {
		return (
			<a href="#" className="latest-item" style={{float: 'left', width: 200, marginRight: 40, height: LINE_HEIGHT*TOTAL_NUMBER_OF_LINE + GAP_BETWEEN_TITLE_DESCRIPTION, overflow: 'hidden'}} {...this.props}>
				<h4 className="title" style={TITLE_STYLE}>{this.props.title}</h4>
				<div className="content" style={DESCRIPTION_STYLE}>{this.props.description}</div>
			</a>
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
			<div style={{background: 'white', padding: 20, maxWidth: 1280, margin: 'auto', position: 'relative', height: (LINE_HEIGHT*TOTAL_NUMBER_OF_LINE + GAP_BETWEEN_TITLE_DESCRIPTION + 20*2), overflow: 'hidden'}}>
				<h3 style={titleStyle}>Latest</h3>
				{this.props.data.map((item)=><Item {...item}/>)}
				<div style={{clear: 'both'}}/>
			</div>
		);
	}
});

module.exports = LatestSection;