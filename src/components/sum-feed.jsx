var React = require('react');
var classnames = require('classnames');
var TimeoutTransitionGroup = require('../common/timeout-transition-group');
var SectionA = require('./section-1');
var LatestSection = require('./latest-section');
var BackgroundUtil = require('../common/background-util');
var PolygonContainer = require('./mock-polygon-container');
var FullWidthSection1 = require('./full-width-section');
var _ = require('underscore');
var ad1 = 'http://touchedition.s3.amazonaws.com/asset/55420f2fe57b85e332bfdcab.jpg';
var ad2 = 'http://touchedition.s3.amazonaws.com/asset/5559d77d6526e2152c531adb.jpg';
var moment = require('moment');
var LOGO_SRC = 'http://touchedition.s3.amazonaws.com/asset/555edb0290a3d98a63e42aa0.png';
var insertRule = require('react-kit/insertRule');
insertRule('.p-menu-item{float: left; height: 40px}')
insertRule('.p-menu-item.right {float: right;}');
insertRule('.p-menu-item .fa + span {margin-left: 10px;}');
insertRule('.article__item-thumbnail{float:left;width: 40px;height: 40px}');
insertRule('.article__item-label {line-height: 10px; font-size: 10px; color: rgb(45,167,231); font-weight: 600;}');
insertRule('.article__item-header {line-height: 20px; font-size: 18px; font-family: ThaiSansNeue; font-weight: 600;white-space:nowrap;text-overflow:ellipsis;overflow: hidden;}');
insertRule('.article__item-text {width: 303px; overflow: hidden; height: 40px;float: left; padding: 5px 10px;}');
insertRule('.article__item {position: absolute; left: 0; right: 0; top: 0; bottom: 0, overflow: hidden;}');
insertRule('.article__item.active {background: rgb(33,33,33)}')
insertRule('.article__item.active {color: white;}')
insertRule('.p-menu-item .fa, .article__item .fa {line-height: 40px; height: 40px; color: rgba(33,33,33,0.5)} ');
insertRule('.article__item.active .fa {color: white;} ');
insertRule('.border-left {border-left: 1px solid rgba(151,151,151, 0.22);}');
insertRule('.active .border-left {border-color: rgba(240,240,240,0.3);}');
insertRule('.slide-up-enter {transform: translateY(100%); transition: 0.3s all ease-out;}');
insertRule('.slide-up-enter-active {transform: translateY(0%);}');
insertRule('.slide-up-leave {transform: translateY(0%); transition: 0.3s all ease-out;}');
insertRule('.slide-up-leave-active {transform: translateY(-100%);}');
var ReactComponentWithPureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');
var ArticleInfo = React.createClass({
	render: function() {		
		var {data, active, ...other} = this.props;
		return (
			<div className={classnames("article__item", active && 'active')} {...other}>
				<div className="article__item-thumbnail" style={BackgroundUtil.getBackgroundProps(data, 40, 40)}/>
				<div className="article__item-text">
					<div className="article__item-label">{active? 'Next': 'Reading'}</div>
					<h4 className="article__item-header">{data.title}</h4>
				</div>				
			</div>
		);
	}
});
insertRule('.p_menu_float {font-family: Open Sans; position: fixed; bottom: 50px; width: 370px; padding: 13px; background: rgb(33,33,33); border-radius: 5px;}')
insertRule('.p_menu_float-title {font-weight: 600; margin-top: 0; margin-bottom: 26px; color: white; font-size: 18px;}')
insertRule('.p_menu_float_item {position: relative; width: 100%; padding: 8px 0; border-bottom: 1px solid rgba(74,74,74,0.21)}')
insertRule('.p_menu_float_item:last-child {border: 0;')
insertRule('.p_menu_float_item-thumbnail{width: 64px; height: 64px;}')
insertRule('.p_menu_float_item-text{position: absolute; left: 75px; right: 11px; top: 8px; bottom: 8px;}');
insertRule('.p_menu_float_item-label{font-weight: 600;font-size: 11px;color: rgb(25,187,241);margin-bottom: 5px;}');
insertRule('.p_menu_float_item-header{font-family: ThaiSansNeue; font-size: 22px; color: white;}');

