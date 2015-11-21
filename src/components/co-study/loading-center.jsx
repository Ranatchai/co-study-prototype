'use strict';
var React = require('react');
var Loader = require('halogen/ClipLoader');
var LoadingCenter = React.createClass({
  render: function() {
    var defaultColor = 'white';
  	var style = {
  		position: 'absolute',
		  left: '50%',
		  top: '50%',
      transform: 'translate(-50%, -50%)'
  	};
    var Component = this.props.component || Loader;
    return (
      <span {...this.props} className="loader-container" style={style}>
        <Component color={this.props.color || (this.props.dark? "rgba(255, 255, 255, 0.9)": defaultColor)} size={this.props.size || "48px"} margin="4px"/>
      </span>
    );
  }
});
module.exports = LoadingCenter;