var React = require('react');
var Section2Card = React.createClass({
	render: function() {
		return (
			<div style={{width: 330, height: 400, overflow: 'hidden', float: 'left', marginLeft: (this.props.index%3) === 0? 0: 35}}>
				<p style={{textTransform: 'uppercase', fontSize: 11, lineHeight: '25px'}}>{this.props.categories.map(c=><span><a style={{color: '#27abe1', borderBottom: '2px solid #27abe1', paddingBottom: 5}} href={"/category/" + c}>{c}</a></span>)}</p>
				<div style={_.extend({width: '100%', height: 187}, BackgroundUtil.getBackgroundProps(this.props, 330, 187))}/>
				<h6 style={{fontFamily: 'ThaiSansNeue', fontWeight: 'bold', fontSize: 28, margin: '10px 0 5px'}}>{this.props.title}</h6>
				<p style={{marginBottom: 10, color: 'rgb(102, 102, 102)', fontSize: 12}}>By <a style={{color: '#27abe1', fontWeight: 'bold'}}>{this.props.user.fullname}</a> on {moment(this.props.publishedDate).format('MMM DD, YYYY')}</p>
				<p style={{fontFamily: 'ThaiSansNeue', fontSize: 18, lineHeight: 1}}>{this.props.description}</p>
			</div>
		);
	}
});
var Section2 = React.createClass({
	render: function() {
		var titleStyle = {
		  textTransform: 'uppercase',
		  fontWeight: 100,
		  fontStyle: 'normal',
		  fontSize: '24px',
		  color: '#27abe1',
		  padding: '10px 0',
		  margin: '30px 0',
		  borderBottom: '1px solid #ddd'
		};
		return (
			<div style={{maxWidth: 1060, margin: '20px auto'}}>
				<h5 style={titleStyle}>{this.props.title}</h5>
				{this.props.data.map((d, index)=><Section2Card index={index} {...d}/>)}
				<div style={{clear: 'both'}}/>
			</div>
		);
	}
});

module.exports = Section2;