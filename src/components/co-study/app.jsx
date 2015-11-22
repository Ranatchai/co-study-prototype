var React = require('react');
var _ = require('lodash');
window._ = _;
document.title = 'Co-Study';
var Touchable = require('../touchable');
var isTouchDevice = require('../../common/touch-util').isTouchDevice;
var insertRule = require('react-kit/insertRule');

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

insertRule('a:hover{text-decoration:none; color:inherit; }');
var sample1 = {
  title: 'Papa Coffee Shop',
  description: 'Private room (max 6)',
  startingPrice: 120,
  star: 3,
  nearby: 300,
  facilities: [
  	'Air Conditioner',
  	'Whiteboard',
  	'Wifi Internet'
 	],
 	reviews: [
 		{
 			text: 'ตรงกันข้ามกับความเชื่อที่นิยมกัน Lorem Ipsum ไม่ได้เป็นเพียงแค่ชุดตัวอักษรที่สุ่มขึ้นมามั่วๆ แต่หากมีที่มาจากวรรณกรรมละตินคลาสสิกชิ้นหนึ่งในยุค 45 ปีก่อนคริสตศักราช ทำให้มันมีอายุถึงกว่า 2000 ปีเลยทีเดียว',
 			user: 'John Universityguy'
 		}
 	],
 	options: [
 		{
 			title: 'Basic Package',
 			description: '4 Hours. Water provided.',
 			price: 600,
 			unit: 'Seat'
 		},
 		{
 			title: 'Premium Package',
 			description: '4 Hours. Water provided.',
 			price: 1000,
 			unit: 'Room'
 		}
 	],
 	maxUser: 5,
 	startTime: '16:00',
 	endTime: '19:00'
};
var srcs = [
	'http://assets.inhabitat.com/wp-content/blogs.dir/1/files/2010/08/thatchers3.jpg',
	'http://blog.sqwiggle.com/content/images/2014/01/11-Unwritten-Rules-of-Coffee-Shop-Roberto_Ventre-e1391150672343.jpg',
	'http://cdni.condenast.co.uk/639x426/k_n/London-Coffee-11-Easy-Living-22apr13_pr_b.jpg',
	'https://travelmindset.s3.amazonaws.com/uploads/image/asset/680/full_Ukd_bwpWTv2e3UyqxMFPvFYwG4XH5VF6h0xEKliLRfE_VL_WZBhccDLMEspD9bw9A_PzfaUdHonk3n89CPW48gk.jpg'
];
var LoadingCenter = require('./loading-center');

