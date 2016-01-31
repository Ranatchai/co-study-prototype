'use strict';
var React = require('react');
var AvatarEditor = require('react-avatar-editor');
var Modal = require('boron/DropModal');
var Editor = React.createClass({
	propTypes: {
		src: React.PropTypes.string.required
	},
	getDefaultProps() {
		return {
			// src: 'http://c1.staticflickr.com/3/2933/14578299515_b54179682f_h.jpg',
			size: {width: 200, height: 200},
			circle: true,
			onChange: ()=>{}
		};
	},
	getInitialState() {
		return {scale: 1};
	},
	handleScale() {
		var scale = parseFloat(this.refs.scale.value);
    this.setState({scale: scale})
	},
	onComplete() {
		var img = this.refs.avatar.getImage();
    var rect = this.refs.avatar.getCroppingRect();
    this.props.onComplete(img, rect);
    // window.open(img);
    // console.log('img', img, rect);
    // this.setState({preview: img, croppingRect: rect});
	},
	render() {
		var {size, circle, src} = this.props;
		var {width, height} = size;
		console.log('src', src);
		return (
			<div>
				<AvatarEditor
					ref="avatar"
					image={src}
					width={width}
					height={height}
					scale={this.state.scale}
					borderRadius={circle? width/2: 0}
				/>
				<div>
					<input name="scale" type="range" ref="scale" onChange={this.handleScale} min="1" max="2" step="0.01" defaultValue="1" />
				</div>
				<div>
					<button onClick={this.onComplete}>OK</button>
				</div>
			</div>
		);
	}
});

var ImageForm = React.createClass({
	getInitialState() {
		return {startSrc: null};
	},
	handleCrop(src) {
		this.refs.modal.hide();
		this.setState({result: src});
	},
	handleChangeImage(e) {
		var file = e.target.files[0];
		var reader = new FileReader();
		reader.addEventListener('loadend', (e)=>{
      this.setState({startSrc: e.target.result}, ()=>{
				this.refs.modal.show();
      });
		}, false);
		reader.readAsDataURL(file);
	},
	render() {
		var {startSrc, result} = this.state;
		return (
			<div>
				<input type="file" onChange={this.handleChangeImage}/>
				{result && <img src={result}/>}				
				{<Modal ref="modal"><Editor src={startSrc} onComplete={this.handleCrop}/></Modal>}
			</div>
		);
	}
});
module.exports = ImageForm;