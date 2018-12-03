import React from 'react';
import Lightbox from 'react-images';
import Button from '@material-ui/core/Button';
import IMG from '../../assets/img/IMG_3958.JPG';

export default class ImageBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lightboxIsOpen: this.props.isOpen,
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
      lightboxIsOpen: this.props.isOpen,
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
  
  render() {
    return (
      <div>
        <Lightbox
          images = {this.props.images}
          isOpen={this.props.isOpen}
          onClickPrev={this.props.gotoPrevious}
          onClickNext={this.props.gotoNext}
          onClose={this.props.isClose}
          showThumbnails = {true}
          currentImage = {this.props.currentImage}
        />
      </div>
    );
  }
}
