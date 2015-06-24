var React = require('react');
var CoverContainer = require('./cover-container');

var Container = React.createClass({
	getInitialState: function() {
		return {data: null};
	},
	componentWillMount: function() {
		window.addEventListener('keydown', (e)=> {
			if (e.keyCode === 8 && this.state.data) {
				e.preventDefault();
				this.setState({data: null});
			}
		});
	},
	render: function() {
		if (!this.state.data) {
			var list_style = {
				padding: 10,
				display: 'block',
				borderBottom: '1px solid #ddd', 
				height: 60, 
				overflow: 'hidden'
			};
			return (
				<ul style={{background: 'white', maxWidth: 960, lineHeight: "40px"}}>
					<h2 style={{textAlign: 'center', borderBottom: '1px solid #ccc', color: 'white', background: 'black'}}>Select Article</h2>
					{this.props.data.map((d)=>{
						return (
							<a style={list_style} href="#" onClick={()=>this.setState({data: d})}>
								{false? <img width="40" height="40" src={d.thumbnail && d.thumbnail.src} style={{marginRight: 10}}/>: false}
								{d.title}
							</a>
						);
				})}
				</ul>
			);
		}
		return <CoverContainer {...this.state.data}/>
	}	
});

module.exports = Container;