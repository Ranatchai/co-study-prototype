var DOM_APP_EL_ID = "app";
var React = require('react');

var $ = require('jquery');
var SumFeed = require('../components/sum-feed');
$.get('http://gmlive.com/api/ssslide').then((data) => {		
	React.render(<SumFeed data={data}/>, document.getElementById(DOM_APP_EL_ID)
	);
});