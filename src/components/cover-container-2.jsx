var React = require('react');
var CoverContainer = require('./cover-container');
var _ = require('underscore');
var Scroller = require('scroller').Scroller;
var getVendorPropertyName = require("react-kit/getVendorPropertyName");
var ReactComponentWithPureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');
var CardItem = React.createClass({
	mixins: [ReactComponentWithPureRenderMixin],
	render: function() {
		var backgroundImage = this.props.thumbnail && ('url(' + this.props.thumbnail.srcSet[4].src + ')');
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
		if (!this.props.isRender) {
			cardStyle.backgroundImage = backgroundImageS;
			return (
				<div style={this.props.style} key="card-container">
					<div style={cardStyle} key="card"/>
				</div>
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
var LOGO_SRC = 'http://touchedition.s3.amazonaws.com/asset/555edb0290a3d98a63e42aa0.png';
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
		return {data: initData, scrollLeft: 0};
	},
	componentDidMount: function() {
		this.createScroller();
		window.addEventListener('popstate', this.handlePopState);
		history.replaceState(this.state, document.title, '/#' + (this.state.data? this.state.data._id: ''));
	},
	componentDidUpdate: function(prevProps, prevState) {		
		if (this.state.data !== prevState.data) {
			if (!this._notPushState) {
				history.pushState(this.state, document.title, '/#' + (this.state.data? this.state.data._id: ''));
			}
			this._notPushState = false;
			if (this.state.data) {
				TweenMax.fromTo(this.getDOMNode(), 0.3, {
					scale: 250/window.innerWidth,
					force3D: 'auto'
				}, {
					scale: 1,
					force3D: 'auto'
				});
			} else {
				console.log('scrollTo', this._scrollLeft);
				this.scroller.scrollTo(this._scrollLeft, 0);
			}
		}
	},
	handlePopState: function(e) {
		this._notPushState = true;
		this.setState(e.state);
	},
	createScroller: function () {
    var options = {
      scrollingX: true,
      scrollingY: false,
      snapping: true,
      scrollingComplete: _.throttle(this.handleScrollComplete, 300, {leading: false})
      // decelerationRate: this.props.scrollingDeceleration,
      // penetrationAcceleration: this.props.scrollingPenetrationAcceleration,
    };
    this.scroller = new Scroller(this.handleScroll, options);
    var dataLength = this.props.data.length;
    // dataLength = 5;
    this.scroller.setDimensions(250, 250, (250 + 10) * dataLength, 250);
    this.scroller.setSnapSize((250 + 10), 250);    
    this._scrollLeft = this._scrollLeft || 0;
  },
  handleScroll: function(left, top) {
  	if (this.state.data) {
  		return;
  	}
  	this.refs['card-container'].getDOMNode().style[getVendorPropertyName('transform')] = 'translate3d(' + (-left) + 'px, 0, 0)';
  	this._scrollLeft = left;
  },
  handleScrollComplete: function() {
  	console.log('handleScrollComplete', this._scrollLeft);
  	this.setState({scrollLeft: this._scrollLeft});
  },
  handleTouchStart: function (e) {  	
    if (this.scroller) {
      this.scroller.doTouchStart(e.touches, e.timeStamp);
    }
  },

  handleTouchMove: function (e) {
    if (this.scroller) {
      e.preventDefault();
      this.scroller.doTouchMove(e.touches, e.timeStamp, e.scale);
    }
  },

  handleTouchEnd: function (e) {
    if (this.scroller) {
      this.scroller.doTouchEnd(e.timeStamp);
      // if (this.props.snapping) {
      //   this.updateScrollingDeceleration();
      // }
      
    }
  },
	render: function() {
		if (!this.state.data) {
			var windowWidth = window.innerWidth;
			return (
				<ul onTouchStart={this.handleTouchStart} onTouchMove={this.handleTouchMove} onTouchEnd={this.handleTouchEnd} style={{background: 'white', maxWidth: 960, lineHeight: "36px", height: '100%', width: '100%', position: 'absolute'}}>
					<h3 style={{textAlign: 'center', borderBottom: '1px solid #ccc', color: '#404040', fontWeight: 400}}>LATES</h3>
					<img style={{height: 10, position: 'absolute', left: 15, top: 15}} src={LOGO_SRC}/>
					<img style={{height: 20, position: 'absolute', right: 10, top: 10}} src='images/close.png'/>
					<div ref="card-container">
					{this.props.data.map((d, index)=>{
						var left = (windowWidth - 250)/2 + (250 + 10) * index;
						var absLeft = -this._scrollLeft + left;
						var isRender = !(absLeft + 250 < 0 || absLeft > windowWidth);
						return (
							<CardItem key={'card-' + d._id} index={index} {...d} isRender={isRender} style={{position: 'absolute', top: 30, left: left}} href="#" onClick={()=>this.setState({data: d})}/>
						);
					})}
					</div>
				</ul>
			);
		}
		return <CoverContainer {...this.state.data}/>
	}	
});

module.exports = Container;