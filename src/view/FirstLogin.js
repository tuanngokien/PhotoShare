import React, {Component} from 'react';
import Button from "@material-ui/core/Button";
import Background from "./../assets/img/back.png";

class FirstLogin extends Component{
	login = () => {
		window.location.replace("#/form")
	}
	render(){
		return(
			<div style = {{backgroundImage: `url(${Background})`, width: '100%', height:'100%' }}>
						<div style={{
						color:'white',
						textAlign:'center',
						fontSize:'80px',
						}}>Find your inspiration.</div>
					<Button style = {{
						backgroundColor: 'white',
						width:'15%',
						height:'12%',
						fontSize:'40px',
          	marginLeft: '43%',
          	marginTop:'15%',
          	}} onClick={this.login}>
            Sign in
          </Button>
			</div>
		);
	}
}
export default FirstLogin;
