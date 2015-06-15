var React = require('react');
var _ = require('underscore');
var MockContainer = React.createClass({
	render: function() {
		var arr = _.first(this.props.data, 5);
		var styles = [{
		  width: '33.3%',
		  height: 450,
		  float: 'left',
		  marginLeft: 0
		}, {
			borderWidth: '1px 0 0 1px'
		}, {

		}, {

		}, {

		}];
		return (
			<div className="m-hero__slider">
				{arr.map((item, index)=>{
					var url = "http://gmlive.com/post/" + item.shortenId + '-' + item.slug;
					return (
						<div className={"m-hero__entry entry_" + (index+1)} style={_.extend({}, styles[index], {backgroundImage: 'url(' + item.thumbnail.src + ')'})}>							
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
module.exports = MockContainer;