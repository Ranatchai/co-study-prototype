var React = require('react');
var CoverCategoryPreview = React.createClass({
	render: function() {
		return (
			<div style={{marginBottom: 30}}>
				<h5 style={{color: '#58C9F7', fontWeight: 'bold', fontSize: 18, marginBottom: 5}}>{this.props.categories[0]}</h5>
				<p style={{color: 'white', fontSize: 24}}>{this.props.title}</p>
			</div>
		);
	}
});
var CoverSection = React.createClass({
	getInitialState: function() {
		var size = this.getSizeState();
		return {
			width: size.width,
			height: size.height
		};
	},	
	componentDidMount: function() {
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
	render: function() {
		return (
			<div style={{width: this.state.width, height: this.state.height, backgroundPosition: 'center center', backgroundImage: 'url(/images/cover-desktop.jpg)', backgroundSize: 'cover'}}>
				<div style={{position: 'absolute', left: 40, bottom: 40}}>
					{this.props.data.map((d)=><CoverCategoryPreview {...d}/>)}
				</div>
				<img src={'/images/Logo_GMLive_for_profile_white.png'} style={{position: 'absolute', left: 20, top: 20, width: 120}}/>
			</div>
		);
	}
});
module.exports = CoverSection;