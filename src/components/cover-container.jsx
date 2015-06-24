var React = require('react');
var ReactComponentWithPureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');
var ReactCSSTransitionGroup = require('react/lib/ReactCSSTransitionGroup');
var MAX_WIDTH = 414;
var MAX_HEIGHT = 736;
var LOGO_SRC = '/images/cover-logo.png';
// var DEFAULT_BG = '/images/cover-default.jpg'
var DEFAULT_BG = 'http://gmlive.com/images/GM_Mobile_Cover_v2.jpg';
var $ = require('jquery');
var CoverMixin = {
	mixins: [ReactComponentWithPureRenderMixin],
	getInitialState: function() {
		var size = this.getSizeState();
		return {
			width: size.width,
			height: size.height,
			load: false
		};
	},
	getSizeState: function() {
		var width = window.innerWidth > MAX_WIDTH? MAX_WIDTH: window.innerWidth;
		var height = window.innerHeight > MAX_HEIGHT? MAX_HEIGHT: window.innerHeight;
		return {
			width: width,
			height: height
		};
	},
	componentDidMount: function() {
		this._start = Date.now();
		window.addEventListener('resize', ()=>this.setState(this.getSizeState()));		
		// this._loadingTL = this.createLoadingTimeline();
		this._tl = this.createTimeline();
		var img = new Image();		
		img.onload = this.handleLoadFinish;
		img.src = this.props.thumbnail.src;
	},
	// createLoadingTimeline: function() {
	// 	var tl = new TimelineMax({repeat: 2, onComplete: ()=>{
	// 		this.refs['guide-text'].getDOMNode().style.opacity = 0;
	// 	}});
	// 	tl.fromTo(this.refs['guide-text'].getDOMNode(), 0.5, {
	// 		opacity: 0
	// 	}, {
	// 		opacity: 1
	// 	}).fromTo(this.refs.arrow.getDOMNode(), 0.5, {
	// 		opacity: 1
	// 	}, {
	// 		opacity: 0
	// 	}).fromTo(this.refs.finger.getDOMNode(), 0.8, {
	// 		x: 0
	// 	}, {
	// 		x: -100
	// 	}).fromTo(this.refs.finger.getDOMNode(), 0.4, {
	// 		opacity: 1
	// 	}, {
	// 		opacity: 0
	// 	});
	// 	return tl;
	// },
	handleLoadFinish: function() {
		var MIN_TIME = 1;
		var diff = (Date.now() - this._start)/1000;
		var delay = diff > MIN_TIME? 0.5: (MIN_TIME - diff);		
		TweenMax.fromTo(this.refs['loading-cover'].getDOMNode(), 0.5, {
			opacity: 1
		}, {
			opacity: 0,
			onComplete: ()=>{
				// this._loadingTL.kill();
				this.setState({
					load: true
				}, ()=>{					
					this.animate();
				});
			}
		}).delay(delay);
	},
	animate: function() {
		if (!this._tl.isActive()) {
			this._tl.progress(0);
			this._tl.play();
		} else {
			this._tl.progress(1);
		}
	},
	renderLoadingCover: function() {
		var ARROW_HEIGHT = 40;
		var FINGER_HEIGHT = 90;
		var TOP = window.innerHeight * 0.2;
		return (
			<div ref="loading-cover" style={{position: 'absolute', color: 'white', left: 0, right: 0, top: 0, bottom: 0, background: 'rgba(0,0,0,0.7)'}}>
				<div className="content animate-fade-infinite" style={{position: 'absolute', padding: 20, left: 0, bottom: 0, fontSize: 20}}>
					<span style={{fontWeight: 300}}>Loading</span>
					<h1 style={{fontSize: 28, lineHeight: 1.4, marginTop: 10, fontFamily: 'ThaiSansNeue-Regular'}}>{this.props.title}</h1>
				</div>
			</div>
		);
	}
};
var Cover2 = React.createClass({
	mixins: [CoverMixin],	
	createTimeline: function() {		
		var tl = new TimelineMax({paused: true, onComplete: this.handleAnimateComplete});
		var text_container_pos = $(this.refs.text_container.getDOMNode()).position();
		tl.fromTo(this.refs.text_container.getDOMNode(), 0.5, {
			y: '100%'
		}, {
			y: '0%'
		}).fromTo(this.refs.img.getDOMNode(), 5, {
			y: '0%'
		}, {
			y: '5%'
		}, 0).fromTo(this.refs.title.getDOMNode(), 0.5, {
			y: this.state.height - text_container_pos.top
		}, {
			y: 0
		}, 0.2).fromTo(this.refs.tagline.getDOMNode(), 0.5, {
			y: 40
		}, {
			y: 0
		}, 0.3).fromTo(this.refs.hr.getDOMNode(), 0.5, {
			x: -($(this.refs.hr.getDOMNode()).width() + $(this.refs.hr.getDOMNode()).position().left)
		}, {
			x: 0
		}, 0.3);
		return tl;
	},
	render: function() {		
		var width = this.state.width;
		var height = this.state.height;
		var style = {
			width: width,
			height: height, 
			position: 'absolute', 
			left:0, 
			top: 0, 
			background: 'white',
			overflow: 'hidden',
			fontSize: (1 * width/320) + 'em'
		};
		return (
			<div style={style}>
				<img ref="img" src={this.props.thumbnail.src} height="120%" style={{position: 'absolute', top: '-10%', bottom: '0%', left: '50%', marginLeft: '-' + width}}/>								
				<div className="gradient-black-top" style={{position: 'absolute', left: 0, top: 0, right: 0, height: '50%', opacity: 0.5}}/>
				<div ref="text_container" style={{position: 'absolute', left: 0, bottom: 0, right: 0, color: 'white', background: 'black', padding: 10, paddingTop: 20}}>
					<h1 ref="title" style={{fontSize: '1.8em', lineHeight: 1.2, fontFamily: 'ThaiSansNeue-Regular', fontWeight: 'normal', position: 'relative'}}>{this.props.title}</h1>
					<hr ref="hr" style={{width: '80%', border: '6px solid white', margin: '10px 0px'}}/>
					<p ref="tagline" style={{fontSize: '1.25em', fontFamily: 'ThaiSansNeue-Light', fontWeight: 'normal'}}>{this.props.tagline}</p>
				</div>
				<img ref="logo" src={LOGO_SRC} style={{position: 'absolute', left: 10, top: 20, maxWidth: '64%'}}/>
				{!this.state.load && this.renderLoadingCover()}
			</div>
		);
	},
	handleAnimateComplete: function() {
		this._animating = false;
		console.log('animate complate');
	}
});

