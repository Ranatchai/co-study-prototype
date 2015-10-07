var React = require('react');
var _ = require('underscore');
var Touchable = React.createClass({
	getDefaultProps: function() {
		return {
			threshold: 50
		};
	},
	handleTouchStart: function(e) {
		this._start = [e.touches[0].pageX, e.touches[0].pageY];
    this._move = false;
    this._isDrag = false;
	},
	handleTouchMove: function(e) {
    if (this._isDrag) {
      return;
    }
		this._move = [e.touches[0].pageX, e.touches[0].pageY];
    var delta = Math.sqrt(Math.pow(this._move[0] - this._start[0], 2) + Math.pow(this._move[1] - this._start[1], 2));
    if (delta > this.props.threshold) {
    	this._isDrag = true;
    }
	},
	handleTouchEnd: function(e) {
		if (!this._isDrag) {
			this.props.handleAction && this.props.handleAction();
		}
	},
	render: function() {
		var { style, ...other } = this.props;
		return <a href="#" style={_.extend({textDecoration: 'none'}, style)} {...other} onTouchStart={this.handleTouchStart} onTouchMove={this.handleTouchMove} onTouchEnd={this.handleTouchEnd}/>;
	}
});

module.exports = Touchable;