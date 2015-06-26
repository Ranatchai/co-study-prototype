var React = require('react');
var _ = require('underscore');
var classnames = require('classnames');
var ReactCSSTransitionGroup = require('react/lib/ReactCSSTransitionGroup');
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
									<div className="posted_channels">
                    {item.categories.map(c=><span><a href={"/category/" + c}>{c}</a></span>)}
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
var MAX_WIDTH = window.innerWidth;
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
			// showSubcategory: false
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
		return 6;
	},
	renderSubmenuItem: function(article, index) {
		var width = (MAX_WIDTH - 10)/this.getMaxSubmenuItem() ;
		var url = "http://gmlive.com/post/" + article.shortenId + '-' + article.slug;
		return (
			<a href={url} className="submenu-item" style={{width: width}}>
				<div style={{backgroundPosition: 'center center', backgroundSize: 'cover', backgroundImage: 'url(' + article.thumbnail.src + ')', width: '100%', height: 128}}/>
				<p style={{fontSize: 16, lineHeight: '20px', maxHeight: 48, marginTop: 10, overflow: 'hidden'}}>{article.title}</p>
			</a>
		);
	},
	render: function() {
		var submenuHeight = 215;
		var submenuData = this.state.showSubcategory && _.first(this.props.data.filter((article)=>{
			return article.categories.indexOf(this.state.showSubcategory) >= 0;
		}), this.getMaxSubmenuItem());
		return (
			<div style={{background: 'white', position: 'relative'}} className="polygon-menu" onMouseLeave={this.closeSubmenu}>
				<div style={{maxWidth: MAX_WIDTH, margin: 'auto', borderBottom: '1px solid #DDD', borderWidth: '0 1px', position: 'relative', boxSizing: 'content-box'}}>
					<img className="logo" src={LOGO_SRC}/>
					<div className="menu-container">
						{this.props.categories.map((c)=>{
							return <a href={"http://gmlive.com/category/" + c} onMouseEnter={this.openMenuCategory.bind(this, c)} className={classnames("menu-item", this.state.showSubcategory === c && 'active')}>{c}<i className="icon icon-bottom"/></a>
						})}
					</div>
					<div style={{clear: 'both'}}/>
				</div>
				{this.state.showSubcategory? (
					<div key="category-submenu" style={{padding: 5,borderTop: '1px solid #f0f0f0', boxShadow: '0px 10px 10px rgba(0,0,0,0.3)', position: 'absolute', background: 'white', height: submenuHeight, width: '100%', maxWidth: MAX_WIDTH, left: window.innerWidth > MAX_WIDTH? (window.innerWidth - MAX_WIDTH)/2: 0, bottom: -submenuHeight, zIndex: 100, overflow: 'hidden'}}>
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
var MockContainer = React.createClass({
	render: function() {
		var data = this.props.data;
		var categories  = [];
		var uniq_cats = [];
		var featured_in_unique_categories = data.filter((d)=>{
			categories = categories.concat(d.categories);
			if (!d.featured) return false;
			if (uniq_cats.indexOf(d.categories[0]) >= 0) {
				return false;
			}
			uniq_cats.push(d.categories[0]);
			return d.featured;
		});
		categories = _.uniq(categories);
		return (
			<div>
				<Menubar categories={categories} data={data}/>
				<Slider data={featured_in_unique_categories}/>
			</div>
		);
	}
})
module.exports = MockContainer;