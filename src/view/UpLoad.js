import React, {Component} from 'react';
import ImageUploader from 'react-images-upload';
import Background from "./../assets/img/back.png";
class UpLoad extends Component{
	constructor(props) {
        super(props);
         this.state = { pictures: [] };
         this.onDrop = this.onDrop.bind(this);
    }
 
    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }
 
    render() {
        return (
        	<div>
	        	<div style ={{
	        		marginTop: '100px',
	        	}}>
	            <ImageUploader
	                withIcon={true}
	                buttonText='Chọn ảnh để tải lên'
	                onChange={this.onDrop}
	                imgExtension={['.jpg', '.gif', '.png', '.gif']}
	                maxFileSize={52428800}
	                withPreview={true}
	            />
	            </div>
            </div>
        );
    }
}

export default UpLoad;