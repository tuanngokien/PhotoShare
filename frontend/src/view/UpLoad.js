import React, {Component} from 'react';
import ImageUploader from 'react-images-upload';
import Grid from '@material-ui/core/Grid';

class UpLoad extends Component {
    constructor(props) {
        super(props);
        this.state = {pictures: []};
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
                <div style={{
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

const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;
const PRESET = process.env.REACT_APP_PRESET;
const FOLDER = process.env.REACT_APP_FOLDER;

class Upload extends Component {
    componentDidMount() {
        window.cloudinary.openUploadWidget({
                cloud_name: CLOUD_NAME,
                upload_preset: PRESET,
                folder: FOLDER,
                clientAllowedFormats: ["png", "gif", "jpeg", "jpg"],
                cropping: true,
                inlineContainer: "#img-uploader",
                showCompletedButton: true,
                styles: {
                    palette: {
                        action: "#0078FF"
                    }
                },
                text: {
                    en: {
                        queue: {
                            "show_completed": "DONE ",
                        }
                    }
                }
            },
            function (error, result) {
                console.log(result);
            });
        let contentHeight = document.getElementById("main-content").clientHeight;
        document.getElementById("img-uploader").style.height = `${contentHeight}px`;
    }

    render() {
        return (
            <Grid container direction={"column"} justify={"center"} id={"img-uploader"}>
            </Grid>
        );
    }
}

export default Upload;