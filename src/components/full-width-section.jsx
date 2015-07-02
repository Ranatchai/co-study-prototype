var React = require('react');
var _ = require('underscore');
var BackgroundUtil = require('../common/background-util');
var classnames = require('classnames');
var ReactCSSTransitionGroup = require('react/lib/ReactCSSTransitionGroup');
var HalfScreenWidthCard = React.createClass({
	render: function() {		
		return (
			<div style={_.extend({float: this.props.float, height: 500, width: '50%', position: 'relative'}, BackgroundUtil.getBackgroundProps(this.props, window.innerWidth/2,500))}>
				<div style={{padding: 15, position: 'absolute', left: 0, width: '100%', bottom: 0, background: 'rgba(0,0,0,0.8)'}}>
					<p style={{textTransform: 'uppercase', fontSize: 10}}>{this.props.categories.map(c=><span><a style={{color: '#27abe1'}} href={"/category/" + c}>{c}</a></span>)}</p>
					<h6 style={{color: 'white', fontFamily: 'ThaiSansNeue', fontWeight: 'bold', fontSize: 28, margin: '10px 0'}}>{this.props.title}</h6>
					<p style={{fontWeight: 300, color: 'white', fontSize: 12}}>by {this.props.user.fullname}</p>
				</div>
			</div>
		);
	}
});
var FullWidthSection1 = React.createClass({
	render: function() {
		var d1 = this.props.data[0];
		var d2 = this.props.data[1];
		return (
			<div {...this.props}>
				<HalfScreenWidthCard {...d1} float="left"/>
				<HalfScreenWidthCard {...d2} float="right"/>
			</div>
		);
	}
});

module.exports = FullWidthSection1;