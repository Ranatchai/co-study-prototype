var React = require('react');
var _ = require('lodash');
window._ = _;
document.title = 'Little Builders';
var Touchable = require('../touchable');
var isTouchDevice = require('../../common/touch-util').isTouchDevice;
var insertRule = require('react-kit/insertRule');
insertRule('h1, h2, h3, h4, h5, h6 {font-family: Arabica; font-weight: normal;}');
insertRule('h2 {font-size: 40px;}')
insertRule('p {font-family: Helvetica; font-size: 16px;}');
insertRule('.lb-button {-webkit-transition: 0.2s all; transition: 0.2s all; padding-left: 18px; height: 60px; line-height: 60px;padding-right: 18px; display: inline-block; text-align: center; border-radius: 10px; border: 3px solid white; background: #f26527; color: white;font-family Arabica; font-size: 32px;}');
insertRule('.lb-button:hover {background: rgb(226,83,27); color: #ddd}')
insertRule('.lb-menu-item {float: left;margin-right: 40px; font-size: 28px; font-family: Arabica; color: rgba(255,255,255,0.8);}');
insertRule('.lb-menu-item.active {color: white;}');
insertRule('.benefit-item {margin-bottom: 30px}')
insertRule('.benefit-item__img_container {float: left; width: 55px; min-height: 55px;}')
insertRule(`.benefit-item__text_container {margin-left: ${55 + 40}px; min-height: 55px;}`)
insertRule('.benefit-item__header {font-family: Helvetica; font-size: 21px;}')
insertRule('.benefit-item__description {font-size: 14px; margin-top: 10px;}')


var BOX_HEIGHT = 480;
var $ = require('jquery');
var _ = require('underscore');
var Mixins = require('../../common/mixins');
var IMAGE_ROOT_PATH = "./images/little-builder";

