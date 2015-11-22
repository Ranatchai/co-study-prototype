var React = require('react');
var _ = require('lodash');
window._ = _;
document.title = 'Co-Study';
var Touchable = require('../touchable');
var isTouchDevice = require('../../common/touch-util').isTouchDevice;
var insertRule = require('react-kit/insertRule');
insertRule('a:hover{text-decoration:none; color:inherit; }');
insertRule('* {user-select: none; -webkit-user-select: none;}')

var $ = require('jquery');
var ExitButton = React.createClass({
	render: function() {
		return (
			/* jshint ignore: start*/
			<div {...this.props} className="exit-player-button">
				<span></span>
				<svg className="exit-player-button-x" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
				 <g>
				  <title>Layer 1</title>
				  <line strokeLinecap="undefined" strokeLinejoin="undefined" id="svg_7" y2="324.5" x2="472.5" y1="51.5" x1="89.5" strokeWidth="1.5" stroke="#000" fill="none"></line>
				  <line stroke="#000" strokeLinecap="undefined" strokeLinejoin="undefined" id="svg_10" y2="0.5" x2="0.499999" y1="19.5" x1="19.5" fillOpacity="null" strokeOpacity="null" strokeWidth="1.5" fill="none"></line>
				  <line transform="rotate(87.9546 10 10)" stroke="#000" strokeLinecap="undefined" strokeLinejoin="undefined" id="svg_11" y2="0.5" x2="0.499999" y1="19.5" x1="19.5" fillOpacity="null" strokeOpacity="null" strokeWidth="1.5" fill="none"></line>
				 </g>
				</svg>
			</div>
			/* jshint ignore: end*/
		);
	}
});
var badgeURL = "/images/500px-sonic-adventure-badge.png";
var sample1 = {
  title: 'Papa Coffee Shop',
  description: 'Public & Private room (max. 6)',
  startingPrice: 30,
  star: 3,
  nearby: 300,
  facilities: [
  	'Air Conditioner',
  	'Whiteboard',
  	'Wifi Internet'
 	],
 	reviews: [
 		{
 			text: 'Love the Environment here. The service was the best. Internet is fast. Will come here…',
 			user: 'John Universityguy'
 		},
 		{
 			text: 'Love the Environment here. The service was the best. Internet is fast.',
 			user: 'Steve bob'
 		}
 	],
 	options: [
 		{
 			title: 'Co-Study Package',
 			description: 'Individual seat, share table.',
 			price: 30,
 			priceT: 'per Hour per Person',
 			unit: 'Seat'
 		},
 		{
 			title: 'Private Package',
 			description: 'Private room for 6 people.',
 			price: 120,
 			priceT: 'per Hour per Room',
 			unit: 'Room'
 		}
 	],
 	maxUser: 5,
 	// startTime: '16:00',
 	// endTime: '19:00'
};
var dd = [
	{
		title: 'Papa Coffee Shop', 
		src: '/images/co-study/Coffeeshop3.jpg',
		maxUser: 6,
		startingPrice: 30,
		nearby: 300
	},
	{
		title: 'Amarin Apartment', 
		src: '/images/co-study/apartment-1.jpeg',
		maxUser: 8,
		startingPrice: 50,
		nearby: 500
	},
	{
		title: 'Emquatier Office Space',
		src: '/images/co-study/conf-room.jpeg',
		maxUser: 8,
		startingPrice: 100,
		nearby: 800
	},
	{
		title: 'Swiss Style',
		src: 'http://blog.sqwiggle.com/content/images/2014/01/11-Unwritten-Rules-of-Coffee-Shop-Roberto_Ventre-e1391150672343.jpg',
		maxUser: 3,
		startingPrice: 40,
		nearby: '1,100'
	},
	{
		title: 'BBC Restaurant',
		src: '/images/co-study/Restaurant.jpg',
		startingPrice: 20,
		nearby: '1,500'
	},
	{
		src: 'http://assets.inhabitat.com/wp-content/blogs.dir/1/files/2010/08/thatchers3.jpg',
		maxUser: 3,
		startingPrice: 100,
		nearby: '2,000'
	}
];
var LoadingCenter = require('./loading-center');
var i = 0;
var list = dd.map((d)=>_.extend({}, sample1, {
	key: i,
	star: Math.round(3 + Math.random() * 2),
	maxUser: (i++) + 1
}, d));
var TimeoutTransitionGroup = require('../../common/timeout-transition-group');
var TRANSITION_DURATION = 800;
var Loading = React.createClass({
	render: function() {
		return (
			<div style={{
				position: 'fixed',
    		left: 0,
    		right: 0,
    		top: 0,
    		bottom: 0,
    		background: 'rgba(0,0,0,0.6)',
    		zIndex: 155
			}}>
				<LoadingCenter/>
			</div>
		);
	}
});
var Icon = React.createClass({
	render: function() {
		var {name, ...other} = this.props;
		return (
			<i className={'fa fa-' + name} {...other}/>
		);
	}
});
var FacebookIcon = React.createClass({
	render: function() {
		return (
			<div style={_.extend({float: 'left', background: '#3a589b', color: 'white', borderRadius: '50%', position: 'relative', width: 40, height: 40}, this.props.style)}>
				<Icon name="facebook" style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}/>
			</div>
		);
	}
});
var TwitterIcon = React.createClass({
	render: function() {
		return (
			<div style={_.extend({float: 'left', marginLeft: 15, background: '#55acee', color: 'white', borderRadius: '50%', position: 'relative', width: 40, height: 40}, this.props.style)}>
				<Icon name="twitter" style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}/>
			</div>
		);
	}
});
var UserIcon = React.createClass({
	getDefaultProps: function() {
		return {size: 40, color: '#BBBDBF'};
	},
	render: function() {
		return (
			<div>
				<div style={_.extend({position: 'relative', float: 'left', background: 'rgb(216,216,216)', fontSize: 20, 	width: this.props.size, height: this.props.size, borderRadius: '50%', color: this.props.color}, this.props.style)}>
					<Icon name="user" style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}/>
				</div>
				<div style={{clear: 'both'}}/>
			</div>
		);
	}
});
var moment = require('moment');
var PageX = React.createClass({
	getDefaultProps: function() {
		return {actionLabel: 'OK', onComplete: ()=>{}}
	},
	render: function() {
		var detail = this.props.detail;
		var {title, description, src, startingPrice, star, nearby, reviews, facilities, options, startTime, endTime} = detail;
		return (
			<div style={{textAlign: 'center'}}>
				<div style={{position: 'absolute', minHeight: 568, left: -8, right: -8, top: -8, bottom: -8, background: `url(${src})`, backgroundSize: 'cover', WebkitFilter: 'blur(8px)'}}/>
				<Touchable handleAction={this.props.onBack}>
					<Icon name="angle-left" style={{zIndex: 55, color: 'white', fontSize: 32, padding: 10, position: 'absolute', left: 0, top: 0}}/>
				</Touchable>
				<div style={{position: 'relative'}}>					
					<div style={{margin: '60px 30px 20px', border: '1px solid black', padding: 15, background: 'white'}}>
						{this.props.children}
					</div>
					<Touchable component={React.createFactory("div")} handleAction={this.props.onComplete} style={{margin: 'auto', width: 100, fontWeight: 800, padding: 5, border: '1px solid rgba(255,255,255,0.8)', color: 'rgba(255,255,255,0.8)'}}>
						<div>{this.props.actionLabel}</div>
					</Touchable>
				</div>
				<p style={{position: 'absolute', top: 0, left: 0, right: 0, margin: '20px auto', color: 'white'}}>Thank you for choosing us.</p>
			</div>
		);
	}
});
var Page5Review = React.createClass({	
	renderIcons: function(icon) {
		return (
			<div style={{margin: '0 40px'}}>
				{_.range(5).map((index)=>{
					return <Icon name={icon} style={{width: '20%'}}/>
				})}
			</div>
		);
	},
	render: function() {
		var detail = this.props.detail;
		var {title, description, src, startingPrice, star, nearby, reviews, facilities, options, startTime, endTime} = detail;
		return (
			<PageX {...this.props} key="review" actionLabel="Back to Home" onComplete={this.props.onComplete.bind(this, this.props.detail)}>
				<h2>Congratuation!</h2>
				<p style={{marginBottom: 10}}>You got the Adventure Badge.</p>
				<img src={badgeURL} width="100"/>
				{/*<div style={{margin: '15px auto', width: 32}}>
									<UserIcon style={{padding: 10}}/>
									<div style={{clear: 'both'}}/>
								</div>*/}
				{/*<h3>Tell us more about Papa Cafe</h3>
								<div style={{marginTop: 15}}>
									<p style={{marginBottom: 5}}>How productive did you feel?</p>
									{this.renderIcons('check-circle')}
								</div>
								<div style={{marginTop: 15}}>
									<p style={{marginBottom: 5}}>How good was the service?</p>
									{this.renderIcons('star')}
								</div>*/}
				<div style={{marginTop: 15}}>
					<p style={{marginBottom: 5}}>How was your overall satisfaction?</p>
					{this.renderIcons('heart')}
				</div>
				<Touchable component={React.createFactory("div")} style={{width: 100, fontWeight: 800, margin: '20px auto', padding: 5, border: '1px solid rgba(0,0,0,0.7)', color: 'rgba(0,0,0,0.7)'}}>
					<div>Write Review</div> 
				</Touchable>
				<div style={{marginTop: 15}}>
					<p style={{marginBottom: 5}}>Share the wonderful experience</p>
					<div style={{width: 95, margin: 'auto'}}>
						<FacebookIcon/>
						<TwitterIcon/>
						<div style={{clear: 'both'}}/>
					</div>
				</div>
				<div style={{marginTop: 15}}>
					<img width="100" src="/images/co-study-logo.png" style={{margin: 'auto'}}/>
				</div>
			</PageX>
		);
	},
})

