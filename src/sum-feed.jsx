var React = require('react');
var SectionA = require('./section-1');
var LatestSection = require('./latest-section');
var PolygonContainer = require('./mock-polygon-container');
var _ = require('underscore');

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
			if (index < 5) {
				data1.push(item);
			} else if (index < 15) {
				data2.push(item);
			} else if (index < 25) {
				data3.push(item);
			}
		});

		return (
			<div style={{background: 'white', minHeight: '100%', paddingBottom: 20}}>
				<PolygonContainer data={features} categories={categories}/>
				<LatestSection data={data1}/>
				<SectionA data={data2} title="JUST ARRIVE"/>
				<img src="/images/ad1.jpg" style={{width: '100%', height: 'auto'}}/>
				<SectionA data={data3} title="JUNE 19 - 21"/>
			</div>
		);
	}
});

module.exports = SumFeed;