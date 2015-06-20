var classnames = require("classnames");
var appendVendorPrefix = require("react-kit/appendVendorPrefix");
var React = require('react');
var _ = require('underscore');
var ReactComponentWithPureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');
var $ = require('jquery');
var moment = require('moment');
moment.locale('th');
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
	textTransform: 'uppercase',
	marginLeft: 5
};
var ListItem = React.createClass({
	mixins: [ReactComponentWithPureRenderMixin],
	render: function() {
		var labelStyle = {
			fontFamily: 'Helvetica-Bold',
			fontSize: '60px',
			color: '#222422',
			marginTop: 5,
			marginBottom: 10
		};
		return (
			<div className="item" style={{minHeight: 350, border: 0, height: 'auto', position: 'relative', padding: 0, cursor: 'inherit'}}>
				<div style={{position: 'absolute', height: '100%', backgroundPosition: 'center center', backgroundSize: 'cover', backgroundImage: 'url(' + this.props.thumbnail.src + ')', width: '60%', right: this.props.index%2===0?0:false, left: this.props.index%2===0?false: 0}}/>
				<div style={{width: '34%', float: this.props.index%2===0?'right': 'left', padding: '10px', marginRight: this.props.index%2===0?'60%': 0, marginLeft: this.props.index%2===0?0:'60%'}}>
					<div style={authorStyle}>BY <a href="#" style={{color: '#27abe1', fontWeight: 'bold'}}>{this.props.user.fullname}</a></div>
					<div style={labelStyle}>{this.props.label}<span style={{fontSize: 20}}>{this.props.label_postfix}</span></div>
					<h3 style={titleTextStyle}>{this.props.title}</h3>
					<div style={descriptionTextStyle}>{this.props.description}</div>
					<div style={{clear: 'both'}}/>
				</div>
				<div style={{clear: 'both'}}/>
			</div>
		);
	}
});
function getDayTime(date) {
	var d = new Date(date);
	d.setHours(0);
	d.setMinutes(0);
	d.setSeconds(0);
	d.setMilliseconds(0);
	return +d;
};

var now = new Date();
var TODAY = getDayTime(now);
now.setDate(now.getDate() - 1);
var YESTERDAY = getDayTime(now);


var List = React.createClass({
	mixins: [ReactComponentWithPureRenderMixin],
	render: function() {
		var groupDays = {};
		var keys = [];
		this.props.data.forEach((item, index)=>{
			var day = getDayTime(item.publishedDate);
			if (!groupDays[day]) {
				groupDays[day] = [];
				keys.push(day);
			}
			groupDays[day].push(item);
		});
		console.log('groupDays', groupDays, keys);
		var index = 0;
		return (
			<div className="list-item" style={this.props.style}>				
				{keys.map((key)=>{
					var title;					
					if (key === TODAY) {
						title = 'Today';
					} else if (key === YESTERDAY) {
						title = 'Yesterday';
					} else {
						title = moment(key).format('DD MMMM YYYY');
					}
					return (
						<div className="date-section">
							<h2 style={{lineHeight: '60px', textAlign: 'center', background: 'black', color: 'white'}}>{title}</h2>
							{groupDays[key].map((item)=>{
								var time = moment(item.publishedDate).format('HH:MM');
								return <ListItem {...item} index={index++} label={time} label_postfix={'น.'}/>
							})}
						</div>
					);
				})}
			</div>
		);
	}
});
var MARGIN_TOP = 200;
var MAX_WIDTH = 1100;
var HL_RATIO = 0.45;

var IndicatorList = ['Recent', 'May', 'Apirl', 'March', 'February' , 'January'];
var Indicator = React.createClass({
	mixins: [ReactComponentWithPureRenderMixin],
	getInitialState: function() {
		return {
			index: 0
		};
	},
	componentDidMount: function() {
		var height = document.body.getBoundingClientRect().height;
		window.addEventListener('scroll', ()=> {
			var scrollTop = window.scrollY;
			this.setState({
				index: Math.round((scrollTop/(height - window.innerHeight)) * IndicatorList.length)
			});
		});
	},
	render: function() {		
		var width = (window.innerWidth - MAX_WIDTH)/2;
		return (
			<div style={{right: -width, width: width, paddingLeft: 10}} className="indicator">
				{IndicatorList.map((l, index)=>{
					return <div style={{borderLeft: '5px solid black', borderColor: (this.state.index === index)? 'black': '#ddd', paddingLeft: 10, marginBottom: 2}}><a href="#">{l}</a></div>;
				})}
			</div>
		);
	}
});
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
		var target = [this.refs.hl.getDOMNode(), this.refs.indicator.getDOMNode()] 
		if (top >= MARGIN_TOP) {						
			if (top + window.innerHeight < offset.height) {
				$(target).addClass('fixed');
				$(target).removeClass('bottom');
			} else {
				$(target).addClass('bottom');
				$(target).removeClass('fixed');
			}
		} else {
			$(target).removeClass('fixed');
			$(target).removeClass('bottom');
		}
	},
	render: function() {
		var latest_style = {
			fontFamily: 'Helvetica-Bold',
			fontSize: '60px',
			color: '#222422',
			lineHeight: '50px',
			marginTop: 29,
			marginBottom: 20,
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
			<div className="gradient-black-bottom" style={{position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%'}}/>,
			<div style={{position: 'absolute', bottom: 20, left: 30, right: 30}}>
				<h1 style={_.extend({}, titleTextStyle, {color: 'white', fontSize: 36, lineHeight: '40px', marginBottom: 0})}>{coverData.title}</h1>,
				<div style={_.extend({}, descriptionTextStyle, {color: '#eee'})}>{coverData.description}</div>
			</div>
		];
		return (
			<div style={{maxWidth: MAX_WIDTH,margin: 'auto', position: 'relative', background: 'white', paddingTop: 1}}>
				<div style={latest_style}>{t1} <br/><span style={{borderBottom: '0px solid black'}}>{t2}</span> {tr}</div>
				{bool? (
					<div key="hl-horz" className="hl-horz" style={{height: 300, backgroundImage: 'url(' + coverData.thumbnail.src + ')', backgroundSize: 'cover', backgroundPosition: coverData.coverConfig && coverData.coverConfig.backgroundPosition || 'center center', position: 'relative'}}>
						{coverContent}
					</div>
				): <div key="hl-vert" className="hl-vert" ref="hl" style={{width: HL_RATIO * (window.innerWidth > MAX_WIDTH? MAX_WIDTH: window.innerWidth), minHeight: 200, height: window.innerHeight, backgroundImage: 'url(' + coverData.thumbnail.src + ')', backgroundSize: 'cover', backgroundPosition: coverData.coverConfig && coverData.coverConfig.backgroundPosition || 'center center'}}>{coverContent}</div>}
				<div style={{margin: bool? 'auto': '0 0 0 ' + (HL_RATIO * 100) +'%', float: bool? false: 'left', width: bool? false: ((100 * (1 - HL_RATIO)) + '%'), position: 'relative', padding: '0 5px', marginTop: 50, maxWidth: 768, background: 'black'}}>
					<List style={{minHeight: window.innerHeight, background: 'white'}} data={_.rest(this.props.data)}/>
				</div>				
				<Indicator ref="indicator"/>
				<div style={{clear: 'both'}}/>
			</div>
		);
	}
});

module.exports = Container;