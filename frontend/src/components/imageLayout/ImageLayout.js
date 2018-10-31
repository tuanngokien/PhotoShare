import React from "react";
import Gallery from "react-photo-gallery";
import ImageBox from "../imageBox/ImageBox"
/* popout the browser and maximize to see more rows! -> */

const photos = [
    {
        src: "https://res.cloudinary.com/uetphotoshare/image/upload/v1540958607/photos/bybjlfecmfcamrz8zipu.jpg",
        width: 5472,
        height: 3648
    },
    {
        src: "https://source.unsplash.com/Dm-qxdynoEc/800x799",
        width: 1,
        height: 1
    },
    {
        src: "https://source.unsplash.com/qDkso9nvCg0/600x799",
        width: 3,
        height: 4
    },
    {
        src: "https://source.unsplash.com/iecJiKe_RNg/600x799",
        width: 3,
        height: 4
    },
    {
        src: "https://source.unsplash.com/epcsn8Ed8kY/600x799",
        width: 3,
        height: 4
    },
    {
        src: "https://source.unsplash.com/NQSWvyVRIJk/800x599",
        width: 4,
        height: 3
    },
    {
        src: "https://source.unsplash.com/zh7GEuORbUw/600x799",
        width: 3,
        height: 4
    },
    {
        src: "https://source.unsplash.com/PpOHJezOalU/800x599",
        width: 4,
        height: 3
    },
    {
        src: "https://source.unsplash.com/I1ASdgphUH4/800x599",
        width: 4,
        height: 3
    }
];	

export default class imageLayout extends React.Component {
	constructor(props){
	  super(props);

	  this.state = {
	    openImgBox: false,
	    currentImage: 0,
	    value: 0,
	}
  this.openImgBox = this.openImgBox.bind(this);
  this.closeImgBox = this.closeImgBox.bind(this);
  this.gotoPrevious = this.gotoPrevious.bind(this);
  this.gotoNext = this.gotoNext.bind(this);
  this.handleClick = this.handleClick.bind(this);
  }
  openImgBox () {
    this.setState({openImgBox: true});
  }
  closeImgBox () {
    this.setState({openImgBox: false});
  }
  gotoPrevious () {
    this.setState({
        currentImage: this.state.currentImage - 1
    });
  }
  gotoNext () {
    this.setState({
        currentImage: this.state.currentImage + 1
    });
  }
  handleClick(e, index){
  	this.setState({
  		openImgBox: true,
  		currentImage: index
  	})
  }
  render() {
      return (
      	<div>
         <Gallery columns={4} photos={photos} onClick={(e)=>this.handleClick(e,photos.index)}/>
         <ImageBox 
          isOpen={this.state.openImgBox}
          isClose={this.closeImgBox.bind(this)}
          gotoPrevious={this.gotoPrevious.bind(this)}
          gotoNext={this.gotoNext.bind(this)}
          currentImage={this.state.currentImage}
          images = {photos}
        />
        </div>
      )
  }
}