var list = srcs.map((src)=>_.extend({}, sample1, {src: src, star: Math.round(3 + Math.random() * 2)}));
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
			<div style={_.extend({float: 'left', background: 'blue', color: 'white', borderRadius: '50%', position: 'relative', width: 40, height: 40}, this.props.style)}>
				<Icon name="facebook" style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}/>
			</div>
		);
	}
});
var TwitterIcon = React.createClass({
	render: function() {
		return (
			<div style={_.extend({float: 'left', marginLeft: 15, background: 'green', color: 'white', borderRadius: '50%', position: 'relative', width: 40, height: 40}, this.props.style)}>
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
var Page4Review = React.createClass({
	render: function() {
		var detail = this.props.detail;
		var {title, description, src, startingPrice, star, nearby, reviews, facilities, options, startTime, endTime} = detail;
		var price = 229.5;
		return (
			<div style={{textAlign: 'center'}}>
				<div style={{position: 'absolute', minHeight: 568, left: -8, right: -8, top: -8, bottom: -8, background: `url(${src})`, backgroundSize: 'cover', WebkitFilter: 'blur(8px)'}}/>
				<Touchable handleAction={this.props.onBack}>
					<Icon name="angle-left" style={{zIndex: 55, color: 'white', fontSize: 32, padding: 10, position: 'absolute', left: 0, top: 0}}/>
				</Touchable>
				<div style={{position: 'relative'}}>
					<p style={{margin: '20px auto', color: 'white'}}>Thank you for choosing us.</p>
					<div style={{margin: 30, border: '1px solid black', padding: 15, background: 'white'}}>
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
					</div>
					<div style={{display: 'none'}}>
						<h2>Tell us more about Papa Cafe</h2>
						<p>How productive did you feel?</p>
						<p>How good was the service?</p>
						<p>How was your overall satisfaction?</p>
						<div>
							Share the wonderful experience
							<FacebookIcon/>
							<TwitterIcon/>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

var Page3BookingDone = React.createClass({
	getInitialState: function() {
		return {
			userState: false,
			shopState: false
		};
	},
	componentDidMount: function() {
		console.log('run animation');
		setTimeout(()=>{
			TweenMax.fromTo(this.refs['bg-to-hide'].getDOMNode(), 0.5, {
				opacity: 1
			}, {
				opacity: 0
			});
		}, 500);
	},
	renderUser: function(name, align, active, handleClick) {
		console.log('active', active, active?'#000':'#bbb');
		var color = active?'#000':'#bbb';
		return (
			<Touchable key={name + (active? '-active': '')} style={{float: align, textAlign: 'center', margin: 20, color: color}} handleAction={handleClick}>
				<UserIcon color={color}/>
				You
			</Touchable>
		);
	},
	render: function() {
		var detail = this.props.detail;
		var {title, description, src, startingPrice, star, nearby, reviews, facilities, options, startTime, endTime} = detail;
		var states = [{
			bt: 'Check in',
			des: 'Please check in when you arrive'
		}, {
			bt: 'Waiting',
			des: 'Let Papa Cafe knows that you have arrived'
		}, {
			bt: 'Check out',
			des: 'Let Papa Cafe knows that you have arrived'
		}];
		var n = 0;
		if (this.state.userState) {
			if (this.state.shopState) {
				n = 2;
			} else {
				n = 1;
			}			
		}		
		return (
			<div style={{textAlign:'center'}}>
				<div style={{position: 'relative', width: '100%', height: 200, overflow: 'hidden'}}>
					<div style={{position: 'absolute', left: -8, right: -8, top: -8, bottom: -8, background: `url(${src})`, backgroundSize: 'cover', WebkitFilter: 'blur(8px)'}}/>
					<div ref="bg-to-hide" style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, background: `url(${src})`, backgroundSize: 'cover'}}/>
					<div style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, background: 'rgba(0,0,0,0.2)'}}/>
					<Touchable handleAction={this.props.onBack}>
						<Icon name="angle-left" style={{color: 'white', fontSize: 32, padding: 10, position: 'absolute', left: 0, top: 0}}/>
					</Touchable>
					<div style={{position: 'relative', color: 'rgba(255,255,255,0.9)', textAlign: 'center', margin: '40px auto'}}>
						<div>You are going to...</div>
						<h3 style={{marginTop: 20}}>{title}</h3>
						<p><Icon name="map-marker"/> {nearby}m</p>
						<p style={{marginTop: 20}}>{startTime} - {endTime}</p>
					</div>
				</div>
				<div>
					<div style={{width: 200, margin: '20px auto'}}>
						{this.renderUser('You', 'left', this.state.userState, ()=>{
							console.log('onclick user', this.state.userState);
							// this.setState({userState: !this.state.userState});
						})}
						{this.renderUser(title, 'right', this.state.shopState, ()=>{
							// this.setState({shopState: !this.state.shopState});
						})}
						<div style={{clear: 'both'}}/>
					</div>
					<Touchable handleAction={()=>{
						switch (n) {
							case 0: 
								this.setState({userState: true});
								setTimeout(()=>this.setState({shopState: true}), 3000);
								break;
							case 2:
								this.goNextStep();
								break;
						}
					}} style={{border: n === 1?'none':'1px solid rgba(0,0,0,0.8)', background: 'transparent', display: 'block', width: 60 + 30*2, padding: '10px 30px', margin: 'auto'}}>{states[n].bt}</Touchable>
					<p style={{marginTop: 5}}>{states[n].des}</p>
				</div>
				<div style={{width: 40 + 40 + 15, margin: '40px auto 0'}}>
					<div style={{marginBottom: 10}}>Let your friends know</div>					
					<FacebookIcon/>
					<TwitterIcon/>
				</div>
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
			userAmount: 1,
			selectedPackage: 0
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
	render: function() {
		var detail = this.props.detail;
		var {title, description, src, startingPrice, star, nearby, reviews, facilities, options, startTime, endTime} = detail;
  	var stars = _.range(star).map(()=><Icon name="heart" style={{margin: '0 2px', color: 'red'}}/>);
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
		      			<span style={{float: 'right', fontSize: '12px', fontWeight: 100}}>{nearby}m</span>
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
		      					<p style={{marginLeft: 65}}>{l.text}</p>
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
		      		<div style={{margin: '10px auto', width: 150, fontWeight: '100'}}>
		      			<div style={{float: 'left'}}>Start <span style={{fontSize: '1.5em', fontWeight: 'bold'}}>{startTime}</span></div>
		      			<div style={{float: 'right'}}>End <span style={{fontSize: '1.5em', fontWeight: 'bold'}}>{endTime}</span></div>
		      			<div style={{clear: 'both'}}/>
		      		</div>
		      	</div>
		      	<div style={sectionStyle}>
		      		<h3 style={{padding: '10px 0 20px'}}>Room Options</h3>
		      		{options.map((d, index)=>(
		      			<Touchable style={{marginBottom: 10}} handleAction={()=>this.setState({selectedPackage: index})}>
			      			<div style={{lineHeight: '20px'}}>
			      				<i className={this.state.selectedPackage === index? "fa fa-dot-circle-o": "fa fa-circle-o"} style={{float: 'left', lineHeight: '20px'}}/>
			      				<h3 style={{marginLeft: 10, float: 'left'}}>{d.title}</h3>
			      				<div style={{float: 'right'}}>
			      					<span style={{fontSize: 24, fontWeight: 600}}>{d.price}</span> Baht
			      				</div>
			      				<div style={{clear: 'both'}}/>
			      			</div>
			      			<div style={{lineHeight: '20px', marginLeft: 25}}>
			      				{d.description}
			      				<div style={{float: 'right'}}>
			      					<span style={{}}>{Math.round(d.price/this.state.userAmount)}</span> Baht / Person
			      				</div>
			      			</div>
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
      		background: 'green',
      		color: 'white',
      		fontSize: 20,
      		zIndex: 10
      	}} handleAction={this.handleClickBook}>
      		Book the {options[this.state.selectedPackage].unit}
      	</Touchable>
      	{this.state.showLoading && <Loading/>}
			</div>
		);
	},
	handleClickBook: function() {
		this.setState({
			showLoading: true
		}, ()=>{
			setTimeout(()=>{
				this.setState({
					showLoading: false
				});
				if (this.props.onComplete) {
					this.props.onComplete(_.extend({
						userAmount: this.state.userAmount,
						selectedPackage: this.state.selectedPackage
					}, this.props.detail));
				}
			}, 200);
		});
	}
});

var Card = React.createClass({
  render: function() {
  	var {title, description, src, startingPrice, star, nearby} = this.props;
  	var stars = _.range(star).map(()=><Icon name="heart" style={{margin: '0 2px', color: 'red'}}/>);
  	while (stars.length < 5) {
  		stars.push(<i style={{margin: '0 2px'}} className="fa fa-heart-o"/>);
  	}
  	console.log('stars', stars.length);
    return (
      <Touchable handleAction={this.props.handleAction} preventDefault={false}>
      	<div style={{position: 'relative', width: '100%', height: 200, background: `url(${src})`, backgroundSize: 'cover'}}>
      		<div style={{textAlign: 'center',background: '#222', position: 'absolute', right: 4, bottom: 4, padding: 5, color: 'white'}}>
      			<div style={{fontSize: '0.8em'}}>Starting Price </div>
      			{startingPrice} Baht
      		</div>
      	</div>
      	<div style={{padding: '15px 10px 20px'}}>
      		<h3 style={{marginBottom: 5, lineHeight: '20px'}}>
      			<span>{title}</span>
      			<span style={{float: 'right', fontSize: '12px', fontWeight: 100}}>{nearby}m</span>
      		</h3>
      		<p>
      			<div style={{float: 'right'}}>
      				{stars}      				
      			</div>
      			{description}
      		</p>
      	</div>
      </Touchable>
    );
  }
});
var mapURL = 'http://www.freelargeimages.com/wp-content/uploads/2014/11/Google_map-6.png';
var loadImage = function(src) {
	var img = new Image(src);
	img.src = src;
	img.onload = ()=>console.log('load complete', src);
	img.onerror = ()=>console.log('load error', src);
}
var Page1Discovery = React.createClass({
	componentDidMount: function() {
		loadImage(mapURL);
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
		return (
			<div>
				{list.map((d)=><Card {...d} handleAction={this.props.onComplete.bind(null, d)}/>)}
				<div style={{position: 'absolute', left: 10, top: 10, borderRadius: '50%', width: 35, height: 35, color: 'black', background: 'white'}}>
					<Icon name="search" style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}/>
				</div>
				<Touchable handleAction={this.handleOpenMap} style={{position: 'absolute', right: 10, top: 10, borderRadius: '50%', width: 35, height: 35, color: 'black', background: 'white'}}>
					<Icon name="map-marker" style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}/>
				</Touchable>
				{this.renderMap()}
			</div>
		);
	}
});

var App = React.createClass({
	getInitialState: function() {
		return {currentPage: 0};
	},
	componentWillUpdate: function(nextProps, nextStates) {
		console.log(nextStates.currentPage, this.state.currentPage, nextStates.currentPage !== this.state.currentPage);
		if (nextStates.currentPage !== this.state.currentPage) {
			window.scrollTo(0, 0);
		}
	},
	goNextStep: function(props) {
		this.setState({
			currentPage: this.state.currentPage + 1,
			selectedProps: props
		});
	},
	render: function() {
		var Page = [
			Page1Discovery,
			Page2Detail,
			Page3BookingDone,
			Page4Review
		][this.state.currentPage];
		var props = {
			detail: this.state.selectedProps,
			onBack: ()=>this.setState({currentPage: 0}),
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
		console.log('props', props);
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
    console.log('transitionName', transitionName, currentPageIndex, currentPageIndex > this._prevIndex);
    this._prevIndex = currentPageIndex;    
		return (
			<TimeoutTransitionGroup style={{
				position: 'absolute',
				left: 0,
				top: 0,
				width: window.innerWidth,
				height: window.innerHeight,
				fontFamily: 'ThaiSansNeue',
				background: 'black'
			}} transitionName={transitionName} enterTimeout={TRANSITION_DURATION} leaveTimeout={TRANSITION_DURATION}>
				<div key={key + '-container'} ref="pcontainer" style={{
					position:'absolute',
					left: 0,
					top: 0,
					width: window.innerWidth,
					height: window.innerHeight,
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
	  },
	  _renderFrameContents: function() {
	  	var doc = this.getDOMNode().contentDocument;
	  	if (doc.readyState === 'complete') {
	  		React.render(<App/>, doc.body);
	  	} else {
	      setTimeout(this._renderFrameContents, 0);
	    }
	  },
		render: function() {
			return (
				<iframe style={{width: 320, height: 568}}>
					<App/>
				</iframe>
			);
		}
	});	
} else {
	module.exports = App;
}
