var DOM_APP_EL_ID = 'app';
var React = require('react');
var SectionA = require('../components/section-2a');
var _ = require('underscore');
var ad = "/images/ad1.jpg";
var ad1 = 'http://touchedition.s3.amazonaws.com/asset/55420f2fe57b85e332bfdcab.jpg';
var ad2 = 'http://touchedition.s3.amazonaws.com/asset/5559d77d6526e2152c531adb.jpg';
var AdContainer = React.createClass({
	render: function() {
		return (
			<div style={{background: '#f0f0f0', margin: '40px 0'}}>
				<div style={{maxWidth: 1280, margin: 'auto'}}>
					<img src={this.props.src} style={{width: '100%', height: 'auto', margin: '10px 0'}}/>
				</div>
			</div>
		);
	}
});
var SumFeed = React.createClass({
	render: function() {
		return (
			<div style={{background: 'white', minHeight: '100%', paddingBottom: 0}}>
				<SectionA data={_.first(this.props.data, 100)} title="GM LIVE"/>
			</div>
		);
	}
});

var $ = require('jquery');
$.get('http://gmlive.com/api/ssslide').then((data) => {		
	React.render(<SumFeed data={data}/>, document.getElementById(DOM_APP_EL_ID)
	);
});