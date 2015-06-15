var DOM_APP_EL_ID = "app";
var React = require('react');
var MockContainer = require('./section-1');
var data = [{
	title: 'David Beckham ที่สุดแห่งสไตล์ในรอบ 30 ปี!',
	description: 'เขาคือผู้ชายที่อำลาอาชีพนักฟุตบอลของตัวเองมาร่วมสามปี และเพิ่งจะมีอายุก้าวเข้าสู่เลข 4 ไปเมื่อไม่นานมานี้ ที่สำคัญ เขาเพิ่งจะสร้างสถิติใหม่ให้กับโล',
	author: 'HAN THONGHOON',
	src: '/images/p4.png'
}, {
	title: 'David Beckham ที่สุดแห่งสไตล์ในรอบ 30 ปี!',
	description: 'เขาคือผู้ชายที่อำลาอาชีพนักฟุตบอลของตัวเองมาร่วมสามปี และเพิ่งจะมีอายุก้าวเข้าสู่เลข 4 ไปเมื่อไม่นานมานี้ ที่สำคัญ เขาเพิ่งจะสร้างสถิติใหม่ให้กับโล',
	author: 'HAN THONGHOON',
	src: '/images/p3.png'
}, {
	title: 'David Beckham ที่สุดแห่งสไตล์ในรอบ 30 ปี!',
	description: 'เขาคือผู้ชายที่อำลาอาชีพนักฟุตบอลของตัวเองมาร่วมสามปี และเพิ่งจะมีอายุก้าวเข้าสู่เลข 4 ไปเมื่อไม่นานมานี้ ที่สำคัญ เขาเพิ่งจะสร้างสถิติใหม่ให้กับโล',
	author: 'HAN THONGHOON',
	src: '/images/p2.png'
}, {
	title: 'David Beckham ที่สุดแห่งสไตล์ในรอบ 30 ปี!',
	description: 'เขาคือผู้ชายที่อำลาอาชีพนักฟุตบอลของตัวเองมาร่วมสามปี และเพิ่งจะมีอายุก้าวเข้าสู่เลข 4 ไปเมื่อไม่นานมานี้ ที่สำคัญ เขาเพิ่งจะสร้างสถิติใหม่ให้กับโล',
	author: 'HAN THONGHOON',
	src: '/images/p1.png'
}];

React.render(<MockContainer data={data}/>, document.getElementById(DOM_APP_EL_ID));