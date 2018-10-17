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
      currentImage: 0
    };
    this.openLightbox = this.openLightbox.bind(this);
    this.closeLightbox = this.closeLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
  }
  openLightbox(){
    this.setState({lightboxIsOpen: true});
  }
  closeLightbox(){
    this.setState({lightboxIsOpen: false});
  }
  gotoNext(){
    this.setState({currentImage: this.state.currentImage + 1});
  }
  gotoPrevious(){
    this.setState({currentImage: this.state.currentImage - 1});
  }
  render() {
    return (
      <div>
        <Button onClick={this.openLightbox}>test</Button>
        <Lightbox
          images = {images}
          isOpen={this.state.lightboxIsOpen}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          onClose={this.closeLightbox}
          showThumbnails = 'true'
          currentImage = {this.state.currentImage}
        />
      </div>
    );
  }
}
