var classnames = require("classnames");
var appendVendorPrefix = require("react-kit/appendVendorPrefix");
var React = require('react');
var _ = require('underscore');
var ReactComponentWithPureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');
var $ = require('jquery');
var moment = require('moment');

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
				<div style={{position: 'absolute', height: '100%', backgroundPosition: 'center center', backgroundSize: 'cover', backgroundImage: 'url(' + (this.props.thumbnail && this.props.thumbnail.src) + ')', width: '60%', right: this.props.index%2===0?0:false, left: this.props.index%2===0?false: 0}}/>
				<div style={{width: '34%', float: this.props.index%2===0?'right': 'left', padding: '10px', marginRight: this.props.index%2===0?'60%': 0, marginLeft: this.props.index%2===0?0:'60%'}}>
					<div className="author">BY <a href="#" style={{color: '#27abe1', fontWeight: 'bold'}}>{this.props.user.fullname}</a></div>
					<div style={labelStyle}>{this.props.label}<span style={{fontSize: 20}}>{this.props.label_postfix}</span></div>
					<h3 className="title">{this.props.title}</h3>
					<div className="description">{this.props.description}</div>
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
		var groupWeek = {};
		var keys = [];
		this.props.data.forEach((item, index)=>{
			var day = getDayTime(item.publishedDate);
			if (!groupDays[day]) {
				groupDays[day] = [];
				keys.push(day);
			}
			groupDays[day].push(item);
		});				
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
var MARGIN_TOP = 209;
var MAX_WIDTH = 1100;
var HL_RATIO = 0.41;

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
		var width = this.props.width;
		return (
			<div style={{right: -width, width: width, paddingLeft: 10}} className="indicator">
				{IndicatorList.map((l, index)=>{
					return <div style={{borderLeft: '5px solid black', borderColor: (this.state.index === index)? 'black': '#ddd', paddingLeft: 10, marginBottom: 2}}><a href="#">{l}</a></div>;
				})}
			</div>
		);
	}
});
var Section = React.createClass({
	mixins: [ReactComponentWithPureRenderMixin],
	componentDidMount: function() {		
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
		var space = (window.innerWidth - this.props.width)/2;
		var target = this.refs.hl.getDOMNode();
		var setSpace = ()=>{
			if (this.props.reverse) {
				// $(target).css('right', space);
			} else {
				// $(target).css('left', space);
			}
		};
		var clearSpace = ()=>{
			if (this.props.reverse) {
				$(target).css('right', 0);
			} else {
				$(target).css('left', 0);
			}
		};
		if (top >= MARGIN_TOP) {						
			if (top + window.innerHeight < offset.height) {
				$(target).addClass('fixed');
				setSpace();
				$(target).removeClass('bottom');
			} else {
				$(target).addClass('bottom');
				clearSpace();
				$(target).removeClass('fixed');
			}
		} else {
			$(target).removeClass('fixed');
			$(target).removeClass('bottom');
			clearSpace();
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
		var bool = this.props.width < 1024;
		var title = this.props.title;
		var coverData = this.props.author;
		console.log('coverData', coverData.coverAsset.src);
		var coverContent = [
			<div style={{position: 'absolute', bottom: 0, left: 0, right: 0, top: 0, background: 'rgba(0,0,0,0.4)'}}/>,
			<a href="#" style={{position: 'absolute', top: '20%', left: 30, right: 30, textAlign: 'center'}} className="item">
				<div style={{margin: 'auto', borderRadius: '50%', width: 150, height: 150, backgroundImage: 'url(' + coverData.avatarAsset.src + ')', backgroundPosition: 'center center', backgroundSize: 'cover'}}/>
				<h1 className="title" style={{fontSize: 36, lineHeight: '40px', marginBottom: 0}}>{coverData.title}</h1>,
				<div className="description">{coverData.tagline}</div>
			</a>
		];
		return (
			<div style={{margin: 'auto', position: 'relative', background: 'white'}} className="list-item__1a">				
				{bool? (
					<div key="hl-horz" className="hl hl-horz" style={{height: 400, backgroundImage: 'url(' + (coverData.coverAsset && coverData.coverAsset.src) + ')', backgroundSize: 'cover', backgroundPosition: coverData.coverConfig && coverData.coverConfig.backgroundPosition || 'center center', position: 'relative'}}>
						{coverContent}
					</div>
				): <div key="hl-vert" className="hl hl-vert" ref="hl" style={{right: this.props.reverse? 0: false,width: HL_RATIO * this.props.width, minHeight: 200, height: window.innerHeight, backgroundImage: 'url(' + (coverData.coverAsset && coverData.coverAsset.src) + ')', backgroundSize: 'cover', backgroundPosition: coverData.coverConfig && coverData.coverConfig.backgroundPosition || 'center center'}}>{coverContent}</div>}
				<div style={{margin: this.props.reverse? '0': (bool? 'auto': '0 0 0 ' + (HL_RATIO * 100) +'%'), float: bool? false: 'left', width: bool? false: ((100 * (1 - HL_RATIO)) + '%'), position: 'relative', padding: '0 5px', background: 'black'}}>
					<List style={{minHeight: window.innerHeight, background: 'white'}} data={this.props.data}/>
				</div>								
				<div style={{clear: 'both'}}/>
			</div>
		);
	}
});
var ads = ["./images/ad1.jpg", 'http://touchedition.s3.amazonaws.com/asset/55420f2fe57b85e332bfdcab.jpg', 'http://touchedition.s3.amazonaws.com/asset/5559d77d6526e2152c531adb.jpg'];
var AdContainer = React.createClass({
	render: function() {
		return (
			<div style={{background: '#f0f0f0', margin: '40px 0'}}>
				<div style={{maxWidth: 1280, margin: 'auto'}}>
					<img src={this.props.src} style={{width: '100%', height: 'auto', margin: '10px 0'}}/>
				</div>
			</div>
		);
	}
});

function getWeek(date) {
	return moment(date).format('w-YY');
};
function getWeekName(date) {
	return moment(date).startOf('week').format('MMMM DD') + ' - ' + moment(date).endOf('week').format('DD');
};
var LatestSection = require('./latest-section');
var authorData = {
	title: 'Gabe Newell',
	tagline: 'co-founder and managing director of video game development and online distribution company Valve Corporation.',	
	avatarAsset: {
		src: 'http://t2.gstatic.com/images?q=tbn:ANd9GcQHmvXyN8XuRbjW9gfBQTUOhoO-q4JmTQtqymWgMu_I18ZuHTH_'
	},
	coverAsset: {
		src: './images/author-cover.jpg'
	}
};
var Container = React.createClass({
	mixins: [ReactComponentWithPureRenderMixin],
	getInitialState: function() {
		var size = this.getSizeState();
		return {
			width: size.width,
			height: size.height
		};
	},
	getSizeState: function() {
		var width = window.innerWidth;
		var height = window.innerHeight;
		return {
			width: width,
			height: height
		};
	},
	componentDidMount: function() {
		window.addEventListener('scroll', this.handleScroll);
		window.addEventListener('resize', ()=>this.setState(this.getSizeState()));
	},
	componentDidUpdate: function() {
		this.handleScroll();
	},
	handleScroll: function() {
		if (!this.refs.indicator) {
			return;
		}
		var offset = this.getDOMNode().getBoundingClientRect();
		var top = -offset.top;
		var space = (window.innerWidth - this.state.width)/2;
		var target = this.refs.indicator.getDOMNode();
		if (top >= MARGIN_TOP) {
			$(target).addClass('fixed');
		} else {
			$(target).removeClass('fixed');
		}
	},
	render: function() {
		var data = this.props.data;
		return (
			<div className="s-2a">
				<Section width={this.state.width} height={this.state.height} data={data} author={authorData}/>
			</div>
		);
	}
})

module.exports = Container;