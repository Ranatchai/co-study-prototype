var DOM_APP_EL_ID = "app";
var React = require('react');
var MockContainer = require('./mock-polygon-container');
var _ = require('underscore');
var $ = require('jquery');
$.get('http://gmlive.com/api/ssslide').then((data) => {	
	var categories = [];
	var features = data.filter((d)=>{
		categories = categories.concat(d.categories);
		return d.featured;
	});
	categories = _.uniq(categories);
	React.render(<MockContainer data={features} categories={categories}/>, document.getElementById(DOM_APP_EL_ID));
});