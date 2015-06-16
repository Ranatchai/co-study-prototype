var DOM_APP_EL_ID = "app";
var React = require('react');
var SectionA = require('./section-1');
var LatestSection = require('./latest-section');
// var data = [{
// 	title: 'David Beckham ที่สุดแห่งสไตล์ในรอบ 30 ปี!',
// 	description: 'เขาคือผู้ชายที่อำลาอาชีพนักฟุตบอลของตัวเองมาร่วมสามปี และเพิ่งจะมีอายุก้าวเข้าสู่เลข 4 ไปเมื่อไม่นานมานี้ ที่สำคัญ เขาเพิ่งจะสร้างสถิติใหม่ให้กับโล',
// 	author: 'HAN THONGHOON',
// 	src: '/images/p4.png'
// }, {
// 	title: 'David Beckham ที่สุดแห่งสไตล์ในรอบ 30 ปี!',
// 	description: 'เขาคือผู้ชายที่อำลาอาชีพนักฟุตบอลของตัวเองมาร่วมสามปี และเพิ่งจะมีอายุก้าวเข้าสู่เลข 4 ไปเมื่อไม่นานมานี้ ที่สำคัญ เขาเพิ่งจะสร้างสถิติใหม่ให้กับโล',
// 	author: 'HAN THONGHOON',
// 	src: '/images/p3.png'
// }, {
// 	title: 'David Beckham ที่สุดแห่งสไตล์ในรอบ 30 ปี!',
// 	description: 'เขาคือผู้ชายที่อำลาอาชีพนักฟุตบอลของตัวเองมาร่วมสามปี และเพิ่งจะมีอายุก้าวเข้าสู่เลข 4 ไปเมื่อไม่นานมานี้ ที่สำคัญ เขาเพิ่งจะสร้างสถิติใหม่ให้กับโล',
// 	author: 'HAN THONGHOON',
// 	src: '/images/p2.png'
// }, {
// 	title: 'David Beckham ที่สุดแห่งสไตล์ในรอบ 30 ปี!',
// 	description: 'เขาคือผู้ชายที่อำลาอาชีพนักฟุตบอลของตัวเองมาร่วมสามปี และเพิ่งจะมีอายุก้าวเข้าสู่เลข 4 ไปเมื่อไม่นานมานี้ ที่สำคัญ เขาเพิ่งจะสร้างสถิติใหม่ให้กับโล',
// 	author: 'HAN THONGHOON',
// 	src: '/images/p1.png'
// }];

var PolygonContainer = require('./mock-polygon-container');
var _ = require('underscore');
var $ = require('jquery');
var SumFeed = require('./sum-feed');
$.get('http://gmlive.com/api/ssslide').then((data) => {		
	React.render(<SumFeed data={data}/>, document.getElementById(DOM_APP_EL_ID)
	);
});