var Page3Bill = React.createClass({
	render: function() {
		var detail = this.props.detail;
		var {title, description, src, startingPrice, star, nearby, reviews, facilities, options, startTime, endTime} = detail;
		var price = 229.5;
		return (
			<PageX {...this.props} onComplete={this.props.onComplete.bind(this, this.props.detail)}>
				<h2>{title}</h2>
				<div style={{margin: '15px auto', width: 32}}>
					<UserIcon style={{padding: 10}}/>
				</div>
				<p style={{lineHeight: '16px', marginBottom: 20}}>SS 9091, fl.4, Siam Square One, Rama 1 Road, Pathumwan, Pathumwan, Bangkok, 21330</p>
				<div style={{borderBottom: '1px solid #444', margin: 20}}/>
				<div>
					<div style={{float: 'left'}}>
						<Icon name="clock-o"/> {startTime} - {endTime}
					</div>
					<div style={{float: 'right'}}>
						{price.toFixed(2)} Baht
					</div>
					<div style={{clear: 'both'}}/>
				</div>
				<div>
					<div style={{float: 'left'}}>
						<Icon name="calendar"/> {moment().format('MMM DD, YYYY')}
					</div>
					<div style={{float: 'right'}}>
						{detail.userAmount > 1 && (price/detail.userAmount).toFixed(2)} Baht/User
					</div>
					<div style={{clear: 'both'}}/>
				</div>
				<div style={{borderBottom: '1px solid #444', margin: 20}}/>
				<div>
					<div style={{float: 'left'}}>
						Time Spent
					</div>
					<div style={{float: 'right'}}>
						2:33
					</div>
					<div style={{clear: 'both'}}/>
				</div>
				<div>
					<div style={{float: 'left'}}>
						Rate Per Hour
					</div>
					<div style={{float: 'right'}}>
						30
					</div>
					<div style={{clear: 'both'}}/>
				</div>
				<div>
					<div style={{float: 'left'}}>
						Number of People
					</div>
					<div style={{float: 'right'}}>
						{detail.userAmount}
					</div>
					<div style={{clear: 'both'}}/>
				</div>
				<div>
					<div style={{float: 'left'}}>
						<h3>Total</h3>
					</div>
					<div style={{float: 'right'}}>
						<h3>{price.toFixed(2)}</h3>
					</div>
					<div style={{clear: 'both'}}/>
				</div>
				<div>
					<h4 style={{textAlign: 'center', margin: '20px 0 10px'}}>Brought you by</h4>
					<img width="100" src="/images/co-study-logo.png" style={{margin: 'auto'}}/>
				</div>
			</PageX>
		);
	}
});
var mapURL2 = '/images/map-1.jpg';
var Page4Navigation = React.createClass({
	getInitialState: function() {
		return {
			userState: false,
			shopState: false
		};
	},
	componentDidMount: function() {
		setTimeout(()=>{
			TweenMax.fromTo(this.refs['bg-to-hide'].getDOMNode(), 0.5, {
				opacity: 1
			}, {
				opacity: 0
			});
		}, 500);
	},
	renderUser: function(name, align, active, handleClick) {
		var color = active?'#000':'#bbb';
		return (
			<Touchable key={name + (active? '-active': '')} style={{float: align, textAlign: 'center', margin: 20, color: color}} handleAction={handleClick}>
				<UserIcon color={color}/>
				You
			</Touchable>
		);
	},
	componentDidMount: function() {
		setTimeout(()=>{
			this.setState({shopState: true});
		}, 3000);
	},
	render: function() {
		var detail = this.props.detail;
		var {title, description, src, startingPrice, star, nearby, reviews, facilities, options, startTime, endTime} = detail;
		var states = [{
			// bt: 'Check in',
			des: 'See you at ' + startTime
		}, {
			// bt: 'Waiting',
			des: 'Enjoy your Co-Studying'
		}];
		var n = 0;
		if (this.state.shopState) {
			n = 1;
		}	
		return (
			<div style={{textAlign:'center'}}>
				<div style={{position: 'relative', width: '100%', lineHeight: '50px', height: 50, overflow: 'hidden'}}>
					<div style={{position: 'absolute', left: -8, right: -8, top: -8, bottom: -8, background: `url(${src})`, backgroundSize: 'cover', WebkitFilter: 'blur(8px)'}}/>
					<div ref="bg-to-hide" style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, background: `url(${src})`, backgroundSize: 'cover'}}/>
					<div style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, background: 'rgba(0,0,0,0.2)'}}/>
					<div style={{position: 'relative', color: 'rgba(255,255,255,0.9)', textAlign: 'center'}}>
						<h3>You are going to...</h3>
						<p>{startTime} - {endTime}</p>
					</div>
					<Touchable handleAction={this.props.onBack}>
						<Icon name="angle-left" style={{color: 'white', fontSize: 32, padding: 10, position: 'absolute', left: 0, top: 0}}/>
					</Touchable>
				</div>
				<div>
					<div style={{width: 200, margin: '20px auto'}}>
						<h2 style={{margin: 10}}>{title}</h2>
						<p style={{letterSpacing: 1}}><Icon name="map-marker"/> {nearby}m</p>
						<p style={{marginTop: 0}}><Icon name="clock-o"/> {startTime} - {endTime}</p>						
						<div style={{clear: 'both'}}/>
					</div>
					<div style={{width: window.innerWidth, height: 200, background: `url(${mapURL2})`, backgroundSize: 'cover', backgroundPosition: 'center center'}}/>					
					<p style={{fontSize: 28, fontWeight: 100, marginTop: 5}}>{states[n].des}</p>
				</div>
				<div style={{width: 40 + 40 + 15 + 20, margin: '15px auto 0'}}>
					<div style={{marginBottom: 10}}>Let your friends know</div>					
					<div style={{margin: '0 10px'}}>
						<FacebookIcon/>
						<TwitterIcon/>
						<div style={{clear: 'both'}}/>
					</div>
				</div>
				<Touchable handleAction={()=>{
					switch (n) {
						case 0: 
							this.props.onBack();
							break;
						case 1:
							this.goNextStep();
							break;
					}
				}} style={{opacity: n===0?1:0, border: '1px solid rgba(0,0,0,0.8)', background: 'transparent', display: 'block', width: 60 + 30*2, padding: '5px 30px', margin: '20px auto'}}>Cancel</Touchable>
				{this.state.showLoading && <Loading/>}
			</div>
		);
	},
	goNextStep: function() {
		this.setState({
			showLoading: true
		}, ()=>{
			setTimeout(()=>{
				this.setState({
					showLoading: false
				});
				if (this.props.onComplete) {
					this.props.onComplete(_.extend({}, this.props.detail));
				}
			}, 100);
		});
	}
});

