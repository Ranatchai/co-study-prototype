// require("babel/register");
// var jsdom = require("jsdom").jsdom;
// var parentWindow = jsdom().parentWindow;
// global.$ = require('jquery')(parentWindow);
// global.window = parentWindow;
// global.document = parentWindow.document;
// global.navigator = parentWindow.navigator;
// global.location = parentWindow.location;
// global.XMLHttpRequest = parentWindow.XMLHttpRequest;
// global.window.hostSS = 'http://localhost:1337';
// global.window._serverRender = true;
// var Router = require('react-router');
// // var AppContainer = require("../../src/routers/container.jsx");
// var reactAsync = require('react-async');
// var Q = require('q');
// var React = require('react');
module.exports = {	
	index: function(req, res, next) {
    // serverRender(req, res, next);		
		res.view('app', {
			html: '',
			errors: req.flash('error')
    });
	}	
};

// function serverRender(req, res, next) {
// 	var now = Date.now();
// 	var routes = AppContainer.getRoutes();  
// 	var router = Router.create({
//     routes: routes,
//     location: req.url,
//     onAbort: function (redirect) {
//     	res.view('app', {
//         html: '',
//         errors: req.flash('error')
//       });
//     },
//     onError: next
//   });
//   router.run(function(Handler, state) {
//     window.user = req.user? req.user.toJSON(): false;
//     var handler = React.createElement(Handler, {params: state.params});
//     reactAsync.renderToStringAsync(handler, function(err, markup) {      
//       if(err) {
//         return next(err);
//       }
//     	res.view('app', {
//     		html: markup,
//   			errors: req.flash('error')
//       });
//     });
//   });
// }