insertRule('.little-slide-up-enter {transform: translateY(10px); transition: 0.2s all ease-out; opacity: 0;}');
insertRule('.little-slide-up-enter-active {transform: translateY(0); opacity: 1;}');
insertRule('.little-slide-up-leave {transform: translateY(0); transition: 0.2s all ease-out; opacity: 1;}');
insertRule('.little-slide-up-leave-active {transform: translateY(10px); opacity: 0;}');
var MenuFloat = React.createClass({
	renderItem: function(data) {
		return (
			<div className="p_menu_float_item">
				<div className="p_menu_float_item-thumbnail" style={BackgroundUtil.getBackgroundProps(data, 64, 64)}/>
				<div className="p_menu_float_item-text">
					{data.categories[0] && <div className="p_menu_float_item-label">{data.categories[0]}</div>}
					<h4 className="p_menu_float_item-header">{data.title}</h4>
				</div>
				<span style={{clear: 'both'}}/>
			</div>
		);
	},
	render: function() {
		var {data, ...other} = this.props;
		return (
			<div className="p_menu_float" {...other}>
				<h3 className="p_menu_float-title">Comming up</h3>
				{data.map(this.renderItem)}
			</div>
		);
	}
});
var Menubar = React.createClass({
	mixins: [ReactComponentWithPureRenderMixin],
	getDefaultProps: function() {
		return {
			interval: 10000
		};
	},
	getInitialState: function() {
		return {
			nextIndex: 0,
			showNext: false,
			showFloatMenu: false
		};
	},
	componentDidMount: function() {
		this._interval = setInterval(()=>{
			if (this.state.showFloatMenu) {
				return;
			}
			var nextState = {
				showNext: !this.state.showNext
			};
			if (nextState.showNext) {
				nextState.nextIndex = (this.state.nextIndex + 1)%this.props.data.length;
			}
			this.setState(nextState);
		}, this.props.interval);
	},
	componentDidUpdate: function(prevProps, prevState) {
		if (this.state.showFloatMenu && !prevState.showFloatMenu) {
			this.refs['menu-float'].getDOMNode().style.left = this.refs['article-info-container'].getDOMNode().getBoundingClientRect().left + 'px';
		}
	},
	componentWillUnmount: function() {
		clearInterval(this._interval);
		clearTimeout(this._timeout);
	},
	handleMouseEnter: function(e) {
		console.log('handleMouseEnter', e.currentTarget);
		clearTimeout(this._timeout);
		this.setState({
			showFloatMenu: true
		});
	},
	handleMouseLeave: function(e) {
		console.log('handleMouseLeave', e.currentTarget);
		this._timeout = setTimeout(()=>{
			this.setState({
				showFloatMenu: false
			});
		}, 200);
	},
	renderNavigation: function() {
		return (
			<div style={{position: 'absolute', right: 0, bottom: 40}}>
				<img src="/images/player-back-btn.png" style={{display: 'block'}}/>
				<img src="/images/player-next-btn.png" style={{display: 'block'}}/>
			</div>
		);
	},
	render: function() {
		var current = this.props.data[0];
		var showNext = this.state.showNext || this.state.showFloatMenu;
		var data = showNext? this.props.data[this.state.nextIndex]: current;
		return (
			<div>
				<div style={{overflow: 'hidden', position: 'fixed', left: 0, right: 0, bottom: 0, background: 'white', fontFamily: 'Open Sans', lineHeight: '40px', color: 'rgb(74,74,74)'}}>
					<img className="p-menu-item" src={LOGO_SRC} style={{margin: 10, height: 20}}/>
					<div style={{padding: '0 20px', float: 'right', background: '#2d609b', color: 'white', fontWeight: 600, fontSize: 13, lineHeight: '36px', marginTop: 2, borderRadius: 2, marginRight: 12}}>
						<i className="icon icon-facebook2" style={{lineHeight: '36px', float: 'left', marginRight: 8}}/>
						<span style={{lineHeight: '36px', float: 'left'}}>Share on Facebook</span>
						<div style={{lineHeight: '36px', float: 'left', borderLeft: '1px solid white', marginLeft: 12, paddingLeft: 8}}>
							...
						</div>
					</div>
					<TimeoutTransitionGroup ref="article-info-container" transitionName="slide-up" enterTimeout={500} leaveTimeout={500} style={{position: 'relative', width: 343, height: 40, float: 'right'}}>
						<ArticleInfo data={data} active={showNext} key={data._id} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}/>
					</TimeoutTransitionGroup>
					<div className="p-menu-item border-left" style={{float: 'right', padding: '10px 20px', lineHeight: '20px', fontWeight: 600, color: 'rgb(155,155,155)', fontSize: 13}}>
						<img src="/images/share-icon.png" style={{height: 20, marginRight: 10, float: 'left'}}/>
						<span>Share</span>
					</div>
				</div>
				{this.renderNavigation()}
				<TimeoutTransitionGroup transitionName="little-slide-up" enterTimeout={500} leaveTimeout={500}>
					{this.state.showFloatMenu && <MenuFloat ref="menu-float" key="menu-float" data={this.props.data} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}/>}
				</TimeoutTransitionGroup>
			</div>
		);
	}
});
				// <div style={{padding: '0 20px'}}>
				// 	<i className="fa fa-share fa-2x"/>
				// 	<span>SHARE</span>
				// </div>
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
var AdFixedContainer = React.createClass({
	componentDidMount: function() {
		var img = new Image();
		img.onload = ()=>{
			this._width = img.width;
			this._height = img.height;
			this.updateMaxSize();
		};
		img.src = this.props.src;
	},
	updateMaxSize: function() {
		var scale = window.innerWidth/this._width;
		this.getDOMNode().style.maxHeight = scale * this._height + 'px';
		console.log("scale", scale, this._height, this._width);
	},
	render: function() {
		return (
			<div style={{width: '100%', height: 500, backgroundSize: '100% auto', backgroundPosition: 'center center', backgroundImage: 'url(' + this.props.src + ')', backgroundRepeat: 'no-repeat'}}>
			</div>
		);
	}
});
var CoverSection = require('./cover-desktop-section');
var Section2 = require('./section-2');