var Page2Detail = React.createClass({
	getInitialState: function() {
		return {
			userAmount: this.props.detail.userAmount || 1,
			selectedPackage: 0,
			showTimeDialog: false,
			selectedTimes: []
		};
	},
	componentDidMount: function() {
		console.log('run animation');
		setTimeout(()=>{
			TweenMax.fromTo(this.refs['bg-to-show'].getDOMNode(), 0.5, {
				opacity: 0
			}, {
				opacity: 1
			});
		}, 500);
		window.addEventListener('scroll', this.handleScroll);
	},
	componentWillUnmount: function() {
		window.removeEventListener('scroll', this.handleScroll);
	},
	handleScroll: function() {
		var y = (window.scrollY)/200;
		TweenMax.set(this.refs['bg-to-overide'].getDOMNode(), {
			opacity: y
		});
		TweenMax.set(this.refs['bg-to-show'].getDOMNode(), {
			opacity: 1 - y
		});
	},
	renderSlot: function(t, a) {
		var av = a >= this.state.userAmount;
		var selectedTimes = this.state.selectedTimes;
		var index = selectedTimes.indexOf(t);
		return (
			<Touchable component={React.createFactory("div")} handleAction={()=>{
				if (!av) {
					return;
				}
				var selectedTimes = this.state.selectedTimes.slice();
				var index = selectedTimes.indexOf(t);
				if (index >= 0) {
					selectedTimes.splice(index, i);
				} else {
					selectedTimes.push(t);
				}
				selectedTimes.sort((a, b)=>{
					return a - b;
				});
				this.setState({
					selectedTimes: selectedTimes
				});
			}} style={{height: 40, marginBottom: 5}}>
				<div style={{
					float: 'left',
					width: 30,
					lineHeight: '40px'
				}}>
					{t}:00
				</div>
				<div style={{
					marginLeft: 40,
					borderBottom: '1px solid #ccc',
					padding: '5px 0',
					height: 40
				}}>
					<div style={{background: !av && '#ddd', lineHeight: '30px', position: 'relative'}}>
						{a} seats left 
						{(!av || index >= 0) && <span style={{position: 'absolute', right: 5, fontWeight: 100}}>{!av && 'Unavailable'}{ index>=0 && <Icon name="check" style={{color: 'green'}}/>}</span>}
					</div>
				</div>
			</Touchable>
		);
	},
	renderTimeChooser: function() {
		var start = 17;
		var end = 20;
		var timeSheet = {
			15: 1,
			16: 0,
			17: 8,
			18: 4,
			19: 5,
			20: 0,
			21: 9
		};
		return (
			<div>
				{_.range(15, 22).map((n)=>{
					return this.renderSlot(n, timeSheet[n]);
				})}
			</div>
		);
	},
	render: function() {
		var detail = this.props.detail;
		var {title, description, src, startingPrice, star, nearby, reviews, facilities, options, startTime, endTime} = detail;
  	var stars = _.range(star).map(()=><Icon name="heart" style={{margin: '0 2px', color: '#e7244e'}}/>);
  	for (var i = 0; i < (5 - stars.length + 1); i++) {
  		stars.push(<i style={{margin: '0 2px'}} className="fa fa-heart-o"/>);
  	}
  	var npWidth = (window.innerWidth - 40)/detail.maxUser;
  	var sectionStyle={marginBottom: 10};

		return (
			<div>
				<div style={{position: 'fixed', top: 0, left: 0, width: '100%', height: 200, overflow: 'hidden', zIndex: 0}}>
					<div style={{position: 'absolute', left: -8, right: -8, top: -8, bottom: -8, background: `url(${src})`, backgroundSize: 'cover', WebkitFilter: 'blur(8px)'}}/>
					<div ref="bg-to-show" style={{opacity: 0, position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, background: `url(${src})`, backgroundSize: 'cover'}}/>
					<div ref="bg-to-overide" style={{opacity: 0, position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, background: 'rgba(0,0,0,0.4)'}}/>
					<Touchable handleAction={this.props.onBack}>
						<Icon name="angle-left" style={{position: 'absolute', left: 0, top: 0, color: 'white', fontSize: 32, padding: 10}}/>
					</Touchable>
				</div>
				<div style={{height: 200}}/>
				<div style={{position: 'relative', background: 'white', zIndex: 1}}>
					<div style={{padding: '20px'}}>
						<div style={sectionStyle}>
		      		<h2 style={{marginBottom: 10, lineHeight: '20px'}}>
		      			<span>{title}</span>
		      			<span style={{float: 'right', fontSize: '12px', fontWeight: 100, letterSpacing: 1}}>{nearby}m</span>
		      		</h2>
		      		<p>
		      			<div style={{float: 'right'}}>
		      				{stars}      				
		      			</div>
		      			{description}
		      		</p>
		      	</div>
		      	<div style={sectionStyle}>
		      		<h3 style={{padding: '10px 0'}}>Facilities</h3>
		      		{facilities.map((l)=>{
		      			return (
		      				<div style={{paddingBottom: 10}}>
		      					<Icon name="check" style={{color: 'green', marginRight: 5}}/>{l}
		      				</div>
		      			);
		      		})}
		      	</div>
		      	<div style={sectionStyle}>
		      		<h3 style={{padding: '10px 0'}}>Reviews</h3>
		      		{reviews.map((l)=>{
		      			return (
		      				<div style={{paddingBottom: 10, position: 'relative'}}>
		      					<div style={{float: 'left', background: '#ddd', padding: 15, marginLeft: 0 , borderRadius: '50%'}}>
		      						<Icon name="user" style={{textAlign: 'center'}}/>
		      					</div>
		      					<p style={{marginLeft: 65, lineHeight: '16px'}}>{l.text}</p>
		      					<p style={{textAlign: 'right', fontSize: '12px'}}>{l.user}</p>
		      				</div>
		      			);
		      		})}
		      	</div>
		      	<div style={sectionStyle}>
		      		<h3 style={{padding: '10px 0'}}>Number of People</h3>
		      		<div style={{margin: '10px 0'}}>
			      		{_.range(detail.maxUser).map((n)=>{
			      			return (
			      				<Touchable handleAction={()=>this.setState({userAmount: n + 1})} style={{position: 'relative', textAlign: 'center', float: 'left', width: `${npWidth}px`}}>
			      					<div style={{border: '1px solid', borderColor: this.state.userAmount === (n+1)?'black': 'transparent', borderRadius: '50%', margin: 'auto', display: 'inline-block', padding: 15}}/>
			      					<div style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, lineHeight: '30px'}}>{n + 1}</div>
			      				</Touchable>
			      			);
			      		})}
			      		<div style={{clear: 'both'}}/>
			      	</div>
			      </div>
			      <div style={sectionStyle}>
		      		<h3 style={{padding: '10px 0'}}>Period <span style={{fontSize: 14, fontWeight: 100}}>We close at midnight</span></h3>
		      		<Touchable handleAction={()=>this.setState({showTimeDialog: true})} style={{margin: '10px auto', width: 200, fontWeight: '800', display: 'block', padding: 10, border: '1px solid #222'}}>
		      			{this.state.selectedTimes.length? [
			      			<div style={{float: 'left'}}>Start <span style={{fontSize: '1.5em', fontWeight: 'bold'}}>{this.state.selectedTimes[0]}:00</span></div>,
			      			<div style={{float: 'right'}}>End <span style={{fontSize: '1.5em', fontWeight: 'bold'}}>{this.state.selectedTimes[this.state.selectedTimes.length - 1]}:00</span></div>,
			      			<div style={{clear: 'both'}}/>
		      			]: (
		      				<div style={{textAlign: 'center'}}>Select Time</div>
		      			)}
		      		</Touchable>
		      	</div>
		      	<div style={sectionStyle}>
		      		<h3 style={{padding: '10px 0 20px'}}>Room Options</h3>
		      		{options.map((d, index)=>(
		      			<Touchable style={{}} handleAction={()=>this.setState({selectedPackage: index})}>
			      			<div style={{lineHeight: '20px'}}>
			      				<i className={this.state.selectedPackage === index? "fa fa-dot-circle-o": "fa fa-circle-o"} style={{float: 'left', lineHeight: '20px'}}/>
			      				<h3 style={{marginLeft: 10, float: 'left'}}>{d.title}</h3>
			      				<div style={{float: 'right'}}>
			      					<span style={{fontSize: 24, fontWeight: 600}}>{d.price}</span> Baht
			      				</div>
			      				<div style={{clear: 'both'}}/>
			      			</div>
			      			<div style={{lineHeight: '20px', marginLeft: 25, marginBottom: 15}}>
			      				{d.description}
			      				<div style={{float: 'right', fontWeight: 100, fontSize: 14}}>
			      					<span style={{}}>{d.priceT}</span>
			      				</div>
			      			</div>
			      			<div style={{clear: 'both'}}/>
			      		</Touchable>
		      		))}
		      	</div>
		      </div>
	      	<div style={{height: 40}}/>      	
				</div>
      	<Touchable style={{
      		position: 'fixed',
      		left: 0,
      		right: 0,
      		bottom: 0,
      		height: 40,
      		lineHeight: '40px',
      		textAlign: 'center',
      		background: this.state.selectedTimes.length? 'green': '#ccc',
      		color: 'white',
      		fontSize: 20,
      		zIndex: 10
      	}} handleAction={this.handleClickBook}>
      		Book the {options[this.state.selectedPackage].unit}
      	</Touchable>
      	{this.state.showTimeDialog && (
      		<div style={{
      			position: 'fixed',
	      		left: 0,
	      		right: 0,
	      		bottom: 0,
	      		top: 0,
	      		background: 'rgba(0,0,0,0.6)',
	      		zIndex: 10
      		}}>
      			<div style={{
      				margin: 10/*'50px 20px 20px'*/,
      				marginTop: window.innerHeight > 480 && (window.innerHeight - 480)/2 + 10,
      				background: 'white',
      				padding: '5px 0 0',
      				border: '1px solid rgba(0,0,0,0.7)',
      				textAlign: 'center'
      			}}>
      				<h2>Today</h2>
      				<div style={{
      					margin: '5px 0',
      					borderBottom: '1px solid rgba(0,0,0,0.8)'
      				}}/>
      				<div style={{padding: '0 20px'}}>
      					{this.renderTimeChooser()}
      				</div>
      				<p style={{fontWeight: 100, marginTop: 20, marginBottom: 5}}>You have {this.state.userAmount} people</p>
      			</div>
      			<Touchable component={React.createFactory("div")} handleAction={()=>this.setState({showTimeDialog: false})} style={{margin: 'auto', width: 100, textAlign: 'center', fontWeight: 800, padding: 5, border: '1px solid rgba(255,255,255,0.8)', color: 'rgba(255,255,255,0.8)'}}>
							<div>OK</div>
						</Touchable>
      		</div>
      	)}
      	{this.state.showLoading && <Loading/>}
			</div>
		);
	},
	handleClickBook: function() {
		if (!this.state.selectedTimes.length) {
			return;
		}
		this.setState({
			showLoading: true
		}, ()=>{
			setTimeout(()=>{
				this.setState({
					showLoading: false
				});
				if (this.props.onComplete) {
					this.props.onComplete(_.extend({}, this.props.detail, {
						userAmount: this.state.userAmount,
						selectedPackage: this.state.selectedPackage,
						startTime: this.state.selectedTimes[0] + ':00',
						endTime: this.state.selectedTimes[this.state.selectedTimes.length - 1] + ':00'
					}));
				}
			}, 200);
		});
	}
});

