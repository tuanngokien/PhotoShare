import React, {Component} from 'react';
import ImageUploader from 'react-images-upload';
import Grid from '@material-ui/core/Grid';
import axios from "axios";
import * as IpConfig from "../ipConfig/IpConfig";


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
                if (!error && result.event === "show-completed") {
                    let uploadedPhoto = result.info.items.filter(photo => photo.done);
                    let photos = uploadedPhoto.map(photo => {
                        let {public_id : publicId, width, height} = photo.uploadInfo;
                        return {publicId, width, height};
                    });
                    axios.post(IpConfig.URL + '/api/posts',
                        {
                            photos
                        }, {
                            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                        })
                        .then(res => {
                            if(res.success){
                                alert("Uploaded");
                            }
                            //todo redirect
                        }).catch(err => {
                            console.log(err);
                    });
                }
            });
        let contentHeight = document.getElementById("main-content").clientHeight;
        document.getElementById("img-uploader").style.height = `${contentHeight}px`;
    }

    render() {
        return (
            <Grid container
              direction={"column"}
              justify={"center"}
              id={"img-uploader"}
              style={{
                paddingTop: '5%',
                paddingLeft: '12%',
                paddingRight: '12%'
              }}
            >
            </Grid>
        );
    }
}

export default Upload;