var FOOTER_HEIGHT = 80;
var MENU_HEIGHT = 55;
var FaqItem = React.createClass({
	getInitialState: function() {
		return {
			active: false
		};
	},
	getBreakWordHTML: function(text) {
		return text.split('\n').join('<br/>');
	},
	render: function() {
		var {question, answer} = this.props;
		return (
			<div onClick={()=>this.setState({active: !this.state.active})} style={{cursor: 'pointer', marginBottom: 7, fontFamily: 'Helvetica', padding: 15, lineHeight: '20px', fontSize: 16, boxShadow: '1px 1px 5px rgba(0,0,0,0.3)'}}>
				<div>{question}</div>
				{this.state.active && (
					<div style={{marginTop: 30}} dangerouslySetInnerHTML={{__html: this.getBreakWordHTML(answer)}}/>
				)}
			</div>
		);
	}
});
var App = React.createClass({
	mixins: [Mixins.ListenTo],
	getInitialState: function() {
		var path = location.hash.split('#');
		return {
			wWidth: window.innerWidth,
			wHeight: window.innerHeight,
			path: path[path.length - 1]
		};
	},
	componentDidMount: function() {
		this.setDimension();
		this.listenTo(window, 'resize', ()=>{
			this.setState({
				wWidth: window.innerWidth,
				wHeight: window.innerHeight
			});
		});
	},
	componentDidUpdate: function() {
		this.setDimension();
	},
	setDimension: function() {
		if (this.refs.main) {			
			var mainDOM = this.refs.main.getDOMNode();
			// var minHeight = 500;
			var maxHeight = 700;
			// var wHeight = Math.min(Math.max(this.state.wHeight, minHeight), maxHeight);
			var wHeight = maxHeight;
			this._h = wHeight;
			$(mainDOM).css({
				height: wHeight
			});
			var boxHeight = $(this.refs.box.getDOMNode()).height();
			console.log('boxHeight', boxHeight);
			$(this.refs.box.getDOMNode()).css({			
				paddingTop: (wHeight - boxHeight)/2
			});
		}
	},
	handleClickMenu: function(e) {
		var target = e.target;
		var href = target.getAttribute('href');
		if (!href) {
			href = target.parentNode.getAttribute('href');
		}
		if (href && href.indexOf('#') === 0) {
			this.setState({
				path: href.split('#')[1]
			});
			window.scrollTo(0, 0);
		}
	},
	renderMenuItem: function(path, child) {
		return <a style={{marginRight: window.innerWidth > 500? false: 20, fontSize: window.innerWidth > 500? false: 20}} className={"lb-menu-item" + (path === this.state.path?' active':'')} href={`#${path}`}>{child}</a>;
	},
	renderMenu: function(style) {
		return (
			<div onClick={this.handleClickMenu} style={style}>
				{this.renderMenuItem('', <img src={IMAGE_ROOT_PATH + '/menu-logo.png'} height="55" style={{marginLeft: window.innerWidth > 500? 40: 0, marginRight: 0}}/>)}
				{this.renderMenuItem('team', 'Team')}
				{this.renderMenuItem('calendar', 'Calendar')}
				{this.renderMenuItem('faq', 'Faq')}
			</div>
		);
	},
	renderFooter: function() {
		return (
			<div style={{overflow: 'hidden', height: FOOTER_HEIGHT, padding: '0 80px', fontSize: 18, color: 'white', background: 'black', position: 'relative'}}>
				<div style={{lineHeight: `${FOOTER_HEIGHT}px`}}>Copyright © We Are Little Builders 2014. All Rights Reserved</div>
				{window.innerWidth > 500 && <div style={{position: 'absolute', right: 70, top: 18, bottom: 0}}>
					<a href="https://www.facebook.com/littlebuilderscommunity" target="_blank"><img width="60" src={IMAGE_ROOT_PATH + "/icon-facebook.png"}/></a>
					<a href="mailto:contact@wearelittlebuilders.com"><img width="60" src={IMAGE_ROOT_PATH + "/icon-email.png"}/></a>
				</div>}
			</div>
		);
	},
	renderMainPage: function() {
		return (
			<div>
				<div ref="main" style={{
					height: 700,
					background: 'url(' + IMAGE_ROOT_PATH + '/littlebuilders-bg-toplanding.jpg)',
					backgroundSize: 'cover',
					backgroundPosition: 'center center',
					position: 'relative'
				}}>
					<div className="absolute-full" style={{background: 'rgba(0,0,0,0.2)'}}/>
					<div ref="box" style={{position: 'relative', textAlign: 'center', margin: 'auto', color: 'white'}}>
						<img src={IMAGE_ROOT_PATH + '/logo-shadow.png'} height="270"/>
						<p style={{margin: '10px 0 30px', fontSize: 26, fontFamily: 'Arabica', fontWeight: 100}}>WHEN <span style={{color: 'rgba(255,255,255, 0.8)'}}>"LEARNING"</span> MEETS <span style={{color: 'rgba(255,255,255, 0.6)'}}>"BUILDING"</span></p>
						<a href="http://bit.ly/fromLBwebsite" target="_blank" className="lb-button">Join us</a>
					</div>
					<div style={{fontSize: 24, position: 'absolute', left: 0, right: 0, bottom: 20, color: 'white', textAlign: 'center'}}>					
						<a style={{cursor: 'pointer'}} onClick={()=>$('html, body').stop().animate({scrollTop: this._h}, 200, 'swing')}>
							<div style={{marginBottom: 20, color: 'white', fontSize: 28}}>Read more</div>
							<img style={{}} width="30" src={IMAGE_ROOT_PATH + "/arrowdown.png"}/>
						</a>
						{window.innerWidth > 500 && <div style={{position: 'absolute', right: 40, top: 0, bottom: 0}}>
							<a href="https://www.facebook.com/littlebuilderscommunity" target="_blank"><img width="60" src="./images/little-builder/icon-facebook.png"/></a>
							<a href="mailto:contact@wearelittlebuilders.com"><img width="60" src={IMAGE_ROOT_PATH + "/icon-email.png"}/></a>
						</div>}
					</div>
				</div>
				<div style={{margin: '20px 0'}}>
					<div style={{margin: '80px auto', maxWidth: 840, padding: 0, textAlign: 'center'}}>
						<img src={IMAGE_ROOT_PATH + '/littlebuilders-line-who.png'} height="24"/>
						<h2 style={{fontSize: 40, margin: '15px 0 10px', textAlign: 'center'}}>Who We Are</h2>
						<p style={{lineHeight: '25px', marginBottom: 40, textAlign: 'left', padding: '0 20px'}}>Little Builders is a group of young people who care about education and inequality problems. We were originally a volunteer group working with a foster home to provide experiential learning to under-privileged students.</p>
						<a onClick={this.handleClickMenu} className="lb-button" href="#team">Meet the Team</a>
					</div>
				</div>
				<div style={{padding: '60px 0'}}>
					<div style={{maxWidth: 1060, margin: 'auto'}}>
						<div style={{width: this.state.wWidth > 800? 580: '100%', float: 'left', padding: 20}}>
							<img src={IMAGE_ROOT_PATH + "/s3.jpg"} style={{width: '100%'}}/>
						</div>
						<div style={{marginLeft: this.state.wWidth > 800? 580: 0, paddingTop: this.state.wWidth > 1000? 60:false, padding: 20}}>
							<img style={{marginLeft: 10, marginBottom: 15}} src={IMAGE_ROOT_PATH + '/littlebuilders-line-how.png'} height="24"/>
							<h2>How We Do</h2>
							<p style={{lineHeight: '25px', marginTop: 15}}>We use design thinking as a tool to develop the students’ projects. Beginning from finding problems around them, the students were able to come up with many creative ideas and develop one prototype. We guided them through the process, gave them constructive feedbacks and made their ideas come true! Cycling-powered Watering Pump, Finding “Mr. Right” for Young Girls Manual, No-more-repeating Menu, and many more solutions we guided them to create.</p>
						</div>
						<div style={{clear: 'both'}}/>
					</div>
				</div>
				<div style={{maxWidth: 1280, margin: '80px auto', textAlign: 'center'}}>
					<img style={{marginLeft: 10, marginBottom: 10}} src={IMAGE_ROOT_PATH + '/littlebuilders-line-project.png'} height="24"/>
					<h2 style={{textAlign: 'center', marginBottom: 30}}>Our Projects</h2>
					<div>
						{[{src: IMAGE_ROOT_PATH + '/s2.jpg'}, {src: IMAGE_ROOT_PATH + '/s3.jpg'}, {src: IMAGE_ROOT_PATH + '/s4.jpg'}].map((m)=>{
							return (
								<div style={{float: 'left', width: this.state.wWidth > 900? '33%': this.state.wWidth > 600?'50%': '100%', height: 300, position: 'relative'}}>
									<div style={{position: 'absolute', left: 10, right: 10, top: 10, bottom: 10, background: 'url(' + m.src + ')', backgroundSize: 'cover', backgroundPosition: 'center center'}}>
										<div className="absolute-full gradient-black-bottom"/>
										<h4 style={{position: 'absolute', fontSize: 24, left: 15, bottom: 15, color: 'white'}}>Bann Tawanmai Project</h4>
									</div>
								</div>
							);
						})}						
					</div>
					<div style={{clear: 'both'}}/>
				</div>
				<div style={{color: 'white', margin: '40px 0', padding: '60px 0', background: 'url(' + IMAGE_ROOT_PATH + '/littlebuilders-bg-stage.jpg)', backgroundPosition: 'center center', backgroundSize: 'cover'}}>
					<div style={{maxWidth: 720, margin: '40px auto', padding: '0 20px', textShadow: '0px 2px 10px #0A0303'}}>
						<h2 style={{textAlign: 'center', marginBottom: 20}}>Little Builders: Stage for Leaders</h2>
						<p style={{lineHeight: '26px', fontSize: 14, marginBottom: 20, color: 'rgba(255,255,255, 0.9)'}}>Receiving funding from Thai Social Enterprise Office, we are going to make such incredible projects happen again at Watpakbor School – educational opportunity expansion school in Bangkok. It will be another stage for you, prospective leaders, to discover your potential, develop your leadership skills and empower younger generations.</p>
					</div>
				</div>				
				<div style={{margin: '80px 0 0'}}>
					<div style={{maxWidth: 720, margin: '40px auto'}}>
						<h2 style={{textAlign: 'center', marginBottom: 40}}>THINGS YOU WILL GET FROM THIS PROJECT</h2>
						<div style={{maxWidth: 540, margin: 'auto', padding: '0 20px'}}>
							{this.getBenefitData().map((d)=>(
								<div className="benefit-item">
									<div className="benefit-item__img_container">
										<img src={d.src} width="100%"/>
									</div>								
									<div className="benefit-item__text_container">
										<h4 className="benefit-item__header">{d.title}</h4>
										<p className="benefit-item__description">{d.description}</p>
									</div>
								</div>
							))}
							<div className="benefit-item">
								<div className="benefit-item__img_container">
									<img src={IMAGE_ROOT_PATH + '/littlebuilders-icon-cost.png'} width="100%"/>
								</div>								
								<div className="benefit-item__text_container">
									<h4 className="benefit-item__header" style={{lineHeight: '55px'}}>Cost: ฿ 3,500</h4>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div style={{margin: 0}}>
					<div style={{textAlign: 'center', maxWidth: 550, margin: '40px auto', padding: '50px', background: 'url(' + IMAGE_ROOT_PATH + '/littlebuilder-background-apply.png' + ')', backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}}>
						<h2 style={{marginBottom: 30}}>{"WHO'S ELIBIGLE?"}</h2>
						<p style={{fontSize: 14, textAlign: 'left', margin: 'auto', maxWidth: 400}}>
							University students of young professionals<br/>
							Availiable on 19 Dec 2015, 9 Jan, 16 Jan and 30 Jan 2016<br/>
							Eager to develop leadership and communication skills
						</p>
						<a target="_blank" href="http://bit.ly/fromLBwebsite" className="lb-button" style={{margin: '40px auto 79px'}}>Apply now!!</a>
					</div>
				</div>
				{/*<div style={{maxWidth: 960, margin: '200px auto 40px', textAlign: 'center'}}>
					<img style={{marginLeft: 10, marginBottom: 10}} src={IMAGE_ROOT_PATH + '/littlebuilders-line-testim.png'} height="24"/>
					<h2 style={{textAlign: 'center', fontSize: 32, marginBottom: 20}}>Words From Alumni</h2>
				</div>*/}
			</div>
		);
	},
	getBenefitData: function() {
		function getIconSrcPath(name) {
			return IMAGE_ROOT_PATH + '/littlebuilders-icon-benefit-' + name + '.png';
		}
		return [
			{
				title: '2 Days Training',
				description: 'Group process, debriefing, giving feedback, communication and introduction to design thinking.',
				src: getIconSrcPath('2days')
			},
			{
				title: 'Hand-on experiences',
				description: 'Lead your team to carry out a project by using those skills you are trained.',
				src: getIconSrcPath('handson')
			},
			{
				title: 'Personal development plan and evaluation',
				description: 'Set your goals of learning, track your performance, get constructive feedback from our team.',
				src: getIconSrcPath('improve')
			},
			{
				title: 'LittileBuilders community',
				description: 'Warm network of talents form various backgrounds will support your learning and self-development.',
				src: getIconSrcPath('commu')
			}
		];
	},
	getTeamData: function() {
		function getAvatarPath(name) {
			return IMAGE_ROOT_PATH + '/littlebuilders-team-' + name + '.png';
		}
		var sample = {
			title: 'Co-founder and Project Manager',
			quote: 'เราทุกคนเป็นเหมือนเมล็ดพันธ์ ที่รอสภาพแวดล้อมที่เหมาะสม เพื่อจะเติบโตงอกงาม',
			description: 'ผู้จัดการแท่นขุดเจาะน้ำมัน จบเครื่องกล วิศวจุฬาฯ เป็น competent communicator ของ Toastmaster ก่อตั้ง Little Bilders มีความตั้งใจที่จะสร้างสภาพแวดล้อมที่เหมาะสำหรับการเติบโตนั้น ให้เกิดกับคนทุกคน'	
		};
		return [
			{
				name: 'สวรส ธนาพรสังสุทธิ์',
				src: getAvatarPath('sam'),
				nickname: 'สาม',
				title: 'Co-founder and Student Development Researcher',
				quote: 'Building is one of the greatest learning strategies that promote the sense of confidence and ownership in the great young mind.',
				description: 'นักเรียนทุนฟุลไบรท์\nที่วางแผนจะมาเป็นนักออกแบบเทคโนโลยีการศึกษาหลัง\nจากเรียนจบจาก Columbia University เพราะ\nแถมด้วยประสบการณ์การทำงานกับ Sesame Street\nรายการทีวีที่อยู่ในใจของเด็กหลายๆ คน'
			},
			{
				name: 'ยงยุทธ์ ลายธาวร',
				src: getAvatarPath('tay'),
				title: 'Co-founder and Project Manager',
				quote: 'เราทุกคนเป็นเหมือนเมล็ดพันธ์ ที่รอสภาพแวดล้อมที่เหมาะสม เพื่อจะเติบโตงอกงาม',
				nickname: 'เต้',
				description: 'ผู้จัดการแท่นขุดเจาะน้ำมัน จบเครื่องกล วิศวฯ จุฬาฯ เป็น competent communicator ของ Toastmaster ก่อตั้ง Little Builders\nมีความตั้งใจที่จะสร้างสภาพแวดล้อมที่เหมาะสำหรับการเติบโตนั้น ให้เกิดกับคนทุกคน'
			},
			{
				name: 'อฬาชา เหล่าชัย',
				src: getAvatarPath('prae'),
				nickname: 'แพร',
				title: 'Coach Development and Content Designer',
				quote: 'เราเชื่อเสมอว่าการปีนให้สูงขึ้น\nไม่จำเป็นต้องกดให้คนอื่นต่ำลง\nเราไปสู่จุดที่ดีขึ้นพร้อมกับดึงคนอื่นให้ดีขึ้นด้วยได้',
				description: 'บัณฑิตสาวอักษรฯ จุฬาฯ ผู้ผันตัวจากการเป็น online marketer บริษัทดัง มาเป็นผู้พัฒนา\n"นักเปลี่ยนแปลงสังคม" ที่หลักสูตร Global Studies and Social Entrepreneurship\nมหาวิทยาลัยธรรมศาสตร์ (หลักสูตรนานาชาติ) แถมรับงานเป็นโค้ช design thinking workshop ทั้งไทยและเทศ'
			},
			{
				name: 'ขวัญกมล เดชาติวงศ์ ณ อยุธยา',
				src: getAvatarPath('jam'),
				title: 'Coach Development Lead',
				quote: 'ทุกคนมีทั้งจิตใจที่ดี และของดีอยู่ในตัว',
				description: 'นักศึกษาแพทย์ ปี6 อดีต President\nขององค์กรนักเรียนหมอนานาชาติ (IFMSA-Thailand)\nแถมยังเป็น international traininer of IFMSA\nอีกด้วย!\nตัดสินใจเลือกเส้นทางหมอที่อยากจะพัฒนาศักยภาพมนุษย์',
				nickname: 'แยม'
			},
			{
				name: 'กษิดิ์เดช พูลสุขสมบัติ',
				src: getAvatarPath('mike'),
				title: 'Student Development Researcher',
				quote: 'Develop yourself for others',
				nickname: 'ไมค์',
				description: 'บัณฑิตวิศวกรรมคอมพิวเตอร์จาก Stanford ผู้ปฏิเสธ\noffer จากบริษัทชื่อดังใน Silicon valley\nมาเป็นครูสอนคณิตศาสตร์ในโครงการ Teach for Thailand\nและชอบหาของเล่นที่ทำให้นักเรียนเรียนเลขได้ไม่เบื่อ!'
			},
			{
				name: 'รัชนีพร อัศวนภ',
				src: getAvatarPath('bee'),
				nickname: 'บี',
				title: 'Business Development',
				quote: 'Everyone has so much potential to be great, so believe in yours. Give, inspire, and empower others, for that is also the best way we grow.',
				description: 'บีจบจากรั้วบัญชี จุฬาฯ ด้วยเกียรตินิยมอันดับ 1\nเชื่อว่าเราสามารถพัฒนาธุรกิจและสร้างนวัตกรรมเพื่อ\nเปลี่ยนแปลงสังคมให้ดีขึ้นได้\nมาพร้อมกับประสบการณ์ด้านวางแผนพัฒนาธุรกิจ ที่\nSCG'
			},
			{
				name: 'สุรพัฒน์ สมศรี',
				title: 'Talent Acquisition and Project Manager',
				quote: 'Rekindle your fire! By Building a flame in the hearts of others',
				description: 'นักศึกษาปริญญาโทด้าน Energy and Environment ที่ KTH Royal Institute of Technology, Sweden\nสนใจด้านการพัฒนาตนเอง อยากเห็นให้เด็กๆทุกคนมีโอกาสได้เข้าถึงการศึกษาที่ทำให้เขาเป็นคนที่สมบูรณ์',
				src: getAvatarPath('yang'),
				nickname: 'หยาง'
			}
		];
	},
	getContainerMinHeight: function() {
		return window.innerHeight - MENU_HEIGHT - FOOTER_HEIGHT;
	},
	getBreakWordHTML: function(text) {
		return text.split('\n').join('<br/>');
	},
	renderTeamPage: function() {
		var width = window.innerWidth > 960? '33%': window.innerWidth > 600? '50%': '100%';
		return (
			<div style={{margin: 'auto', padding: '80px 0', maxWidth: 1024, textAlign: 'center', minHeight: this.getContainerMinHeight()}}>
				<img src={IMAGE_ROOT_PATH + '/littlebuilders-line-who.png'} height="24"/>
				<h1 style={{marginTop: 10, marginBottom: 50}}>OUR TEAM</h1>
				{this.getTeamData().map((d)=>(
					<div style={{height: 440, float: 'left', width: width, padding: '0 20px', marginBottom: 40}}>
						<img src={d.src} width="150"/>
						<h3 style={{marginTop: 20, fontSize: 30, fontFamily: 'THSarabunNew', fontWeight: 'bold'}}>{d.name} ({d.nickname})</h3>
						<h4 style={{marginTop: 4, fontFamily: 'Helvetica', lineHeight: '24px', fontSize: 15}}>{d.title}</h4>
						<p style={{fontFamily: 'THSarabunNew', marginTop: 10, fontWeight: 100, fontSize: 18, lineHeight: '21px', fontStyle: 'italic'}}>"{d.quote}"</p>
						<p style={{fontFamily: 'THSarabunNew', marginTop: 4, fontWeight: 100, fontSize: 18, lineHeight: '21px'}} dangerouslySetInnerHTML={{__html: this.getBreakWordHTML(d.description)}}/>
					</div>
				))}
				<div style={{clear: 'both'}}/>
			</div>
		);
	},
	renderCalendarPage: function() {
		return (
			<div style={{margin: 'auto', padding: '80px 0', maxWidth: 960, textAlign: 'center', minHeight: this.getContainerMinHeight()}}>
				<h1>Calendar</h1>				
			</div>
		);
	},
	renderFaqPage: function() {
		return (
			<div style={{margin: 'auto', padding: '80px 20px', maxWidth: 960, textAlign: 'center', minHeight: this.getContainerMinHeight()}}>
				<img src={IMAGE_ROOT_PATH + '/littlebuilders-line-faq.png'} height="24"/>
				<h1 style={{marginTop: 10, marginBottom: 60}}>Faq</h1>
				<div style={{textAlign: 'left', margin: '30px 0'}}>
					<h3 style={{fontSize: 21, fontWeight: 'bold', fontFamily: 'Helvetica', marginBottom: 20}}>General question</h3>
					{this.renderFaqItem('1. What is Little Builders?', 'Little Builders is the stage that aims to accelerate personal development and create social impact in the same time.')}
					{this.renderFaqItem('2. What is "Stage for Leader" program?', "Little Builders: Stage for Leader; is the program designed to let participant learn leadership skills through participating as lead coach of student's project. Participants will lead students through their project, using tools like design thinking, STEM, and other personality strengthes.\n\nThink of public speaking, the best way to improve speaking skill is to do speeches on real stages with real audiences and recieve constructive feedbacks from other seasoned speakers to improve. The student's project will be your stage, and we will be you the feedbacks.")}
					{this.renderFaqItem('3. Who are the intended participant to our program?', "นิสิตนักศึกษามหาวิทยาลัยที่สนใจในการพัฒนาตนเอง\nนิสิตนักศึกษาจบใหม่ที่เริ่มทำงานและต้องการจะเป็นผู้นำในอนาคต")}
					{this.renderFaqItem('4. Why do participant have to pay for the program?', "เราเก็บเงินเพื่อใช้ในการพัฒนาโปรเจคของนักเรียน และเพื่อการขยายขนาดให้ครอบคลุมจำนวนโรงเรียนหรือกลุ่มนักเรียนมากขึ้น ไกลขึ้น เข้าถึงได้มากขึ้น\n\nในครั้งนี้เงิน 3,500 จากผู้เข้าร่วม Stage for Leaders จะสนับสนุนโปรเจคต่างๆของน้องนักเรียน ม.2 โรงเรียนวัดปากบ่อประมาณ 120 คนในระยะเวลา 4 เดือน \nมีการจัดกิจกรรมกับโรงเรียนทั้งหมด 8 ครั้ง \nมีการสร้างผลงานจริงที่จะใช้เพื่อพัฒนาชุมชนที่เขาอยู่ \nส่วนเหลือของเงินจะใช้เพื่อสนับสนุนโปรเจคอื่นๆของน้องๆต่อไป\n\nตัวอย่างโครงการในปีที่ผ่านมา เช่น ระบบรดนำ้ต้นไม้ครอบคลุมพื้นที่ 2 ไร่ และเทียนหอมไล่ยุง 300 แก้ว จากน้องๆบ้านตะวันใหม่ประมาณ 80 คน")}
				</div>
				<div style={{textAlign: 'left', margin: '30px 0'}}>
					<h3 style={{fontSize: 21, fontWeight: 'bold', fontFamily: 'Helvetica', marginBottom: 20}}>Benefits</h3>
					{this.renderFaqItem('1. How will the Little Builders: Stage for Leaders benefit participants?', "As participant, we will be the stage for you to practice leadership skills. \nTogether we set up personal development plans, do it and review it. \nYou will witness student's potential and learn to find your own.")}
					{this.renderFaqItem('2. How will the Little Builders: Stage for Leaders benefit students?', "For students We organize activity that let's student find out about their own interests, come up with project ideas to improve their community. \nThey will then get to create the real working product, and see their own potential first hands. \nThey will create their own identity, confidents, and skills.")}
					{this.renderFaqItem('3. How will the Little Builders: Stage for Leaders benefit community?', "ทางชุมชนจะได้ผลงานของนักเรียนที่ออกแบบมาเพื่อพัฒนาและแก้ปัญหาต่างๆของชุมชนเหล่านั้น")}
				</div>
				<div style={{textAlign: 'left', margin: '30px 0'}}>
					<h3 style={{fontSize: 21, fontWeight: 'bold', fontFamily: 'Helvetica', marginBottom: 20}}>ETC</h3>
					{this.renderFaqItem('1. What makes Little Builders difference from other coaching organization?', "No other coaching organization can give you the real hands-on experiecnes like we do\n\nAnd while you are developing yourself, you also creating impact to our society!")}
					{this.renderFaqItem('2. What if I can\'t be there all 4 days? Am I still eligible for applying for the program?', "เราต้องการจำนวนของผู้เข้าร่วมที่แน่นอนและต่อเนื่องในช่วงกิจกรรมทั้ง 3 ครั้งกับนักเรียน (อีก 1 กิจกรรมเป็น coaching session)\n\nเนื่องจากจะช่วยให้สามารถนำกลุ่มนักเรียนได้ต่อเนื่อง และเพื่อการพัฒนาสูงสุดของผู้เข้าร่วม\n\nทั้งนี้ถ้าในวันใดวันหนึ่งผู้เข้าร่วมไม่สามารถเข้าร่วมได้ เราสามารถพูดคุยเพื่อวางแผนการพัฒนาครั้งนั้นๆของผู้เข้าร่วมได้ และเพื่อการส่งต่อโปรเจคของน้องๆในแต่ละครั้ง\n\nในโอกาสหน้าเราจะพยายามออกแบบกิจกรรมที่มีความยืดหยุ่นได้มากกว่านี้")}
					{this.renderFaqItem('3. What kind of people join Little Builders?', "Link to Testimonial")}
				</div>
				<div style={{paddingTop: 10}}>
					<div style={{textAlign: 'center', margin: '20px auto', fontFamily: 'Helvetica'}}>{"Can't find what you are looking for?"}</div>
					<a className="lb-button">ASK US!</a>
				</div>
			</div>
		);
	},
	renderFaqItem: function(question, answer) {
		return (
			<FaqItem question={question} answer={answer}/>
		);
	},
	render: function() {
		var page;
		var menuStyle = {
			height: MENU_HEIGHT,
			lineHeight: '55px',
			background: 'rgba(31,31,31,0.85)'
		};
		switch (this.state.path) {
			case 'team': 
						page = this.renderTeamPage(); 
						break;
			case 'calendar': 
						page = this.renderCalendarPage(); 
						break;
			case 'faq': 
						page = this.renderFaqPage(); 
						break;
			default: 
						page = this.renderMainPage(); 
						menuStyle = {lineHeight: '55px', position: 'absolute', left: window.innerWidth > 500? 80: 20, top: 20, zIndex: 2};						
		}
		return (
			<div style={{overflowX: 'hidden', fontFamily: 'Arabica'}}>
				{this.renderMenu(menuStyle)}
				{page}
				{this.renderFooter()}
			</div>
		);
	}
});

module.exports = App;