var Card = React.createClass({
  render: function() {
  	var {title, description, src, startingPrice, star, nearby, maxUser} = this.props;
  	var stars = _.range(star).map(()=><Icon name="heart" style={{margin: '0 2px', color: '#e7244e'}}/>);
  	while (stars.length < 5) {
  		stars.push(<i style={{margin: '0 2px'}} className="fa fa-heart-o"/>);
  	}
  	// console.log('stars', stars.length);
    return (
      <Touchable handleAction={this.props.handleAction} preventDefault={false}>
      	<div style={{position: 'relative', width: '100%', height: 200, background: `url(${src})`, backgroundSize: 'cover'}}>
      		<div style={{fontSize: 24, textAlign: 'center',background: '#222', position: 'absolute', right: 4, bottom: 4, padding: 5, color: 'white'}}>
      			<div style={{fontSize: 12}}>Starting Price </div>
      			{startingPrice}฿
      		</div>
      	</div>
      	<div style={{padding: '15px 10px 20px'}}>
      		<h3 style={{marginBottom: 5, lineHeight: '20px'}}>
      			<span>{title}</span>
      			<span style={{float: 'right', fontSize: '12px', fontWeight: 100, letterSpacing: 1}}>{nearby}m</span>
      		</h3>
      		<p>
      			<div style={{float: 'right'}}>
      				{stars}      				
      			</div>
      			Public & Private room (max. {maxUser})
      		</p>
      	</div>
      </Touchable>
    );
  }
});
var mapURL = '/images/map-2.jpg';
var loadImage = function(src) {
	var img = new Image(src);
	img.src = src;
	img.onload = ()=>console.log('load complete', src);
	img.onerror = ()=>console.log('load error', src);
}
var Page1Discovery = React.createClass({
	getInitialState: function() {
		return {
			userAmount: 1
		};
	},
	renderMap: function() {
		return (
			<div style={{position: 'fixed', left: 0, right: 0, top: 0, bottom: 0, display: 'none'}} ref="map">
				<div style={{lineHeight: '40px', height: 40, textAlign: 'center', background: 'white'}}>
					<h3>Nearby</h3>
					<Touchable handleAction={this.handleCloseMap}>
						<ExitButton style={{position: 'absolute', right: 0, top: 0, padding: 6}}/>
					</Touchable>
				</div>
				<div style={{position: 'absolute', left: 0, right: 0, top: 40, bottom: 0, background: `url(${mapURL})`, backgroundSize: 'cover'}}/>				
			</div>
		);
	},
	handleCloseMap: function() {
		TweenMax.fromTo(this.refs.map.getDOMNode(), 0.3, {
			display: 'block',
			opacity: 1,
			y: '0%'
		}, {
			// opacity: 0.4,
			y: '100%',
			display: 'none'
		});
	},
	handleOpenMap: function() {
		TweenMax.fromTo(this.refs.map.getDOMNode(), 0.3, {
			display: 'block',
			// opacity: 0.4,
			y: '100%'
		}, {
			opacity: 1,
			y: '0%'
		});
	},
	render: function() {
		// console.log('list', list.map((d)=>d.maxUser));
		var src = list[0].src;
		return (
			<div>
				<div style={{position: 'relative', overflow: 'hidden', background: '#eee'}}>
					{/*<div style={{position: 'absolute', minHeight: 568, left: -12, right: -12, top: -12, bottom: -12, background: `url(${src})`, backgroundSize: 'cover', WebkitFilter: 'blur(12px)'}}/>*/}
					<div style={{margin: '10px 50px', position: 'relative'}}>					
						<h3 style={{textAlign: 'center'}}>How many people?</h3>
	      		{_.range(5).map((n)=>{
	      			return (
	      				<Touchable handleAction={()=>this.setState({userAmount: n + 1})} style={{position: 'relative', textAlign: 'center', float: 'left', width: '20%', height: 30}}>
	      					<div style={{border: '1px solid', borderColor: this.state.userAmount === (n+1)?'black': 'transparent', borderRadius: '50%', margin: 'auto', display: 'inline-block', padding: 15}}/>
	      					<div style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, lineHeight: '30px'}}>{n + 1}</div>
	      				</Touchable>
	      			);
	      		})}
	      		<div style={{clear: 'both'}}/>
	      	</div>
	      </div>
				{list.filter((d)=>d.maxUser >= this.state.userAmount).map((d)=><Card key={d.key} {...d} handleAction={this.props.onComplete.bind(null, _.extend({userAmount: this.state.userAmount},d))}/>)}
				<div style={{position: 'absolute', left: 10, top: 10, borderRadius: '50%', width: 35, height: 35, color: 'black', background: '#ddd'}}>
					<Icon name="filter" style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}/>
				</div>
				<Touchable handleAction={this.handleOpenMap} style={{position: 'absolute', right: 10, top: 10, borderRadius: '50%', width: 35, height: 35, color: 'black', background: '#ddd'}}>
					<Icon name="map-marker" style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}/>
				</Touchable>
				{this.renderMap()}
			</div>
		);
	}
});
var PageList = [
	Page1Discovery,
	Page2Detail,
	Page3Bill,
	Page4Navigation,
	Page5Review
];
var App = React.createClass({
	getInitialState: function() {
		return {currentPage: 0};
	},
	componentDidMount: function() {
		loadImage(mapURL);
		loadImage(mapURL2);
		loadImage(badgeURL);
	},
	componentWillUpdate: function(nextProps, nextStates) {
		// console.log(nextStates.currentPage, this.state.currentPage, nextStates.currentPage !== this.state.currentPage);
		if (nextStates.currentPage !== this.state.currentPage) {
			window.scrollTo(0, 0);
		}
	},
	goNextStep: function(props) {
		this.setState({
			currentPage: (this.state.currentPage + 1)%PageList.length,
			selectedProps: props
		});
	},
	render: function() {
		var Page = PageList[this.state.currentPage];
		var props = {
			detail: this.state.selectedProps,
			onBack: ()=>this.setState({currentPage: this.state.currentPage - 1}),
			onComplete: this.goNextStep
		};
		// switch (this.state.currentPage) {
		// 	case 0: 				
		// 		props = {
		// 			onClick: this.goNextStep
		// 		};
		// 		break;
		// 	case 1:				
				
		// 		break;
		// 	case 2:				
		// 		props = {
		// 			detail: this.state.selectedProps, onBack: ()=>this.setState({currentPage: 0}),
		// 			onComplete: this.goNextStep
		// 		};
		// 		break;
		// 	case 3:
		// }
		// console.log('props', props);
		var key = this.state.currentPage;

		var transitionName;
    var currentPageIndex = this.state.currentPage;
    // var isNextPage = true;
    if (currentPageIndex > this._prevIndex) {
      transitionName = 'moveFromRightScaleDown';
      // transitionName = 'moveFromLeftScaleDown';
    } else {
      transitionName = 'moveFromLeftScaleDown';
      // isNextPage = false;
    }
    // console.log('transitionName', transitionName, currentPageIndex, currentPageIndex > this._prevIndex);
    this._prevIndex = currentPageIndex;    
		return (
			<TimeoutTransitionGroup style={{
				position: 'absolute',
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
				fontFamily: 'ThaiSansNeue',
				background: 'black'
			}} transitionName={transitionName} enterTimeout={TRANSITION_DURATION} leaveTimeout={TRANSITION_DURATION}>
				<div key={key + '-container'} ref="pcontainer" style={{
					position:'absolute',
					left: 0,
					top: 0,
					right: 0,
					bottom: 0,
					zIndex: currentPageIndex,
					background: 'white'}}>
					<Page {...props} key={key}/>
				</div>
			</TimeoutTransitionGroup>
		);	
	}
});
if (!isTouchDevice) {
	module.exports = React.createClass({
		componentDidMount: function() {
	    this._renderFrameContents();
	    window.TouchEmulator()
	    function log(ev) {
			 console.log(ev);
			}

			document.body.addEventListener('touchstart', log, false);
			document.body.addEventListener('touchmove', log, false);
			document.body.addEventListener('touchend', log, false);
			document.body.style.background = 'black';
	  },
	  _renderFrameContents: function() {
	  	var doc = this.refs.iframe.getDOMNode().contentDocument;
	  	if (doc.readyState === 'complete') {
	  		var customHeader = [
	  			"/styles/@reset.css",
					"/styles/codrop-input-set1.css",
					"/styles/icon-moon.css",
					"/styles/importer.css",
					"/fonts/font-awesome/font-awesome.min.css",
					"/fonts/thaisans_neue/stylesheet.css",
					"/fonts/lato/Lato.css"
	  		].reduce((sum, src)=> {
          return `${sum}<link rel='stylesheet' href='${src}'/>`;
        }, '');
        $('head', doc).append(customHeader||"");
	  		React.render(<App/>, doc.body);
	  	} else {
	      setTimeout(this._renderFrameContents, 0);
	    }
	  },
		render: function() {
			return (
				<div style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, background: 'rgba(0,0,0,0.5)'}}>
					<iframe ref="iframe" style={{width: 320, height: 568}}>
						<App/>
					</iframe>
				</div>
			);
		}
	});	
} else {
	module.exports = App;
}
