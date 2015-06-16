var classnames = require("classnames");
var appendVendorPrefix = require("react-kit/appendVendorPrefix");
var React = require('react');
var _ = require('underscore');
var ReactComponentWithPureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');
var $ = require('jquery');
var titleTextStyle = {
	fontFamily: '.HelveticaNeueDeskInterface-Regular',
	fontSize: '18px',
	color: '#222422',
	lineHeight: '22px',
	marginBottom: 15
};
var descriptionTextStyle = {
	fontFamily: 'ThaiSansNeue-ExtraLight',
	fontSize: '20px',
	color: '#9B9B9B',
	lineHeight: '27px'			
};
var authorStyle = {
	fontFamily: 'Helvetica-Light',
	fontSize: '9px',
	color: '#9B9B9B',
	lineHeight: '11px',
	textTransform: 'uppercase'
};
var ListItem = React.createClass({
	mixins: [ReactComponentWithPureRenderMixin],
	render: function() {
		var indexStyle = {
			fontFamily: 'Helvetica-Bold',
			fontSize: '114px',
			color: '#222422',
			lineHeight: '137px'
		};
		return (
			<div className="item" style={{minHeight: 350, border: 0, height: 'auto', position: 'relative', padding: 0, cursor: 'inherit'}}>
				<div style={{position: 'absolute', height: '100%', backgroundPosition: 'center center', backgroundSize: 'cover', backgroundImage: 'url(' + this.props.thumbnail.src + ')', width: '60%', right: this.props.index%2===0?0:false, left: this.props.index%2===0?false: 0}}/>
				<div style={{width: '34%', float: this.props.index%2===0?'right': 'left', padding: '10px', marginRight: this.props.index%2===0?'60%': 0, marginLeft: this.props.index%2===0?0:'60%'}}>
					<div style={authorStyle}>BY {this.props.user.fullname}</div>
					<div style={indexStyle}>{'0' + (this.props.index + 1)}</div>
					<h3 style={titleTextStyle}>{this.props.title}</h3>
					<div style={descriptionTextStyle}>{this.props.description}</div>
					<div style={{clear: 'both'}}/>
				</div>
				<div style={{clear: 'both'}}/>
			</div>
		);
	}
});
var List = React.createClass({
	mixins: [ReactComponentWithPureRenderMixin],
	render: function() {
		return (
			<div className="list-item" style={this.props.style}>
				{this.props.data.map((item, index)=>{
					return <ListItem {...item} index={index}/>
				}, this)}
			</div>
		);
	}
});
var MARGIN_TOP = 200;
var Container = React.createClass({
	mixins: [ReactComponentWithPureRenderMixin],
	componentDidMount: function() {
		window.addEventListener('resize', _.throttle(()=>{
			this.forceUpdate();
		}, 200, {leading: false}));
		window.addEventListener('scroll', this.handleScroll);		
	},
	componentDidUpdate: function() {
		this.handleScroll();
	},
	handleScroll: function() {
		if (!this.refs.hl) {
			return;
		}
		var offset = this.getDOMNode().getBoundingClientRect();
		var top = -offset.top;
		if (top >= MARGIN_TOP) {						
			if (top + window.innerHeight < offset.height) {
				$(this.refs.hl.getDOMNode()).addClass('fixed');
				$(this.refs.hl.getDOMNode()).removeClass('bottom');
			} else {
				$(this.refs.hl.getDOMNode()).addClass('bottom');
				$(this.refs.hl.getDOMNode()).removeClass('fixed');
			}
		} else {
			$(this.refs.hl.getDOMNode()).removeClass('fixed');
			$(this.refs.hl.getDOMNode()).removeClass('bottom');
		}
	},
	render: function() {
		var latest_style = {
			fontFamily: 'Helvetica-Bold',
			fontSize: '60px',
			color: '#222422',
			lineHeight: '50px',
			marginTop: 50,
			marginRight: 10,
			paddingRight: 10,
			borderRight: '8px solid black',
			textAlign: 'right'
		};
		var bool = window.innerWidth < 1024;
		var title = this.props.title;
		var splitTitle = title.split(' ');
		var t1 = splitTitle[0];
		var t2 = splitTitle[1];
		splitTitle.splice(0, 1);
		splitTitle.splice(0, 1);
		var tr = splitTitle.join(' ');
		var coverData = this.props.data[0];
		var coverContent = [
			<div className="gradient-black-bottom" style={{position: 'absolute', bottom: 0, left: 0, right: 0, height: 200}}/>,
			<div style={{position: 'absolute', bottom: 20, left: 30, right: 30}}>
				<h1 style={_.extend({}, titleTextStyle, {color: 'white', fontSize: 36, lineHeight: '40px', marginBottom: 0})}>{coverData.title}</h1>,
				<div style={_.extend({}, descriptionTextStyle, {color: '#eee'})}>{coverData.description}</div>
			</div>
		];
		return (
			<div style={{maxWidth: 1280, margin: 'auto', position: 'relative'}}>
				{bool? (
					<div key="hl-horz" className="hl-horz" style={{height: 300, backgroundImage: 'url(' + coverData.thumbnail.src + ')', backgroundSize: 'cover', backgroundPosition: coverData.coverConfig && coverData.coverConfig.backgroundPosition || 'center center', position: 'relative'}}>
						{coverContent}
					</div>
				): <div key="hl-vert" className="hl-vert" ref="hl" style={{width: 0.4 * (window.innerWidth > 1280? 1280: window.innerWidth), minHeight: 200, height: window.innerHeight, backgroundImage: 'url(' + coverData.thumbnail.src + ')', backgroundSize: 'cover', backgroundPosition: coverData.coverConfig && coverData.coverConfig.backgroundPosition || 'center center'}}>{coverContent}</div>}
				<div style={{margin: bool? 'auto': '0 0 0 40%', float: bool? false: 'left', width: bool? false: '60%', minHeight: 200, position: 'relative', paddingLeft: 0, maxWidth: 768}}>
					<div style={latest_style}>{t1} <br/><span style={{borderBottom: '0px solid black'}}>{t2}</span> {tr}</div>
					<List style={{marginTop: 40}} data={_.rest(this.props.data)}/>
				</div>
				<div style={{clear: 'both'}}/>
			</div>
		);
	}
});

module.exports = Container;