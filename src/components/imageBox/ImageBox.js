import React from 'react';
import Lightbox from 'react-images';
import Button from '@material-ui/core/Button';
import IMG from '../../assets/img/IMG_3958.JPG';

const images=[
{ src: 'http://placekitten.com/1500/500' },
{ src: 'http://placekitten.com/1500/501' },
{ src: 'http://www.apicius.es/wp-content/uploads/2012/07/IMG-20120714-009211.jpg'},
{ src: require('../../assets/img/IMG_3958.JPG')}
]
export default class ImageBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lightboxIsOpen: false,
      currentImage: this.props.currentImage,
    };
    this.openLightbox = this.openLightbox.bind(this);
    this.closeLightbox = this.closeLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
//    this.thumbnail = this.thumbnail.bind(this);
  }
  openLightbox(){
    this.setState({
      lightboxIsOpen: true,
      currentImage: 0,
    });
  }
  closeLightbox(){
    this.setState({lightboxIsOpen: false});
  }
  gotoPrevious () {
    if (this.props.currentImageWillChange) {
        this.props.currentImageWillChange.call(this, this.state.currentImage - 1);
    }
    this.setState({
        currentImage: this.state.currentImage - 1
    });
  }
  gotoNext () {
    if (this.props.currentImageWillChange) {
        this.props.currentImageWillChange.call(this, this.state.currentImage + 1);
    }
    this.setState({
        currentImage: this.state.currentImage + 1
    });
  }
  // thumbnail = (e, obj) => {
  //   console.log(obj.index);
  // }
  render() {
    return (
      <div>
        <Lightbox
          images = {images}
          isOpen={this.props.isOpen}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          onClose={this.props.isClose}
          showThumbnails = {true}
          currentImage = {this.state.currentImage}
        />
      </div>
    );
  }
}
