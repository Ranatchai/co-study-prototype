var classnames = require("classnames");
var appendVendorPrefix = require("react-kit/appendVendorPrefix");
var React = require('react');
var _ = require('underscore');
var ReactComponentWithPureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');
var $ = require('jquery');
var ListItem = React.createClass({
	mixins: [ReactComponentWithPureRenderMixin],
	render: function() {
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
			lineHeight: '11px'
		};
		var indexStyle = {
			fontFamily: 'Helvetica-Bold',
			fontSize: '114px',
			color: '#222422',
			lineHeight: '137px'
		};
		return (
			<div className="item" style={{minHeight: 350, border: 0, height: 'auto', position: 'relative', padding: 0}}>
				<div style={{position: 'absolute', height: '100%', backgroundPosition: 'center center', backgroundSize: 'cover', backgroundImage: 'url(' + this.props.src + ')', width: '60%', right: this.props.index%2===0?0:false, left: this.props.index%2===0?false: 0}}/>
				<div style={{width: '34%', float: this.props.index%2===0?'right': 'left', padding: '10px', marginRight: this.props.index%2===0?'60%': 0, marginLeft: this.props.index%2===0?0:'60%'}}>
					<div style={authorStyle}>BY {this.props.author}</div>
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
			<div className="list-item" {...this.props}>
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
		if (top >= MARGIN_TOP && top < offset.height) {
			$(this.refs.hl.getDOMNode()).addClass('fixed');
		} else {
			$(this.refs.hl.getDOMNode()).removeClass('fixed');
		}
	},
	render: function() {
		var latest_style = {
			fontFamily: 'Helvetica-Bold',
			fontSize: '60px',
			color: '#222422',
			lineHeight: '50px',
			marginTop: 50
		};
		var bool = window.innerWidth < 1024;
		return (
			<div style={{background: 'white', minHeight: '100%', paddingBottom: 20}}>
				{bool? (
					<div key="hl-horz" className="hl-horz" style={{height: 300, backgroundImage: 'url(' + "/images/Rectangle%20108.png" + ')', backgroundSize: 'cover', backgroundPosition: '15% 15%'}}>
					</div>
				): <div key="hl-vert" className="hl-vert" ref="hl" style={{width: '40%', minHeight: 200, height: window.innerHeight, backgroundImage: 'url(' + "/images/Rectangle%20108.png" + ')', backgroundSize: 'cover', backgroundPosition: '15% 15%'}}/>}
				<div style={{margin: bool? 'auto': '0 0 0 40%', float: bool? false: 'left', width: bool? false: '60%', minHeight: 200, position: 'relative', paddingLeft: 0, maxWidth: 768}}>
					<div style={latest_style}>THE <br/><span style={{textDecoration: 'underline'}}>LATE</span>ST</div>
					<List style={{marginTop: 40}} {...this.props}/>
				</div>
				<div style={{clear: 'both'}}/>
			</div>
		);
	}
});

module.exports = Container;