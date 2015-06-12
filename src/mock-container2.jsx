var classnames = require("classnames");
var appendVendorPrefix = require("react-kit/appendVendorPrefix");
var React = require('react');
var Cover = React.createClass({
	getInitialState: function() {
		return {
			openUrl: null
		};
	},
	componentWillUpdate: function(nextProps, nextState) {
		if (nextProps.data !== this.props.data) {
			nextState.openUrl = null;
		}
	},
	handleClickRead: function(e) {
		e.preventDefault();
		var data = this.props.data;
		this.setState({
			openUrl: data.url
		});
	},
	render: function() {
		if (this.state.openUrl) {
			return <iframe style={{position: 'absolute', left: this.props.left, top: 0, height: '100%', width: window.innerWidth - this.props.left}} src={this.state.openUrl} border="0"/>
		}
		var data = this.props.data;
		return (
			<div className="cover" style={{position: 'absolute', left: this.props.left, top: 0, height: '100%', right: 0, backgroundImage: 'url(' + data.src + ')', backgroundSize: 'cover', backgroundPosition: 'center center'}}>
				<div className="channel__heading__background" style={{height: '50%', top: 'auto', bottom: 0}}/>
				<div className="content" style={{position: 'absolute', right: 20, bottom: 80, width: '50%', color: 'white'}}>
					<h1>{data.title}</h1>
					<p>{data.description}</p>
				</div>
				<a href={data.url} className="btn btn-1 btn-1a" style={{position: 'absolute', right: 20, bottom: 20}} onClick={this.handleClickRead}>อ่านต่อ..</a>
			</div>
		);
	}
});
var _ = require('lodash');
var Sidebar = React.createClass({
	handleClickItem: function(item) {
		this.props.handleClickItem(item);
	},
	renderItemList: function() {
		return (
			<div className="list" style={{fontSize: 14}}>
				{this.props.data.map(function(item, index) {
					return (
						<div onClick={this.handleClickItem.bind(this, item)} className={classnames("item", this.props.activeIndex === index && 'active')}>
							<div className="thumbnail" style={{position: 'absolute', left: 0, top: 10, backgroundImage: 'url(' + item.src +')', width: 80, height: 80, backgroundSize: 'cover', backgroundPosition: 'center center'}}/>
							<div className="content" style={{marginLeft: (80 + 10), overflow: 'hidden', paddingLeft: 0}}>
								<h3>{item.title}</h3>
								<p style={{whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden'}}>{item.description}</p>
							</div>
						</div>
					);
				}, this)}
			</div>
		);
	},
	render: function() {
		var menuItemStyle = {
			width: '100%',
			minHeight: 50,
			padding: '10px 0',
			textAlign: 'center',
			fontSize: 20,
			overflow: 'hidden',
			borderBottom: '1px solid rgba(0,0,0,0.4)',
			position: 'relative'
		};
		return (
			<div className="sidebar" style={{position: 'absolute', left: 0, top: 0, height: '100%', width: this.props.width, background: 'white', borderRight: '1px solid rgba(0,0,0,0.3)'}}>
				<img className="logo" src={this.props.logo} style={{maxWidth: this.props.width, padding: '10px 0'}}/>
				<div className="menu-item-container">
					<div style={menuItemStyle}>About</div>
					<div style={menuItemStyle}>
						<div className="header">Categories</div>
						<div className="content" style={{fontSize: 14, padding: '10px 0'}}>
							{this.props.categories.map(function(cat) {
								return <div style={{padding: '5px 0'}}>{cat}</div>;
							})}
						</div>
					</div>
					<div style={menuItemStyle}>
						<div className="header" style={{marginBottom: 20}}>Contents</div>
						<div className="content">{this.renderItemList()}</div>
					</div>
				</div>
			</div>
		);
	}
});

var MockContainer = React.createClass({
	getInitialState: function() {
		return {
			index: 0			
		};
	},
	handleClickItem: function(item) {
		var index = this.props.data.indexOf(item);
		this.setState({
			index: index
		});
	},
	render: function() {
		var sidebarWidth = 250;
		return (
			<div className="channel">				
				<Sidebar categories={this.props.categories} activeIndex={this.state.index} data={this.props.data} logo={this.props.logo} width={sidebarWidth} handleClickItem={this.handleClickItem}/>
				<Cover data={this.props.data[this.state.index]} left={sidebarWidth}/>
			</div>
		);
	}
});

module.exports = MockContainer;