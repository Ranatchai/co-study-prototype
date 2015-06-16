var DOM_APP_EL_ID = "app";
var React = require('react');
var assign = require('react/lib/Object.assign');
var Loader = require("halogen/MoonLoader");
var React = require("react");

var EateeniMock = require('./eateeni-mock');
var data = [{
	title: 'On the table',
	tagline: 'Centaral World Floor 6',
	queue: 15,
	thumbnail: '/images/t-onthetable.jpg',
	background: '/images/bg-onthetable.jpg'
}, {
	title: 'Ootoya',
	tagline: 'Centaral World Floor 6',
	queue: 22,
	thumbnail: '/images/t-ootoya.jpg',
	background: '/images/bg-ootoya.jpg'
}, {
	title: 'Fuji',
	tagline: 'Centaral World Floor 6',
	queue: 15,
	thumbnail: '/images/t-fuji.jpg',
	background: '/images/bg-fuji.jpg'
}];

React.render(<EateeniMock data={data}/>, document.getElementById(DOM_APP_EL_ID));