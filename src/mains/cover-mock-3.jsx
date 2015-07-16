var DOM_APP_EL_ID = "app";
var React = require('react');

var $ = require('jquery');
var PagingFeed = require('../components/paging-feed-container-2');
$.get('http://gmlive.com/api/ssslide').then((data) => {		
	React.render(<PagingFeed data={data}/>, document.getElementById(DOM_APP_EL_ID)
	);
});