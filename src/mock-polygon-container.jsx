var React = require('react');
var _ = require('underscore');
var Slider = React.createClass({
	render: function() {
		var arr = _.first(this.props.data, 5);
		return (
			<div className="m-hero__slider">
				{arr.map((item, index)=>{
					var url = "http://gmlive.com/post/" + item.shortenId + '-' + item.slug;
					return (
						<div className={"m-hero__entry entry_" + (index+1)} style={{backgroundImage: 'url(' + item.thumbnail.src + ')'}}>
							<a className="m-hero__full-link" href={url}/>
							<div className={"m-hero__meta meta_" + (index+1)}>
								<div className="m-hero__header">
									<div className="m-hero__eyebrow">
									{item.categories.map(c=><a href={"http://gmlive.com/category/" + c}>{c}</a>)}
									</div>
								</div> 
								<div className="m-hero__title">
									<a href={url}>{item.title}</a>
								</div>
							</div>
						</div>);
				}, this)}
			</div>
		);
	}
});
var LOGO_SRC = 'http://touchedition.s3.amazonaws.com/asset/555edb0290a3d98a63e42aa0.png';
var Menubar = React.createClass({
	render: function() {
		var logo_style = {
		  maxWidth: 158,
		  padding: 12,
		  height: '50px',
		  lineHeight: '50px',
		  overflow: 'hidden',
		  textIndent: '-9999px',
		  display: 'block',
		  float: 'left',
		  position: 'relative',
		  marginRight: 20,
		};
		var item_style = {
		  float: 'left',
		  height: '50px',
		  lineHeight: '50px',
		  fontSize: 13,
		  fontFamily: 'Lato',
		  fontWeight: 100,
		  textTransform: 'uppercase',
		  padding: '2px 15px',
		  color: '#27abe1',		  
		};
		return (
			<div style={{background: 'white'}}>
				<div style={{maxWidth: 1100, margin: 'auto', border: '1px solid #DDD', borderWidth: '0 1px'}}>
					<img style={logo_style} src={LOGO_SRC}/>
					{this.props.categories.map((c)=><div className="menu-item" style={item_style}>{c}</div>)}
					<div style={{clear: 'both'}}/>
				</div>
			</div>
		);
	}
});
var MockContainer = React.createClass({
	render: function() {
		return (
			<div>
				<Slider data={this.props.data}/>
				<Menubar categories={this.props.categories}/>
			</div>
		);
	}
})
module.exports = MockContainer;