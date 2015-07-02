'use strict';
var AfterUpdateMixin = {
	componentWillMount: function() {
		this._afterUpdate = [];
	},
	componentWillUpdate: function(nextProps, nextState) {
		this._afterUpdate = [];
	},
	componentDidMount: function() {
		this._doAllAfterUpdate();
	},
	componentDidUpdate: function(prevProps, prevState) {
		this._doAllAfterUpdate();
	},
	_doAllAfterUpdate: function () {		
		for (var i = 0; i < this._afterUpdate.length; i++) {			
			if(typeof this._afterUpdate[i] === 'function'){
				this._afterUpdate[i]();
			}
		}
	},
	_addAfterUpdate: function (after) {
		this._afterUpdate.push(after);
	}
};
var UpdateViewMixin = {
	componentWillMount: function() {
		var throttleDelay = typeof this._throttleDelay === 'number'? this._throttleDelay: 100;
		if (this.props.throttleDelay > 0) {
			this.updateView = _.throttle(this._updateView, this.props.throttleDelay, {leading: false});
		} else {
			this.updateView = this._updateView;
		}
	},	
	_updateView: function(callback) {
		if (this.isMounted()) {
			if(typeof callback === 'function'){
				this.forceUpdate(callback);				
			}else{
				this.forceUpdate();
			}
		}
	}
};

var ListenToMixin = {
	componentWillMount: function() {
		this._listeningItems = [];
	},
	listenTo: function(eventBus, eventName, callback) {
		if (typeof eventBus.on === 'function') {
			eventBus.on(eventName, callback);
		} else {
			eventBus.addEventListener(eventName, callback);
		}
		this._listeningItems.push([eventBus, eventName, callback]);
	},
	stopListenTo: function(_eventBus) {
		this._listeningItems = this._listeningItems.filter(function(arr) {
			var eventBus = arr[0],
				eventName = arr[1],
				callback = arr[2];

			if (eventBus === _eventBus) {
				if (typeof eventBus.off === 'function') {
					eventBus.off(eventName, callback);
				} else {
					eventBus.removeEventListener(eventName, callback);
				}
			}
			return eventBus !== _eventBus;
		});
	},
	componentWillUnmount: function() {
		this._listeningItems.forEach(function(arr) {
			var eventBus = arr[0],
				eventName = arr[1],
				callback = arr[2];
			if (typeof eventBus.off === 'function') {
				eventBus.off(eventName, callback);
			} else {
				eventBus.removeEventListener(eventName, callback);
			}
		});
	}
};

var BackboneMixin = {
	mixins: [ListenToMixin, UpdateViewMixin],
	componentDidMount: function() {
		this.listenModels(this.props);
	},
	componentDidUpdate: function(prevProps, prevState) {
		if (prevProps.model !== this.props.model) {
			this.stopListenModels(prevProps);		
			this.listenModels(this.props);
		}
	},
	stopListenModels: function(props) {
		var listens = this.listens || {'model': 'change'};
		for (var key in listens) {
			var propNames = key.split('.'),
				model = props[propNames[0]];
			this.stopListenTo(model);
		}
	},
	listenModels: function(props) {
		var listens = this.listens || {'model': 'change'};
		var listenMethod, listenEvents;
		for (var key in listens) {
			var propNames = key.split('.'),
				model = props[propNames[0]];

			if (model) {
				this._bindEvent(model, propNames, listens[key]);
			}
		}
	},
	_bindEvent: function(model, propNames, listen) {
		for (var i = 1; i < propNames.length; i++) {
			var propName = propNames[i];
			if (model instanceof Backbone.Model) {
				model = model.get(propName);
			} else {
				for (var j = 0; j < model.length; j++) {
					this._bindEvent(model.at(j).get(propName), propNames.splice(i), listen);
				}
				return;
			}
		}
		var listenEvents, listenMethod;
		// custom update
		if (Array.isArray(listen)) {
			listenEvents = listen[0];
			listenMethod = listen[1];
		} else {
			listenEvents = listen;
			listenMethod = this.updateView;
		}
		this.listenTo(model, listenEvents, listenMethod);
	}
};
var WindowSizeMixin = {
	getInitialState: function() {
		var size = this.getSizeState();
		return {
			width: size.width,
			height: size.height
		};
	},
	componentDidMount: function() {
		window.addEventListener('resize', this.handleResize);
	},
	componentWillUnmount: function() {
		window.removeEventListener('resize', this.handleResize);
	},
	getSizeState: function() {
		var width = window.innerWidth;
		var height = window.innerHeight;
		return {
			width: width,
			height: height
		};
	}
}

module.exports = {
	ListenTo: ListenToMixin,
	Backbone: BackboneMixin,
	UpdateView: UpdateViewMixin,
	AfterUpdate: AfterUpdateMixin,
	WindowSizeMixin: WindowSizeMixin
};