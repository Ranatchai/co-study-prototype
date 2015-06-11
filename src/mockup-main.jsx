var DOM_APP_EL_ID = "app";
var props = {};
var React = require('react');
var assign = require('react/lib/Object.assign');
var Loader = require("halogen/MoonLoader");
var React = require("react");
var classnames = require("classnames");
var appendVendorPrefix = require("react-kit/appendVendorPrefix");

var transformKey = 'WebkitTransform';
var LoadingCenter = React.createClass({
	render: function() {
  	var style = {
  	  position: 'absolute',
		  left: '50%',
		  top: '50%',
      transform: 'translate(-50%, -50%)'
    };
    appendVendorPrefix(style);
    var Component = this.props.component || Loader;
    var className = classnames("loader-container", this.props.className);
    return (
      <span {...this.props} className={className} style={style}>
        <Component color={this.props.color || (this.props.dark? "rgba(255, 255, 255, 0.9)": "#27abe1")} size={this.props.size || "32px"} margin="4px"/>
      </span>
    );
  }
});

function createFixDOMFromRect(rect, targetParent) {	
	var ele = document.createElement('div');
	var styles = {
		position: 'fixed',
		left: rect.left + 'px',
		top: rect.top + 'px',
		width: rect.width + 'px',
		height: rect.height + 'px',
		opacity: 1,
		zIndex: 1
	};
	assign(ele.style, styles);
	(targetParent || document.body).appendChild(ele);
	return ele;
};
var Article = React.createClass({
	getInitialState: function() {
		return {loading: true};
	},
	componentDidMount: function() {		
		setTimeout(()=>this.setState({loading: false}, ()=>{
			TweenMax.fromTo(this.refs.content.getDOMNode(), 0.3, {
				opacity: 0
			}, {
				opacity: 1
			});
		}), 1000);
	},
	onCloseArticle: function() {
		var rect = window._rect;
		TweenMax.to(this.getDOMNode(), 0.5, {
			width: rect.width,
			height: rect.height,
			x: rect.left,
			y: rect.top - (50*2) + 300
		});
		TweenMax.fromTo(this.refs.content.getDOMNode(), 0.3, {
			opacity: 1
		}, {
			opacity: 0
		});
	},
	render: function() {		
		return (
			<article {...this.props} className="content__item content__item--show" style={{position: 'absolute', left: 0, top: 50, width: window.innerWidth, height: window.innerHeight - 50, background: 'white', padding: 20, overflow: 'hidden'}}>
				{this.state.loading? <LoadingCenter size="64px"/>: (
					<div className="content" ref="content" style={{maxWidth: 900, margin: 'auto'}}>
						<span className="category category--full"><font><font>Stories for humans</font></font></span>
						<h2 ref="title" className="title title--full"><font><font>On Humans &amp; other Beings</font></font></h2>
						<div className="meta meta--full">							
							<span className="meta__author">Matthew Walters</span>
							<span className="meta__date"><i className="fa fa-calendar-o"></i><font><font> 9 Apr</font></font></span>
							<span className="meta__reading-time"><i className="fa fa-clock-o"></i><font><font> 3 min read</font></font></span>
						</div>
						<p>I am fully aware of the shortcomings in these essays. I shall not touch upon those which are characteristic of first efforts at investigation. The others, however, demand a word of explanation.</p>
						<p>The four essays which are here collected will be of interest to a wide circle of educated people, but they can only be thoroughly understood and judged by those who are really acquainted with psychoanalysis as such. It is hoped that they may serve as a bond between students of ethnology, philology, folklore and of the allied sciences, and psychoanalysts; they cannot, however, supply both groups the entire requisites for such co-operation. They will not furnish the former with sufficient insight into the new psychological technique, nor will the psychoanalysts acquire through them an adequate command over the material to be elaborated. Both groups will have to content themselves with whatever attention they can stimulate here and there and with the hope that frequent meetings between them will not remain unproductive for science.</p>
						<p>The two principal themes, totem and taboo, which give the name to this small book are not treated alike here. The problem of taboo is presented more exhaustively, and the effort to solve it is approached with perfect confidence. The investigation of totemism may be modestly expressed as: “This is all that psychoanalytic study can contribute at present to the elucidation of the problem of totemism.” This difference in the treatment of the two subjects is due to the fact that taboo still exists in our midst. To be sure, it is negatively conceived and directed to different contents, but according to its psychological nature, it is still nothing else than Kant’s ‘Categorical Imperative’, which tends to act compulsively and rejects all conscious motivations. On the other hand, totemism is a religio-social institution which is alien to our present feelings; it has long been abandoned and replaced by new forms. In the religions, morals, and customs of the civilized races of to-day it has left only slight traces, and even among those races where it is still retained, it has had to undergo great changes. The social and material progress of the history of mankind could obviously change taboo much less than totemism.</p>
						<p>If I judge my readers’ impressions correctly, I dare say that after hearing all that was said about taboo they are far from knowing what to understand by it and where to store it in their minds. This is surely due to the insufficient information I have given and to the omission of all discussions concerning the relation of taboo to superstition, to belief in the soul, and to religion. On the other hand I fear that a more detailed description of what is known about taboo would be still more confusing; I can therefore assure the reader that the state of affairs is really far from clear. We may say, however, that we deal with a series of restrictions which these primitive races impose upon themselves; this and that is forbidden without any apparent reason; nor does it occur to them to question this matter, for they subject themselves to these restrictions as a matter of course and are convinced that any transgression will be punished automatically in the most severe manner. There are reliable reports that innocent transgressions of such prohibitions have actually been punished automatically. For instance, the innocent offender who had eaten from a forbidden animal became deeply depressed, expected his death and then actually died. The prohibitions mostly concern matters which are capable of enjoyment such as freedom of movement and unrestrained intercourse; in some cases they appear very ingenious, evidently representing abstinences and renunciations; in other cases their content is quite incomprehensible, they seem to concern themselves with trifles and give the impression of ceremonials. Something like a theory seems to underlie all these prohibitions, it seems as if these prohibitions are necessary because some persons and objects possess a dangerous power which is transmitted by contact with the object so charged, almost like a contagion. The quantity of this dangerous property is also taken into consideration. Some persons or things have more of it than others and the danger is precisely in accordance with the charge. The most peculiar part of it is that any one who has violated such a prohibition assumes the nature of the forbidden object as if he had absorbed the whole dangerous charge. This power is inherent in all persons who are more or less prominent, such as kings, priests and the newly born, in all exceptional physical states such as menstruation, puberty and birth, in everything sinister like illness and death and in everything connected with these conditions by virtue of contagion or dissemination.</p>
						<p>First of all it must be said that it is useless to question savages as to the real motivation of their prohibitions or as to the genesis of taboo. According to our assumption they must be incapable of telling us anything about it since this motivation is ‘unconscious’ to them. But following the model of the compulsive prohibition we shall construct the history of taboo as follows: Taboos are very ancient prohibitions which at one time were forced upon a generation of primitive people from without, that is, they probably were forcibly impressed upon them by an earlier generation. These prohibitions concerned actions for which there existed a strong desire. The prohibitions maintained themselves from generation to generation, perhaps only as the result of a tradition set up by paternal and social authority. But in later generations they have perhaps already become ‘organized’ as a piece of inherited psychic property. Whether there are such ‘innate ideas’ or whether these have brought about the fixation of the taboo by themselves or by co-operating with education no one could decide in the particular case in question. The persistence of taboo teaches, however, one thing, namely, that the original pleasure to do the forbidden still continues among taboo races. They therefore assume an _ambivalent attitude_ toward their taboo prohibitions; in their unconscious they would like nothing better than to transgress them but they are also afraid to do it; they are afraid just because they would like to transgress, and the fear is stronger than the pleasure. But in every individual of the race the desire for it is unconscious, just as in the neurotic.</p> <p>It seems like an obvious contradiction that persons of such perfection of power should themselves require the greatest care to guard them against threatening dangers, but this is not the only contradiction revealed in the treatment of royal persons on the part of savages. These races consider it necessary to watch over their kings to see that they use their powers in the right way; they are by no means sure of their good intentions or of their conscientiousness. A strain of mistrust is mingled with the motivation of the taboo rules for the king. “The idea that early kingdoms are despotisms”, says Frazer[59], “in which the people exist only for the sovereign, is wholly inapplicable to the monarchies we are considering. On the contrary, the sovereign in them exists only for his subjects: his life is only valuable so long as he discharges the duties of his position by ordering the course of nature for his people’s benefit. So soon as he fails to do so, the care, the devotion, the religious homage which they had hitherto lavished on him cease and are changed into hatred and contempt; he is ignominiously dismissed and may be thankful if he escapes with his life. Worshipped as a god one day, he is killed as a criminal the next. But in this changed behaviour of the people there is nothing capricious or inconsistent. On the contrary, their conduct is quite consistent. If their king is their god he is or should be, also their preserver; and if he will not preserve them he must make room for another who will. So long, however, as he answers their expectations, there is no limit to the care which they take of him, and which they compel him to take of himself. A king of this sort lives hedged in by ceremonious etiquette, a network of prohibitions and observances, of which the intention is not to contribute to his dignity, much less to his comfort, but to restrain him from conduct which, by disturbing the harmony of nature, might involve himself, his people, and the universe in one common catastrophe. Far from adding to his comfort, these observances, by trammelling his every act, annihilate his freedom and often render the very life, which it is their object to preserve, a burden and sorrow to him.”</p>
						<p>Excerpts from <a href="http://www.gutenberg.org/ebooks/41214">Totem and Taboo</a> by Sigmund Freud.</p>
					</div>
				)}
			</article>
		);
	}
});
var Item = React.createClass({
	onOpenArticle: function() {
		setTimeout(()=>{
			TweenMax.fromTo(["header", "description"].map((f)=>this.refs[f].getDOMNode()), 0.2, {
				opacity: 1
			}, {
				opacity: 0,
				onComplete: ()=>{
					var rect = this.getDOMNode().getBoundingClientRect();
					window._rect = rect;
					var dom = createFixDOMFromRect(rect);
					dom.className = 'placeholder';
					dom.style.background = 'white';
					this.getDOMNode().style.opacity = 0;
					TweenMax.to(dom, 0.5, {
						width: window.innerWidth,
						height: window.innerHeight,
						x: -rect.left,
						y: -rect.top + 50,
						z: 1500,
						rotationX: '-179.9deg',
						onComplete: ()=> {
							setTimeout(()=>dom.parentNode.removeChild(dom), 16);
						}
					});
				}
			});
			TweenMax.fromTo(this.refs.image.getDOMNode(), 0.2, {opacity: 1}, {opacity: 0});
		}, 300);
	},
	onCloseArticle: function() {

	},
	render: function() {
		return (
			<div className="channel__item-list__item" {...this.props} style={{overflow: 'hidden'}}>
				<div className="channel__item-list__item__image-zone" style={{}} ref="image">
					<div className="channel__item-list__item__image-zone__image" style={{}}>
					</div>
				</div>
				<div className="channel__item-list__item__text-zone">
					<h3 ref="header">
					ชวนเจ้าหนูหม่ำข้าวกล้องกันนะ</h3>
					<p ref="description">
					ทุกวันนี้กระแสอาหารสุขภาพมาแรง แต่ก็ยังไม่แซงโค้งอาหารหวานมันซะที นั่นเป็นเพราะรสชาติที่ติดใจ ได้ง่ายๆ ดังนั้นเรามาปลูกฝังให้เทรนด์อาหารสุขภาพติดตัวลูกเราไป ต้องเริ่มตั้งแต่ตอนนี้กันเลย ข้าว&nbsp;เป็นอาหารหลักที่เรากินกันทุกวัน บางคนกินนู่นนี่ทั้งวัน แต่รู้สึกไม่อยู่ท้องเพราะยังไม่ได้กิน ‘ข้าว’ แล้วทุกวันนี้ก็มีข้าวให้เลือกมากมายซะจริงๆ โดยเฉพาะ ข้าวกล้อง</p>
				</div>
			</div>
		);
	}
});
var Heading = React.createClass({
	getInitialState: function() {
		return {follow: false};
	},
	onOpenArticle: function() {
		TweenMax.fromTo(["followBtn", "postBtn", "cameraIcon", "cameraIcon2", "tagline"].map((f)=>this.refs[f].getDOMNode()), 0.3, {
			opacity: 1,
			display: 'block'
		}, {
			opacity: 0,
			display: 'none'
		});
		TweenMax.to(this.getDOMNode(), 0.5, {
			y: -250
		});
		TweenMax.to(this.refs.avatar.getDOMNode(), 0.5, {
			x: -5,
			y: 5,
			width: 40
		});
		TweenMax.fromTo(this.refs.header.getDOMNode(), 0.5, {
			marginBottom: 8,
			fontSize: 32,
			lineHeight: 1
		}, {
			marginBottom: 0,
			fontSize: 24,
			lineHeight: '50px'
		});
		TweenMax.fromTo(this.refs.header.getDOMNode().parentNode, 0.5, {
			bottom: 10,
			left: 160
		}, {
			bottom: 0,
			left: 50
		});
	},
	onCloseArticle: function() {
		TweenMax.fromTo(["followBtn", "postBtn", "cameraIcon", "cameraIcon2", "tagline"].map((f)=>this.refs[f].getDOMNode()), 0.3, {
			opacity: 0,
			display: 'block'
		}, {
			opacity: 1
		});
		TweenMax.to(this.getDOMNode(), 0.5, {
			y: 0
		});
		TweenMax.to(this.refs.avatar.getDOMNode(), 0.5, {
			x: 0,
			y: 0,
			width: 130
		});
		TweenMax.fromTo(this.refs.header.getDOMNode().parentNode, 0.5, {
			bottom: 0,
			left: 50
		}, {
			bottom: 10,
			left: 160
		});
		TweenMax.fromTo(this.refs.header.getDOMNode(), 0.5, {
			marginBottom: 0,
			fontSize: 24
		}, {
			marginBottom: 8,
			fontSize: 32
		});
	},
	render: function() {
		return (
			<div className="channel__heading">
				<div className="channel__heading__background" style={{backgroundImage: "url(https://s-dev.s3.amazonaws.com/2a93d8c0-0e90-11e5-8808-d9460802cea5.jpeg)"}}/>
				<div ref="avatar" className="channel__heading__avatar" style={{position: "absolute", left: 10, bottom: 10, backgroundImage: "url(https://s-dev.s3.amazonaws.com/35771a80-0e87-11e5-b9ef-11a31e92fdd5.jpeg)"}}>
					<i ref="cameraIcon" className="icon icon-camera pointer" style={{fontSize: "1em", position: "absolute", bottom: 5, right:5}}/>
				</div>
				<div style={{position: "absolute", right: 0, bottom: 0}}>
					<button className="btn btn-1 btn-1a" ref="followBtn" onClick={()=>this.setState({follow: !this.state.follow})}>{this.state.follow? 'Following': 'Follow'}</button>
					<button className="btn btn-1 btn-1a" ref="postBtn">
					New Post</button>
				</div>
				<div style={{position:"absolute", left: 160, bottom: 10}}>
					<h1 style={{marginBottom: 8, fontSize: 32}} ref="header">
						KodomoClub
					</h1>
					<span ref="tagline">
						Baby Goods
					</span>
				</div>
				<i ref="cameraIcon2" className="icon icon-camera pointer" style={{fontSize: "1.5em", position: "absolute", top: 5, right: 5}}/>
			</div>
		);
	}
});
var ItemList = React.createClass({
	componentDidMount: function() {
		var perspY = window.scrollY + window.innerHeight / 2;
		var perspectiveOrigin = '50% ' + perspY + 'px';
		TweenMax.set(this.getDOMNode(), {
			perspectiveOrigin: perspectiveOrigin
		});
	},
	onOpenArticle: function() {
		TweenMax.to(this.getDOMNode(), 0.5, {
			y: -250
		});
	},
	onCloseArticle: function() {
		
	},
	handleClickItem: function(e) {
		this.props.handleClickItem();
		this.refs['item-' + $(e.currentTarget).data('index')].onOpenArticle();
	},
	render: function() {
		return (
			<div className="channel__item-list channel__max-width-container">
				<Item data-index="0" ref="item-0" onClick={this.handleClickItem}/>
				<Item data-index="1" ref="item-1" onClick={this.handleClickItem}/>
			</div>
		);
	}
});

var MockContainer = React.createClass({
	getInitialState: function() {
		return {showArticle: false};
	},
	handleClickClose: function() {		
		var heading = this.refs.heading;
		var article = this.refs.article;
		[heading, article].forEach(c=>c.onCloseArticle());
		setTimeout(()=> {
			this.setState({
				showArticle: false
			});
		}, 1001);
	},
	handleClickItem: function(e) {
		var heading = this.refs.heading;
		var itemList = this.refs.itemList;
		heading.onOpenArticle();
		itemList.onOpenArticle();
		setTimeout(()=> {
			this.setState({
				showArticle: true
			});
		}, 1001);
	},
	render: function() {
		return (
			<div className="channel">
				<Heading ref="heading"/>
				{this.state.showArticle? <Article onClick={this.handleClickClose} ref="article"/>: <ItemList handleClickItem={this.handleClickItem} ref="itemList"/>}
			</div>
		);
	}
});

React.render(<MockContainer {...props} />, document.getElementById(DOM_APP_EL_ID));