var Cover1 = React.createClass({
	mixins: [CoverMixin],
	createTimeline: function() {
		var tl = new TimelineMax({paused: true, onComplete: this.handleAnimateComplete});
		tl.fromTo([this.refs.logo.getDOMNode(), this.refs.title_container.getDOMNode()], 0.5, {
			scale: 0
		}, {
			scale: 1
		}).fromTo(this.refs.img.getDOMNode(), 5, {
			x: 0
		}, {
			x: -100,
		}, 0);

		tl.insert(TweenMax.fromTo(this.refs.title.getDOMNode(), 0.5, {
			y: 200,
			opacity: 0
		}, {
			y: 0,
			opacity: 1
		}), 0.5);

		tl.insert(TweenMax.fromTo(this.refs.tagline_container.getDOMNode(), 0.5, {
			scale: 0
		}, {
			scale: 1
		}), 1);
		return tl;
	},
	handleAnimateComplete: function() {
		console.log('animate complate');
		this._animating = false;
	},
	render: function() {
		var width = this.state.width;
		var height = this.state.height;
		var def_img_style = {
			position: 'absolute',
			top: 0,
			bottom: 0,
			left: '50%',
			height: '100%',
			marginLeft: '-' + width
		};
		var img_style = {
			position: 'absolute', 
			top: 0,
			bottom: 0,
			left: '50%',
			height: '100%',
			marginLeft: '-' + width/2
		};
		var style = {
			width: width,
			height: height, 
			position: 'absolute', 
			left:0, 
			top: 0, 
			background: 'white',
			overflow: 'hidden',
			fontSize: (0.8 * width/320) + 'em'
		};
		return (
			<div style={style} {...this.props}>				
				<img height="100%" ref="img" src={this.props.thumbnail.src} style={img_style}/>
				<div onTouchStart={this.animate} className="gradient-black-top" style={{position: 'absolute', left: 0, top: 0, right: 0, height: '50%', opacity: 0.5}}/>
				<div ref="text_container" style={{right: 0, left: '3%', top: (height * 0.6), lineHeight: 1.25, position: 'absolute'}}>
					<div style={{position: 'relative'}}>
						<div ref="title_container" style={{position: 'absolute', left: 0, top: 0, height: '100%', width: '90%', background: 'black'}}/>
						<h1 ref="title" style={{marginLeft: 5, fontSize: '1.5em', fontFamily: 'ThaiSansNeue-Regular', width: '90%', fontWeight: 'normal', position: 'relative', color: 'white'}}>{this.props.title}</h1>
					</div>
					<div ref="tagline_container" style={{width: '75%', lineHeight: 1.25, marginLeft: '3%', paddingLeft: 8, paddingTop: 8, background: 'white', position: 'relative', top: -3, color: 'black'}}>
						<p ref="tagline" style={{fontSize: '1.25em', fontFamily: 'ThaiSansNeue-Light', fontWeight: 'normal'}}>{this.props.tagline}</p>
					</div>
				</div>
				<img ref="logo" src={LOGO_SRC} style={{position: 'absolute', left: 10, top: 20, maxWidth: '64%'}}/>
				<a className="enter-site-btn" ref="button">
          <i className="fa fa-angle-down fa-3x"/>
        </a>
				{!this.state.load && this.renderLoadingCover()}
			</div>
		);
	}
});
var Cover = React.createClass({
	getInitialState: function() {
		return {
			c: true
		};
	},
	componentWillMount: function() {
		window.addEventListener('keydown', this.handleKeydown);
	},
	componentWillUnmount: function() {
		window.removeEventListener('keydown', this.handleKeydown);
	},
	handleKeydown: function(e) {
		if (e.keyCode === 40 || e.keyCode === 38) {
			e.preventDefault();
			this.setState({
				c: !this.state.c
			});
		}
	},
	handleTouchStart: function(e) {
		var touch = e.touches[0];
		var x = touch.pageX;
		var y = touch.pageY;
		this._startX = x;
		this._startY = y;
	},
	handleTouchMove: function(e) {
		var touch = e.touches[0];
		var x = touch.pageX;
		var y = touch.pageY;
		this._lastX = x;
		this._lastY = y;
	},
	handleTouchEnd: function(e) {		
		if (Math.sqrt(Math.pow(this._lastX - this._startX, 2) + Math.pow(this._lastY - this._startY, 2)) > 50) {
			this.setState({
				c: !this.state.c
			});
		}
	},
	render: function() {
		console.log('c', this.state.c);
		var Component = this.state.c? Cover1: Cover2;
		return <Component {...this.props} onTouchStart={this.handleTouchStart} onTouchMove={this.handleTouchMove} onTouchEnd={this.handleTouchEnd}/>;
	}
});

module.exports = Cover;