import React, {Component} from 'react';
import  Button from "@material-ui/core/Button";
import Background from "./../assets/img/back.png";

export default class Firstlogin extends Component{
  	login = () => {
  		window.location.replace("#/login")
  	}
	render(){
		return(
			<div style = {{backgroundImage: `url(${Background})`, width: '100%', height:'100%' }}>
				<div>
						<p style={{
						color:'white',
						textAlign:'center',
						fontSize:'80px',
						}}>Find your inspiration.</p>
					<Button style = {{
						backgroundColor: 'white',
						width:'200px',
						height:'100px',
						fontSize:'40px',
                    	marginLeft: '40%',
                    	marginTop:'20%',
                    	}} onClick={this.login}> Sign in </Button>
				</div>
			</div>
		);
	}

}
