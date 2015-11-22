'use strict';
var React = require('react');
var isTouchDevice = require('../common/touch-util').isTouchDevice;
var Touchable = React.createClass({
	getDefaultProps: function() {
		return {
			threshold: 5,
			component: React.createFactory('a'),
			preventDefault: true
		};
	},
	handleTouchStart: function(e) {
		if (this.props.preventDefault) {
			e.preventDefault();
		}
		if (this.props.handleTouchStart) {
			this.props.handleTouchStart(e);
		}
		if (e.isPropagationStopped()) {
			return;
		}
		this._start = [e.touches[0].pageX, e.touches[0].pageY];
    this._move = false;
    this._isDrag = false;
	},
	handleTouchMove: function(e) {
		if (this.props.preventDefault) {
			e.preventDefault();
		}
		if (this.props.handleTouchMove) {
			this.props.handleTouchMove(e);
		}
    if (this._isDrag || !this._start || e.isPropagationStopped()) {
      return;
    }
		this._move = [e.touches[0].pageX, e.touches[0].pageY];
    var delta = Math.sqrt(Math.pow(this._move[0] - this._start[0], 2) + Math.pow(this._move[1] - this._start[1], 2));
    if (delta > this.props.threshold) {
    	this._isDrag = true;
    }
	},
	handleTouchEnd: function(e) {
		if (this.props.preventDefault) {
			e.preventDefault();
		}
		if (this.props.handleTouchEnd) {
			this.props.handleTouchEnd(e);
		}
		if (e.isPropagationStopped()) {
			return;
		}
		if (!this._isDrag) {
			if (this.props.handleAction) {
		 		this.props.handleAction(e);
			}
		}
	},
	render: function() {
		var { style, children, component, ...other } = this.props;
		var options = {
			style: _.extend({textDecoration: 'none'}, style)			
		};
		if (isTouchDevice) {
			options.onTouchStart = this.handleTouchStart;
			options.onTouchMove = this.handleTouchMove;
			options.onTouchEnd = this.handleTouchEnd;
		} else {
			options.onClick = this.props.handleAction;
		}
		return component(_.extend(other, options), children);
	}
});

module.exports = Touchable;