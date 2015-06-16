var React = require('react');
var bank_data = ['/images/c-unionpay.jpg', '/images/c-scb.jpg', '/images/c-bangkok.jpg']
var ItemCard = React.createClass({
	render: function() {
		var cardStyle = {
			borderRadius: '5px',
			background: '#FFFFFF',
			boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.28)',
			width: '100%', 
			height: 158,
			position: 'relative',
			marginBottom: 10
		};
		var titleStyle = {
			fontFamily: 'SukhumvitSet-SemiBold',
			fontSize: '18px',
			color: '#494B4A',
			lineHeight: '28.5px'
		};
		var taglineStyle = {
			fontFamily: 'SukhumvitSet-Light',
			fontSize: '10.5px',
			color: '#9B9B9B',
			lineHeight: '16.5px'
		};
		var logoStyle = {
			borderRadius: '5px',
			boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.29)',
			width: 64,
			position: 'absolute',
			bottom: 12.5,
			left: 12.5
		};
		var queueNumberStyle = {
			borderRadius: '5px',
			background: '#F5A623',
			boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.29)',
			position: 'absolute', 
			bottom: 0, 
			right: 0,
			width: 185/2,
			height: 118/2,
			fontFamily: 'Helvetica',
			fontSize: '32px',
			color: '#FFFFFF',
			lineHeight: 118/2 + 'px',
			textAlign: 'center'
		};
		return (
			<div style={cardStyle}>
				<div style={{position: 'relative', width: '100%', height: 109, backgroundSize: 'cover', backgroundImage: 'url(' + this.props.background + ')'}}>
				</div>
				<div style={{marginLeft: 100}}>
					<h3 style={titleStyle}>{this.props.title}</h3>
					<div style={taglineStyle}>{this.props.tagline}</div>
				</div>
				<img src={this.props.thumbnail} style={logoStyle}/>
				<div style={queueNumberStyle}>
					{this.props.queue}
					<span style={{fontSize: 12, fontFamily: 'SukhumvitSet-SemiBold', marginLeft: 5}}>คิว</span>
				</div>
			</div>
		);
	}
});
var ItemList = React.createClass({
	render: function() {
		return (
			<div style={{padding: 12.5}}>
				{this.props.data.map((item)=><ItemCard {...item}/>)}
			</div>
		);
	}
});
var BankList = React.createClass({
	render: function() {
		var padding = 3;
		var itemSize = (this.props.width - 4 * padding)/3;		
		var logoStyle = {
			float: 'left',
			width: itemSize,
			marginRight: padding
		};
		return (
			<div style={{paddingLeft: padding}}>
				{bank_data.map((src)=><img style={logoStyle} src={src}/>)}
				<div style={{clear: 'both'}}/>
			</div>
		);
	}
});
var EateeniMock = React.createClass({
	render: function() {
		var width = 750/2;
		var height = 1334/2;
		return (
			<div style={{width: width, height: height, background: 'white', overflow: 'scroll', position: 'relative'}}>
				<div style={{position: 'fixed', top: 0, left: 0, width: width, background: 'white'}}>
					<img src="/images/topbar.jpg" style={{width: '100%', paddingLeft: 4, paddingTop: 4}}/>
					<div style={{height: 30, width: '100%', margin: '10px 0', position: 'relative'}}>
						<div style={{
							fontFamily: 'SukhumvitSet-Light',
							fontSize: '20px',
							color: '#222422',
							lineHeight: '31.5px',
							textAlign: 'center'
						}}>จองคิว</div>
						<img src="/images/user.png" height={25} style={{position: 'absolute', top: 0, left: 12}}/>
						<img src="/images/notification.png" height={25} style={{position: 'absolute', top: 0, right: 12}}/>
					</div>
					<img src="/images/menu-list.png" width="100%" style={{boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.2)'}}/>
				</div>
				<div style={{background: '#f8f8f8', marginTop: 100}}>
					<BankList width={width} height={height}/>
					<ItemList width={width} height={height} data={this.props.data}/>
				</div>
			</div>
		);
	}
});

module.exports = EateeniMock;