var SumFeed = React.createClass({
	render: function() {
		var data = this.props.data;
		var categories = [];
		var features = data.filter((d)=>{
			categories = categories.concat(d.categories);
			return d.featured;
		});
		categories = _.uniq(categories);

		var data1 = [],
			data2 = [],
			data3 = [];

		data.forEach((item, index)=> {
			if (index < 6) {
				data1.push(item);
			} else if (index < 16) {
				data2.push(item);
			} else if (index < 26) {
				data3.push(item);
			}
		});
		data3 = [{
			title: 'Ducati Loyalty Program 4 "Ducati Owner Reward Program"',
			description: 'โปรแกรมพิเศษสำหรับดูคาทิสต้าปัจจุบันที่ครอบครอง Ducati ทุกรุ่นอยู่แล้ว รับส่วนลดมูลค่าสูงสุด 50,000 บาท สำหรับการซื้อรถคันใหม่แคมเปญดีๆ "Ducati Loyalty Program" สำหรับลูกค้าคนสำคัญเช่นคุณ สิ้นสุดในเดือนสิงหาคม 2558 นี้เท่านั้น',
			thumbnail: {src: 'https://scontent-sin1-1.xx.fbcdn.net/hphotos-xta1/t31.0-8/s960x960/11537595_10153055384172893_4071922525986106435_o.jpg'},
			user: {fullname: 'Ducati Thailand'}
		}, {
			title: 'Ducati Loyalty Program 3 "DRE Reward Program"',
			description: 'โปรแกรมพิเศษสำหรับดูคาทิสต้าปัจจุบันที่ครอบครอง Ducati ทุกรุ่นอยู่แล้ว รับส่วนลดมูลค่าสูงสุด 50,000 บาท สำหรับการซื้อรถคันใหม่แคมเปญดีๆ "Ducati Loyalty Program" สำหรับลูกค้าคนสำคัญเช่นคุณ สิ้นสุดในเดือนสิงหาคม 2558 นี้เท่านั้น',
			thumbnail: {src: 'https://scontent-sin1-1.xx.fbcdn.net/hphotos-xft1/v/t1.0-9/11391551_866403206760938_8609768983168042980_n.jpg?oh=7ac3f37c37beb9a690a98d01e1aa9249&oe=5632D24E'},
			user: {fullname: 'Ducati Thailand'}
		}, {
			title: 'Ducati Loyalty Program 2 "Monster Friendship Program"',
			description: 'โปรแกรมพิเศษสำหรับดูคาทิสต้าปัจจุบันที่ครอบครอง Ducati ทุกรุ่นอยู่แล้ว รับส่วนลดมูลค่าสูงสุด 50,000 บาท สำหรับการซื้อรถคันใหม่แคมเปญดีๆ "Ducati Loyalty Program" สำหรับลูกค้าคนสำคัญเช่นคุณ สิ้นสุดในเดือนสิงหาคม 2558 นี้เท่านั้น',
			thumbnail: {src: 'https://scontent-sin1-1.xx.fbcdn.net/hphotos-xft1/v/t1.0-9/11391551_866403206760938_8609768983168042980_n.jpg?oh=7ac3f37c37beb9a690a98d01e1aa9249&oe=5632D24E'},
			user: {fullname: 'Ducati Thailand'}
		}];

		var data4 = [{
			title: 'กิจกรรมดีๆ มาแล้วค่ะ ชวนครอบครัวโคโดโมคลับร่วมเล่นกิจกรรม "เงาไหนใช่เรา" ด้วยกติกาง่ายๆ ดังนี้เลยค่า',
			description: 'กติกา \n1. Like & Share ภาพกิจกรรม แบบสาธารณะ\n2. 1 Account สามารถทายในคอมเมนต์ใต้ภาพกิจกรรมได้ไม่จำกัด อาทิ ภาพสีฟ้า สีชมพู สีเขียว \n3. Tag เพื่อนร่วมแก๊ง 2 ท่าน\n4. การตัดสินจะสุ่มเลือก 10 ผู้โชคดี \n5. ตัดสินเลือกผู้โชคดีโดยคณะกรรมการถือเป็นที่สิ้นสุด\nผู้โชคดีจะได้รับ Tom and Jerry Buddy Box สุดน่ารัก เริ่มตั้งแต่วันนี้ – 19 มิ.ย 15 นี้เท่านั้นค่า\nร่วมสนุกกันเยอะๆ นะคะ ^^',
			thumbnail: {src: 'https://scontent-sin1-1.xx.fbcdn.net/hphotos-xat1/v/t1.0-9/11430125_1056770861018928_8464514682451686304_n.jpg?oh=78438a4ce52638953d0565b4497ed195&oe=5628234B'},
			user: {fullname: 'Kodomo Club'}
		}, {
			thumbnail: {src: 'https://scontent-sin1-1.xx.fbcdn.net/hphotos-xft1/v/t1.0-9/p480x480/11418917_1056790974350250_1154908348740886762_n.jpg?oh=7b8749e6fd94babbf0595c1fb97bde53&oe=562C1303'},
			description: 'แปรงสีฟันโคโดโม รุ่นซอฟต์ & สลิม ด้วยพัฒนาการขนแปรงปลายเรียวเล็กและนุ่มพิเศษ Soft & Slim (PBT) ลิขสิทธิ์เฉพาะของโคโดโม ผลิตจากวัสดุพิเศษจึงไม่ระคายเคืองต่อเหงือกอ่อนๆ ของเด็ก พร้อใคอแปรงเรียวยาว และเอียงตามองศาของช่องปาก ทำให้ซอกซอนทำความสะอาดฟันได้ถึงซี่ในสุดค่ะ',
			user: {fullname: 'Kodomo Club'}
		}, {
			description: 'เด็กๆ ที่ไม่แพ้ยุง แต่เมื่อไปเที่ยวกลับมา ไฉนจึงมีตุ่มตามตัวเหมือนมีอาการแพ้ยุงนะ เนื่องจากเด็กๆ นั้นอาจจะไม่แพ้ยุงในละแวกบ้าน แต่อาจจะแพ้ยุงตามต่างจังหวัด หรือภูเขาป่าไม้ทุ่งหญ้าที่ไปเที่ยว ดังนั้นเพื่อความปลอดภัยควรทายากันยุง หรือจุดยากันยุงบริเวณที่พัก ป้องกันเอาไว้ก่อนล่วงหน้าค่ะ ‪#‎Kodomoclub‬',
			thumbnail: {src: 'https://scontent-sin1-1.xx.fbcdn.net/hphotos-xaf1/v/t1.0-9/p320x320/1907536_1054865537876127_2339278758692236289_n.png?oh=90a3dca8847d4cbf6367c25fc9c95ef3&oe=55FB2360'},
			user: {fullname: 'Kodomo Club'}
		}, {
			thumbnail: {src: 'https://fbcdn-sphotos-b-a.akamaihd.net/hphotos-ak-xaf1/v/t1.0-9/p480x480/18907_1054865261209488_127860155833562483_n.jpg?oh=4dc4931169bd8b5a73d15389cd0c1d5f&oe=55ECEAE0&__gda__=1445235442_e9b91fd36003c63523a80a30c08157ae'},
			description: 'การศึกษาที่มากกว่าความรู้ คือการศึกษาเพื่อสร้างสังคมที่ดีในอนาคต',
			user: {fullname: 'Kodomo Club'}
		}];
		var data5 = [{
			title: 'Want to eat like a SEA Games athlete?',
			description: 'A healthy diet is essential for peak performance. Food and diet consultants for the SEA Games recommends a healthy yet tasty diet for athlete. Meals with plenty of fruits of vegetables to fill nutritional requirements, high in protein but low in fat.',
			thumbnail: {src: 'https://fbcdn-sphotos-e-a.akamaihd.net/hphotos-ak-xaf1/v/t1.0-9/10410743_862840833806680_3194274503433884524_n.png?oh=00d78f8a22df2c5f9dccd998b7037a33&oe=562A5604&__gda__=1445649333_29ed5c0d5da41fa5d8a11203f22a6013'},
			user: {fullname: 'Union Pay'}
		}, {
			thumbnail: {src: 'https://fbcdn-sphotos-d-a.akamaihd.net/hphotos-ak-xta1/v/t1.0-9/11209408_862241120533318_163885250046494375_n.jpg?oh=2502772784d4bf9382af459129b7c2bb&oe=563046AD&__gda__=1442233491_aa86a9ce8e19a58eab1824fe7e1624d6'},
			description: '12 more outlets in the US are now offering exclusive UnionPay card privileges，the total number of US outlets providing such offers has reached 16. \nFrom today to May 31, 2016, you can get a free US$5 VIP Coupon Book from 12 Tanger Outlets Service Centers including Branson and Riverhead with UnionPay cards. The Book offers discount coupons with a total value of over US$1,000.\nCurrently, UnionPay cards are accepted by over 90% of ATMs for cash withdrawal and by over 80% of merchants for payments in the US. #TravelYourWay and don’t miss those offers!',
			user: {fullname: 'Union Pay'}
		}];
		var uniqFC = [];
		return (
			<div style={{background: 'white', minHeight: '100%', paddingBottom: 20}}>
				<CoverSection data={_.first(features.filter((d)=>{
					var cat = d.categories[0];
					if (uniqFC.indexOf(cat) >= 0) {
						return false;
					}
					uniqFC.push(cat);
					return true;
				}), 3)}/>
				<Menubar data={_.first(this.props.data, 5)}/>
				<LatestSection data={data1}/>
				<Section2 title="Latest Review" data={_.first(data1, 6)}/>
				<AdFixedContainer src={ad2}/>
				<FullWidthSection1 data={_.first(data2, 2)} title="JUST ARRIVE"/>
				<AdContainer src={ad1}/>
				<PolygonContainer data={features}/>
				<AdContainer src={ad2}/>
				<SectionA data={data3} title="JUNE 19 - 21"/>
				<AdContainer src={ad1}/>
				<SectionA data={data4} title="Kodomo Club"/>
				<AdContainer src={ad2}/>
				<SectionA data={data5} title="UnionPay International"/>
			</div>
		);
	}
});

module.exports = SumFeed;