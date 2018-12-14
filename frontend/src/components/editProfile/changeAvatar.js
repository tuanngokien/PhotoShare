import React from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import {NotificationContainer, NotificationManager} from 'react-notifications'

const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;
const PRESET = process.env.REACT_APP_PRESET;

export default class ChangeAvatarButton extends React.Component {
    componentDidMount() {
        document.getElementById("change-avatar-btn").addEventListener("click", function () {
            window.cloudinary.openUploadWidget({
                    cloud_name: CLOUD_NAME,
                    upload_preset: PRESET,
                    multiple: false,
                    cropping: true,
                    maxFiles: 1,
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
                        let uploadedPhoto = result.info.items.filter(photo => photo.done)[0];
                        let public_id = uploadedPhoto.uploadInfo.public_id;
                        axios.patch('/api/profile/avatar',
                            {
                                public_id
                            }, {
                                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                            })
                            .then(res => {
                                const user = res.data.user;
                                if (user) {
                                    localStorage.setItem("avatar", user.avatar);
                                    NotificationManager.success("Successfully changed avatar", "Profile changed", 500);
                                    setTimeout(() => {
                                        window.location.reload();
                                    }, 700)
                                }
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    }
                });
        });
    }

    render() {
        return (
            <div className={"change-avatar-container"}>
                <NotificationContainer/>
                <Button style={{textDecorationLine: 'none', color: 'black'}} id={"change-avatar-btn"}>
                    Change Avatar
                </Button>
            </div>
        )
    }
}
