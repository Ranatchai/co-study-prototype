var DOM_APP_EL_ID = "app";
var React = require('react');
var CoverContainer = require('../components/cover-container');
var data = {
	title: 'BMW Motorrad’s Path 22 Concept',
	tagline: 'พาหนะสองล้อที่พร้อมลุยกับคุณไปทุกที่',
	thumbnail: {src: '/images/cover-1.jpg'}
};
React.render(<CoverContainer {...data}/>, document.getElementById(DOM_APP_EL_ID));