var DOM_APP_EL_ID = "app";
var React = require('react');
var MockContainer = require('./mock-polygon-container');
var $ = require('jquery');
$.get('http://gmlive.com/api/ssslide').then((data) => {	
	React.render(<MockContainer data={data.filter(d=>d.featured)}/>, document.getElementById(DOM_APP_EL_ID));
});