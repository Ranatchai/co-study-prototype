var React = require('react');
var BackgroundUtil = require('../common/background-util');
var ArticleImage = require('./article-image');
var _ = require('underscore');
var Touchable = require('./touchable');
var CoverCategoryPreview = React.createClass({
	render: function() {
		var category = this.props.categories[0];
		return (
			<Touchable handleAction={this.props.handleAction && this.props.handleAction.bind(null, this.props)} style={_.extend({float: 'left', maxWidth: window.innerWidth/2 - 12 + 1, borderRight: '1px solid white', marginLeft: 12, paddingRight: 12, height: '100%'}, this.props.style)}>
				<h5 style={{color: 'white', fontFamily: 'Open Sans', fontWeight: 'bold', fontSize: 12, marginBottom: 5, textTransform: 'uppercase'}}>{category}</h5>
				<p style={{color: 'white', fontSize: 20, lineHeight: '20px', fontFamily: 'ThaiSansNeue', fontWeight: 100}}>{this.props.title}</p>
			</Touchable>
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
		var coverSrc = this.props.background;
		var title = this.props.title;
		var titleStyle = {
			fontFamily: 'Antonio, Open Sans',
			fontWeight: 100,
			fontSize: '36px',
			color: '#FFFFFF',
			letterSpacing: '5.09px',
			lineHeight: '57px',
			marginLeft: 12,
			marginBottom: 20
		};
		var d1 = this.props.data[0];
		var otherD = _.rest(this.props.data);
		return (
			<ArticleImage width={this.state.width} height={this.state.height} article={this.props.data[0]} style={coverSrc? {backgroundImage: 'url(' + coverSrc + ')'}: {}}>
				{coverSrc? false: <div style={{
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						background: 'rgba(0,0,0,0.2)'
					}}/>}
				<div className={coverSrc? "": "gradient-black-bottom"} style={{position: 'absolute', left: 0, bottom: 0, paddingBottom: 12, width: this.props.data.length * 300, minWidth: '100%'}}>
					<h2 style={titleStyle}>{title}</h2>
					<CoverCategoryPreview handleAction={this.props.handleItemAction} {...d1} style={{display: 'block', float: 'none', border: 0, marginBottom: 20}}/>
					{otherD.map((d)=><CoverCategoryPreview handleAction={this.props.handleItemAction} {...d}/>)}
				</div>
				<img src={'/images/Logo_GMLive_for_profile_white.png'} style={{position: 'absolute', left: 20, top: 20, width: 120}}/>								
			</ArticleImage>
		);
	}
});
module.exports = CoverSection;