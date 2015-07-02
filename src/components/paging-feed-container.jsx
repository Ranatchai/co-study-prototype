var React = require('react');
var BackgroundUtil = require('../common/background-util');
var _ = require('underscore');
var moment = require('moment');
var $ = require('jquery');
var ReactComponentWithPureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');
var TimeoutTransitionGroup = require('../common/timeout-transition-group');
var ReactCSSTransitionGroup = require('react/lib/ReactCSSTransitionGroup');

var Mixins = require('../common/mixins');
var TRANSITION_DURATION = 800;
var appendVendorPrefix = require('react-kit/appendVendorPrefix');
var PageComponent = React.createClass({
	mixins: [ReactComponentWithPureRenderMixin],
	render: function() {
		var style = _.extend({transitionProperty: 'transform', transitionDuration: TRANSITION_DURATION + 'ms', position: 'absolute', left: 0, top: 0, width: this.props.width, height: this.props.height, overflow: 'hidden', zIndex: 1000 - this.props.index}, this.props.style);
		style = appendVendorPrefix(style);
		return (
			<div style={style} className="page-box-shadow">
				{this.props.children}
			</div>
		);
	}
});

var PagingFeedContainer = React.createClass({
	mixins: [ReactComponentWithPureRenderMixin, Mixins.ListenTo, Mixins.WindowSizeMixin],
	getInitialState: function() {
		return {
			currentIndex: 0
		};
	},
	componentDidMount: function() {
		$('html, body').css('background', 'black');
		this.listenTo(window, 'keydown', (e)=>{
			if (e.keyCode === 40) {
				if (this.state.currentIndex === this.props.children.length - 1) {
					return;
				}
				this.setState({
					currentIndex: this.state.currentIndex + 1
				});
			} else if (e.keyCode === 38) {
				if (this.state.currentIndex === 0) {
					return;
				}
				this.setState({
					currentIndex: this.state.currentIndex - 1
				});
			}
		});
	},
	componentDidUpdate: function(prevProps, prevState) {
		if (prevState.currentIndex !== this.state.currentIndex) {
			console.log('will playAnimation');
			setTimeout(this.playPageAnimation, TRANSITION_DURATION);
		}
	},
	playPageAnimation: function() {
		var index = this.state.currentIndex;
		var page = this.refs['page-' + index];
		if (page.playAnimation) {
			page.playAnimation();
		}
	},
	getCurrentPage: function() {
		var index = this.state.currentIndex;
		var page = this.props.children[index];
		if (!page) {
			return null;
		}
		page = React.cloneElement(page, {ref: 'page-' + index});
		return (
			<PageComponent width={this.state.width} height={this.state.height} key={"page-" + index} index={index}>
				{page}
			</PageComponent>
		);
	},
	render: function() {
		var transitionName;
    var currentPageIndex = this.state.currentIndex;
    var isNextPage = true;
    if (!this._prevIndex) {
    	transitionName = 'moveFromBottom';
    } else if (currentPageIndex > this._prevIndex) {
      transitionName = 'moveFromBottom';
    } else {
      transitionName = 'moveToBottom';
      isNextPage = false;
    }
    this._prevIndex = currentPageIndex;    

		return (
			<TimeoutTransitionGroup transitionName={transitionName} enterTimeout={TRANSITION_DURATION} leaveTimeout={TRANSITION_DURATION} transitionEnter={!isNextPage} style={{position: 'absolute', left: 0, top: 0, width: '100%', height: '100%'}}>
				{this.getCurrentPage()}
			</TimeoutTransitionGroup>
		);
	}
});
var SectionA = require('./section-1');
var LatestSection = require('./latest-section');
var PolygonContainer = require('./mock-polygon-container');
var FullWidthSection1 = require('./full-width-section');
var ad1 = 'http://touchedition.s3.amazonaws.com/asset/55420f2fe57b85e332bfdcab.jpg';
var ad2 = 'http://touchedition.s3.amazonaws.com/asset/5559d77d6526e2152c531adb.jpg';
var Menubar = require('./menubar');
var CoverSection = require('./cover-desktop-section');
var Section2 = require('./section-2');
var getData = function(data, number) {
	var n = [];
	for (var i = 0; i < number; i++) {
		n.push(data.splice(0, 1)[0]);		
	}
	return n;
};
var transitionEvents = require('react-kit/transitionEvents');
var AdContainer = React.createClass({
	componentDidMount: function() {
		TweenMax.set(this.getDOMNode().childNodes, {
			x: '100%'
		});
	},
	playAnimation: function() {
		console.log('play page Animation');
		TweenMax.to(this.getDOMNode().childNodes, 0.5, {
			x: '0%'
		});
	},
	render: function() {
		return (
			<div style={_.extend({backgroundSize: 'auto 100%', backgroundColor: 'white', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat', backgroundImage: 'url(' + this.props.adSrc + ')', position: 'absolute', left: 0, top: 0, width: '100%', height: '100%'}, this.props.style)}>
				{this.props.children}
			</div>
		);
	}
});
module.exports = React.createClass({
	render: function() {
		var data = Array.prototype.slice.call(this.props.data);
		return (
			<PagingFeedContainer>
				<CoverSection data={getData(data, 3)}/>
				<AdContainer adSrc={ad1} style={{backgroundPosition: 'center center'}}>
					<FullWidthSection1 style={{position: 'absolute', left: 0, right: 0, top: '50%', marginTop: -250}} data={getData(data, 5)}/>
				</AdContainer>
				<AdContainer adSrc={ad2} style={{backgroundColor: 'black'}}>
					<PolygonContainer data={getData(data, 5)}/>
				</AdContainer>				
			</PagingFeedContainer>
		);
	}
});


