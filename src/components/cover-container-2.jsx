var React = require('react');
var BackgroundUtil = require('../common/background-util');
var CoverContainer = require('./cover-container');
var _ = require('underscore');
var Scroller = require('scroller').Scroller;
var getVendorPropertyName = require("react-kit/getVendorPropertyName");
var ReactComponentWithPureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');
var CardItem = React.createClass({
	mixins: [ReactComponentWithPureRenderMixin],
	render: function() {
		var backgroundImage = this.props.thumbnail && ('url(' + BackgroundUtil.getImageSrc(this.props, 250, 250) + ')');
		var backgroundImageS = this.props.thumbnail && ('url(' + this.props.thumbnail.srcSet[this.props.thumbnail.srcSet.length - 2].src + ')');
		var backgroundPosition = (this.props.coverConfig && this.props.coverConfig.backgroundPosition) || 'center center';
		var titleStyle = {
			position: 'absolute',
			left: 15,
			top: 15,
			fontFamily: 'ThaiSansNeue',
			fontWeight: 'bold',
			fontSize: '27px',
			color: '#FFFFFF',
			lineHeight: '20px',
			letterSpacing: '0px'
		};
		var descriptionStyle = {
			fontFamily: 'ThaiSansNeue',
			fontWeight: 300,
			fontSize: '20px',
			color: '#606060',
			lineHeight: '20px',
			letterSpacing: '1px',
			position: 'absolute', 
			top: 270
		};
		var cardStyle = {					
			width: 250,
			height: 250,
			backgroundImage: backgroundImage,
			backgroundPosition: backgroundPosition,
			backgroundSize: 'cover',
			WebkitUserSelect: 'none',
			boxShadow: '0px 6px 12px 0px rgba(0,0,0,0.20), 0px 4px 8px 0px rgba(0,0,0,0.25)'
		};		
		if (!this.props.isOnScreen) {
			if (this.props.notRender) {
				cardStyle.backgroundImage = false;
			} else {
				cardStyle.backgroundImage = backgroundImageS;
			}
			return (
				<div style={_.extend({}, this.props.style, cardStyle)} key="card-container"/>
			);
		}
		return (
			<div style={this.props.style} key="card-container">
				<div onClick={this.props.onClick} style={cardStyle} key="card">
					<div className="gradient-black-top" style={{position: 'absolute', left: 0, top: 0, right: 0, height: '50%', opacity: 0.9}}/>
					<h1 style={titleStyle}>{this.props.title}</h1>
					<img src="/images/share.png" style={{position: 'absolute', bottom: 0, left: 0}}/>
				</div>
				<div style={descriptionStyle}>{this.props.description}</div>
			</div>
		);
	}
});
var MAX_WIDTH = 414;
var MAX_HEIGHT = 736;
var LOGO_SRC = 'http://touchedition.s3.amazonaws.com/asset/555edb0290a3d98a63e42aa0.png';
var CoverList = React.createClass({
	mixins: [ReactComponentWithPureRenderMixin],
	getInitialState: function() {
		var size = this.getSizeState();
		return {
			width: size.width,
			height: size.height
		};
	},
	componentDidMount: function() {
		this.createScroller();
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
	createScroller: function () {
    var options = {
      scrollingX: true,
      scrollingY: false,
      snapping: true,
      zooming: true,
      scrollingComplete: _.throttle(this.handleScrollComplete, 300, {leading: false})
      // decelerationRate: this.props.scrollingDeceleration,
      // penetrationAcceleration: this.props.scrollingPenetrationAcceleration,
    };
    this.scroller = new Scroller(this.handleScroll, options);
    var dataLength = this.props.data.length;
    // dataLength = 5;
    this.scroller.setDimensions(250, 250, (250 + 10) * dataLength, 250);
    this.scroller.setSnapSize((250 + 10), 250);    
    this._scrollLeft = this.props.initScrollLeft || 0;
    if (this._scrollLeft !== 0) {
    	this.scroller.scrollTo(this._scrollLeft, 0);
    	this.handleScrollComplete();
    }
  },
  handleScroll: function(left, top, zoom) {  	
  	this._zoom = zoom;
  	this.refs['card-container'].getDOMNode().style[getVendorPropertyName('transform')] = 'translate3d(' + (-left) + 'px, 0, 0) scale(' + zoom + ')';
  	this._scrollLeft = left;
  },
  handleScrollComplete: function() {
  	this.setState({scrollLeft: this._scrollLeft});
  },
  handleTouchStart: function (e) {
  	this.scroller.doTouchStart(e.touches, e.timeStamp);
  },

  handleTouchMove: function (e) {
  	e.preventDefault();
    this.scroller.doTouchMove(e.touches, e.timeStamp, e.scale);
  },

  handleTouchEnd: function (e) {
    this.scroller.doTouchEnd(e.timeStamp);
    // if (this.props.snapping) {
    //   this.updateScrollingDeceleration();
    // }
  },
	render: function() {
		var windowWidth = this.state.width;
		var style = {background: 'white', maxWidth: MAX_WIDTH, maxHeight: MAX_HEIGHT, lineHeight: "36px", height: '100%', width: '100%', position: 'absolute', overflow: 'hidden'};
		return (
			<ul onTouchStart={this.handleTouchStart} onTouchMove={this.handleTouchMove} onTouchEnd={this.handleTouchEnd} style={style}>
				<h4 style={{textAlign: 'center', borderBottom: '1px solid #ccc', color: '#404040', fontWeight: 400}}>LATEST</h4>
				<img style={{height: 10, position: 'absolute', left: 15, top: 15}} src={LOGO_SRC}/>
				<img style={{height: 14, position: 'absolute', right: 10, top: 13}} src='images/close.png'/>
				<div ref="card-container">
				{this.props.data.map((d, index)=>{
					var left = (windowWidth - 250)/2 + (250 + 10) * index;
					var absLeft = -(this._scrollLeft || 0) + left;
					var isOnScreen = !(absLeft + 250 < 0 || absLeft > windowWidth);
					var notRender = false;
					if (!isOnScreen) {
						notRender = absLeft < -250 * 1 || absLeft > windowWidth + 250 * 5;						
					}
					return (
						<CardItem key={'card-' + d._id} index={index} {...d} isOnScreen={isOnScreen} notRender={notRender} style={{position: 'absolute', top: 30, left: left}} href="#" onClick={()=>this.props.handleChangeArticle(d)}/>
					);
				})}
				</div>
			</ul>
		);
	}
});
var Container = React.createClass({
	getInitialState: function() {
		var initData = null;
		var initId = location.hash.substr(1);
		if (initId) {
			for (var i = 0; i < this.props.data.length; i++) {
				if (this.props.data[i]._id === initId) {
					initData = this.props.data[i];
					break;
				}
			}
		}
		return {data: initData};
	},
	componentDidMount: function() {
		window.addEventListener('popstate', this.handlePopState);
		history.replaceState(this.state, document.title, '/#' + (this.state.data? this.state.data._id: ''));
	},
	componentWillUpdate: function(nextProps, nextState) {
		if (this.state.data !== nextState.data) {
			if (nextState.data) {
				this._scrollLeft = this.refs['cover-list']._scrollLeft;
			}
		}
	},
	componentDidUpdate: function(prevProps, prevState) {		
		if (this.state.data !== prevState.data) {
			if (!this._notPushState) {
				history.pushState(this.state, document.title, '/#' + (this.state.data? this.state.data._id: ''));
			}
			this._notPushState = false;
		}
	},
	handlePopState: function(e) {
		this._notPushState = true;
		this.setState(e.state);
	},
	render: function() {
		if (!this.state.data) {
			return <CoverList initScrollLeft={this._scrollLeft} ref="cover-list" {...this.props} handleChangeArticle={(d)=>this.setState({data: d})}/>;
		}
		return <CoverContainer {...this.state.data}/>
	}	
});

module.exports = Container;