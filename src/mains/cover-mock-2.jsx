var DOM_APP_EL_ID = "app";
var React = require('react');
var CoverContainer = require('../components/cover-container-2');
var $ = require('jquery');
$.get('http://gmlive.com/api/ssslide').then((data) => {		
	React.render(<CoverContainer data={data}/>, document.getElementById(DOM_APP_EL_ID));
});