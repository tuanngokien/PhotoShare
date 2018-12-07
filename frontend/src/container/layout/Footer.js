import React, {Component} from 'react';
import {FaFacebook, FaTwitter, FaInstagram} from 'react-icons/fa';
import {MdCopyright} from "react-icons/md";

export default class Footer extends Component {
    render() {
        return (
            <div className={"footer"}>
                <div>
                    <MdCopyright/>
                    <span style={{marginLeft: "0.2em", fontWeight: "600"}}>PHOTOSHARE 2018</span>
                </div>
                <div>
                    <a href={"https://www.facebook.com/"}><FaFacebook/></a>
                    <a href={"https://instagram.com"}><FaInstagram/></a>
                    <a href={"https://twitter.com/"}><FaTwitter/></a>
                </div>
            </div>
        )
    }
}