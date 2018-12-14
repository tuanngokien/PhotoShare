import React, {Component} from 'react';
import ImageUploader from 'react-images-upload';
import Grid from '@material-ui/core/Grid';
import axios from "axios";
import {NotificationContainer, NotificationManager} from 'react-notifications'
import 'react-notifications/dist/react-notifications.css'


const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;
const PRESET = process.env.REACT_APP_PRESET;
const FOLDER = process.env.REACT_APP_FOLDER;

class Upload extends Component {
    constructor() {
        super();
        this.state = {
            success: false,
        }
    }

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
                var com = this;
                if (!error && result.event === "show-completed") {
                    let uploadedPhoto = result.info.items.filter(photo => photo.done);
                    let photos = uploadedPhoto.map(photo => {
                        let {public_id: publicId, width, height} = photo.uploadInfo;
                        return {publicId, width, height};
                    });
                    axios.post('/api/posts',
                        {
                            photos
                        }, {
                            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                        })
                        .then(res => {
                            console.log(res);
                            if (res.data.success) {
                                const postId = res.data.post.id;
                                window.location.href = `#/pts/posts/${postId}`;
                            }
                        }).catch(err => {
                            console.log(err);
                        });
                }
            });
        let contentHeight = document.getElementById("main-content").clientHeight;
        let imgUploader = document.getElementById("img-uploader");
        if (contentHeight <= 700) {
            let header = document.getElementById("header");
            imgUploader.style.paddingTop = `${header.clientHeight + 10}px`;
        }
        imgUploader.style.height = `${contentHeight}px`;
    }

    render() {
        return (
            <Grid container
                  direction={"column"}
                  justify={"center"}
                  id={"img-uploader"}>
            </Grid>
        );
    }
}

export default Upload;