import React, { Component, useState } from 'react';
import ImageGallery from 'react-image-gallery';
import "../../node_modules/react-image-gallery/styles/scss/image-gallery.scss";
import "../../node_modules/react-image-gallery/styles/css/image-gallery.css";
//import "react-image-gallery/styles/css/image-gallery.css";
import videoWelcome from './welcome.mp4';
import one from './1.jpg';
import two from './2.jpg';
import three from './3.jpg';
import four from './4.jpg';
import five from './5.jpg';
import six from './6.jpg';
import qrlogo from './qrlogo.png';
import seven from './7.jpg';
import eight from './8.jpg';
import nine from './9.jpg';
import ten from './10.jpg';
import eleven from './11.jpg';


export default class VideoSlider extends React.Component {
 
  render() {
 
    const images = [
        {
            original: two,
            thumbnail: qrlogo,
        },
        {
          original: one,
          thumbnail: qrlogo,
        },
        {
          original: three,
          thumbnail: qrlogo,
        },
        {
            original: four,
            thumbnail: qrlogo,
        },
        {
            original: five,
            thumbnail: qrlogo,
        },
        {
            original: six,
            thumbnail: qrlogo,
        }
      ]
 
    return (
      <ImageGallery items={images} />
    );
  }
 
}