var React = require('react');
var LOGO_SRC = 'http://touchedition.s3.amazonaws.com/asset/555edb0290a3d98a63e42aa0.png';
var _ = require('underscore');
var classnames = require('classnames');
var MAX_WIDTH = window.innerWidth;
var Menubar = React.createClass({
	getInitialState: function() {
		return {
			showSubcategory: false
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
	getMaxSubmenuItem: function() {
		var width = window.innerWidth;
		if (width < 1100) {
			return 6;
		}
		if (width < 1300) {
			return 8;
		}
		return 10;
	},
	renderSubmenuItem: function(article, index) {
		var width = (MAX_WIDTH - 10)/this.getMaxSubmenuItem() ;
		var url = "http://gmlive.com/post/" + article.shortenId + '-' + article.slug;
		return (
			<a href={url} className="submenu-item" style={{width: width}}>
				<div style={{backgroundPosition: 'center center', backgroundSize: 'cover', backgroundImage: 'url(' + article.thumbnail.src + ')', width: '100%', height: 100}}/>
				<p style={{fontSize: 18, lineHeight: '16px', maxHeight: 48, marginTop: 5, overflow: 'hidden'}}>{article.title}</p>
			</a>
		);
	},
	render: function() {
		var categories  = [];
		this.props.data.forEach((d)=>{
			categories = categories.concat(d.categories);
		});
		categories = _.uniq(categories);


		var submenuHeight = 180;
		var submenuData = this.state.showSubcategory && _.first(this.props.data.filter((article)=>{
			return article.categories.indexOf(this.state.showSubcategory) >= 0;
		}), this.getMaxSubmenuItem());
		return (
			<div style={{background: 'white', position: 'relative'}} className="polygon-menu" onMouseLeave={this.closeSubmenu}>
				<div style={{maxWidth: MAX_WIDTH, margin: 'auto', border: '1px solid #DDD', borderWidth: '0 1px', position: 'relative', boxSizing: 'content-box'}}>
					<img className="logo" src={LOGO_SRC}/>
					<div className="menu-container">
						{categories.map((c)=>{
							return <a href={"http://gmlive.com/category/" + c} onMouseEnter={this.openMenuCategory.bind(this, c)} className={classnames("menu-item", this.state.showSubcategory === c && 'active')}>{c}<i className="icon icon-bottom"/></a>
						})}
					</div>
					<div style={{clear: 'both'}}/>
				</div>
				{this.state.showSubcategory? (
					<div key="category-submenu" style={{padding: 5, boxShadow: '0px 10px 10px rgba(0,0,0,0.3)', position: 'absolute', background: '#eee', height: submenuHeight, width: '100%', maxWidth: MAX_WIDTH, left: window.innerWidth > MAX_WIDTH? (window.innerWidth - MAX_WIDTH)/2: 0, bottom: -submenuHeight, zIndex: 100, overflow: 'hidden'}}>
						<div style={{width: '100%', background: 'white', height: '100%'}}>
							{submenuData.map(this.renderSubmenuItem)}
						</div>
						<div style={{clear: 'both'}}/>
					</div>
				): false}
			</div>
		);
	}
});
module.exports = Menubar;