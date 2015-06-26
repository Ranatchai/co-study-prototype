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
var MockContainer = React.createClass({
	render: function() {
		var data = this.props.data;
		var uniq_cats = [];
		var featured_in_unique_categories = data.filter((d)=>{
			if (!d.featured) return false;
			if (uniq_cats.indexOf(d.categories[0]) >= 0) {
				return false;
			}
			uniq_cats.push(d.categories[0]);
			return d.featured;
		});
		return (
			<Slider data={featured_in_unique_categories}/>
		);
	}
})
module.exports = MockContainer;