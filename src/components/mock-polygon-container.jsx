var React = require('react');
var _ = require('underscore');
var classnames = require('classnames');
var Slider = React.createClass({
	render: function() {
		var arr = _.first(this.props.data, 5);
		return (
			<div className="m-hero__slider" style={{position: 'relative', zIndex: 0}}>
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
var MAX_WIDTH = 1100;
var Menubar = React.createClass({
	getInitialState: function() {
		return {
			showSubcategory: 'Gear'
		};
	},
	openMenuCategory: function(c) {
		this.setState({
			showSubcategory: c
		});
	},
	closeSubmenu: function() {
		this.setState({
			showSubcategory: false
		});
	},
	renderSubmenuItem: function(article, index) {
		var width = (MAX_WIDTH - 10)/6 ;
		return (
			<div className="submenu-item" style={{width: width}}>
				<div style={{backgroundPosition: 'center center', backgroundSize: 'cover', backgroundImage: 'url(' + article.thumbnail.src + ')', width: '100%', height: 100}}/>
				<p style={{fontSize: 12, lineHeight: '16px', maxHeight: 48, marginTop: 5, overflow: 'hidden'}}>{article.title}</p>
			</div>
		);
	},
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
		var submenuHeight = MAX_WIDTH/6;
		var submenuData = this.state.showSubcategory && _.first(this.props.data.filter((article)=>{
			return article.categories.indexOf(this.state.showSubcategory) >= 0;
		}), 6);
		return (
			<div style={{background: 'white', position: 'relative'}} className="polygon-menu" onMouseLeave={this.closeSubmenu}>
				<div style={{maxWidth: MAX_WIDTH, margin: 'auto', border: '1px solid #DDD', borderWidth: '0 1px', position: 'relative', boxSizing: 'content-box'}}>
					<img style={logo_style} src={LOGO_SRC}/>
					<div className="menu-container">
						{this.props.categories.map((c)=>{
							return <div onMouseEnter={this.openMenuCategory.bind(this, c)} className={classnames("menu-item", this.state.showSubcategory === c && 'active')}>{c}<i className="icon icon-bottom"/></div>
						})}
					</div>
					<div style={{clear: 'both'}}/>
				</div>
				{this.state.showSubcategory? (
					<div style={{padding: 5, boxShadow: '0px 10px 10px rgba(0,0,0,0.3)', position: 'absolute', background: '#eee', height: submenuHeight, width: '100%', maxWidth: MAX_WIDTH, left: window.innerWidth > MAX_WIDTH? (window.innerWidth - MAX_WIDTH)/2: 0, bottom: -submenuHeight, zIndex: 100, overflow: 'hidden'}}>
						{submenuData.map(this.renderSubmenuItem)}
						<div style={{clear: 'both'}}/>
					</div>
				): false}
			</div>
		);
	}
});
var MockContainer = React.createClass({
	render: function() {
		var data = this.props.data;
		var categories  = [];
		var featured = data.filter((d)=>{
			categories = categories.concat(d.categories);
			return d.featured;
		});
		categories = _.uniq(categories);
		return (
			<div>
				<Menubar categories={categories} data={data}/>
				<Slider data={featured}/>
			</div>
		);
	}
})
module.exports = MockContainer;