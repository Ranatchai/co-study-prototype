/* jshint ignore:start */
/**
 * The CSSTransitionGroup component uses the 'transitionend' event, which
 * browsers will not send for any number of reasons, including the
 * transitioning node not being painted or in an unfocused tab.
 *
 * This TimeoutTransitionGroup instead uses a user-defined timeout to determine
 * when it is a good time to remove the component. Currently there is only one
 * timeout specified, but in the future it would be nice to be able to specify
 * separate timeouts for enter and leave, in case the timeouts for those
 * animations differ. Even nicer would be some sort of inspection of the CSS to
 * automatically determine the duration of the animation or transition.
 *
 * This is adapted from Facebook's CSSTransitionGroup which is in the React
 * addons and under the Apache 2.0 License.
 *
 * @jsx React.DOM
 */

// TODO(zach): convert to CSSCore

var React = require('react');
var ReactTransitionGroup = require('react/lib/ReactTransitionGroup');

var TICK = 17;

/**
 * EVENT_NAME_MAP is used to determine which event fired when a
 * transition/animation ends, based on the style property used to
 * define that event.
 */
var EVENT_NAME_MAP = {
    transitionend: {
        'transition': 'transitionend',
        'WebkitTransition': 'webkitTransitionEnd',
        'MozTransition': 'mozTransitionEnd',
        'OTransition': 'oTransitionEnd',
        'msTransition': 'MSTransitionEnd'
    },

    animationend: {
        'animation': 'animationend',
        'WebkitAnimation': 'webkitAnimationEnd',
        'MozAnimation': 'mozAnimationEnd',
        'OAnimation': 'oAnimationEnd',
        'msAnimation': 'MSAnimationEnd'
    }
};

var endEvents = [];

(function detectEvents() {
    var testEl = document.createElement('div');
    var style = testEl.style;

    // On some platforms, in particular some releases of Android 4.x, the
    // un-prefixed "animation" and "transition" properties are defined on the
    // style object but the events that fire will still be prefixed, so we need
    // to check if the un-prefixed events are useable, and if not remove them
    // from the map
    if (!('AnimationEvent' in window)) {
        delete EVENT_NAME_MAP.animationend.animation;
    }

    if (!('TransitionEvent' in window)) {
        delete EVENT_NAME_MAP.transitionend.transition;
    }

    for (var baseEventName in EVENT_NAME_MAP) {
        if (EVENT_NAME_MAP.hasOwnProperty(baseEventName)) {
            var baseEvents = EVENT_NAME_MAP[baseEventName];
            for (var styleName in baseEvents) {
                if (styleName in style) {
                    endEvents.push(baseEvents[styleName]);
                    break;
                }
            }

        }
    }
})();

function animationSupported() {
    return endEvents.length !== 0;
}
var $ = require('jquery');
var TimeoutTransitionGroupChild = React.createClass({
    transition: function(animationType, finishCallback) {
        var node = this.getDOMNode();
        var className = this.props.name + '-' + animationType;
        var activeClassName = className + '-active';

        var endListener = function() {
            $(node).removeClass(className);
            $(node).removeClass(activeClassName);

            // Usually this optional callback is used for informing an owner of
            // a leave animation and telling it to remove the child.
            finishCallback && finishCallback();
        };

        if (!animationSupported()) {
            endListener();
        } else {
            if (animationType === "enter") {
                this.animationTimeout = setTimeout(endListener,
                                                   this.props.enterTimeout);
            } else if (animationType === "leave") {
                this.animationTimeout = setTimeout(endListener,
                                                   this.props.leaveTimeout);
            }
        }

        $(node).addClass(className);

        // Need to do this to actually trigger a transition.
        this.queueClass(activeClassName);
    },

    queueClass: function(className) {
        this.classNameQueue.push(className);

        if (!this.timeout) {
            this.timeout = setTimeout(this.flushClassNameQueue, TICK);
        }
    },

    flushClassNameQueue: function() {
        if (this.isMounted()) {
            $(this.getDOMNode()).addClass(this.classNameQueue.join(" "));
        }
        this.classNameQueue.length = 0;
        this.timeout = null;
    },

    componentWillMount: function() {
        this.classNameQueue = [];
    },

    componentWillUnmount: function() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        if (this.animationTimeout) {
            clearTimeout(this.animationTimeout);
        }
    },

    componentWillEnter: function(done) {
        if (this.props.enter) {
            this.transition('enter', done);
        } else {
            done();
        }
    },

    componentWillLeave: function(done) {
        if (this.props.leave) {
            this.transition('leave', done);
        } else {
            done();
        }
    },

    render: function() {
        return React.Children.only(this.props.children);
    }
});

var TimeoutTransitionGroup = React.createClass({
    propTypes: {
        enterTimeout: React.PropTypes.number.isRequired,
        leaveTimeout: React.PropTypes.number.isRequired,
        transitionName: React.PropTypes.string.isRequired,
        transitionEnter: React.PropTypes.bool,
        transitionLeave: React.PropTypes.bool,
    },

    getDefaultProps: function() {
        return {
            transitionEnter: true,
            transitionLeave: true
        };
    },

    _wrapChild: function(child) {
        return React.createElement(TimeoutTransitionGroupChild, {
                enterTimeout: this.props.enterTimeout,
                leaveTimeout: this.props.leaveTimeout,
                name: this.props.transitionName,
                enter: this.props.transitionEnter,
                leave: this.props.transitionLeave
            },
            child
        );
    },

    render: function() {
        return (
            <ReactTransitionGroup {...this.props} childFactory={this._wrapChild}>
                {this.props.children}
            </ReactTransitionGroup>
        );
    }
});

module.exports = TimeoutTransitionGroup;
/* jshint ignore:end */