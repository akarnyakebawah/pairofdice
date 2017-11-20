import React, { Component } from 'react';
import DropNCrop from '@synapsestudios/react-drop-n-crop';
import Ionicons from 'react-ionicons';
import '@synapsestudios/react-drop-n-crop/lib/react-drop-n-crop.min.css';

class SetStateExample extends Component {
  state = {
    result: null,
    filename: null,
    filetype: null,
    src: null,
    error: null,
  };

  getCroppedImage() {
    return this.state.result;
  }

  onChange = value => {
    this.setState(value);
    console.log(this.state);
  };

  render() {
    return <DropNCrop
      onChange={this.onChange}
      canvasWidth={300}
      canvasHeight={300}
      maxFileSize={8389000}
      allowedFileTypes={['image/png']}
      value={this.state}
      cropperOptions={
        {
          autoCropArea: 1,
          cropBoxMovable:false,
          cropBoxResizable:false,
          dragMode:'move',
          toggleDragModeOnDblclick:false,
          viewMode:3,
          // Cropper.js options
          restore:false,
          aspectRatio:1,
          modal:true,
          center:true,
          guides:true,
        }
      }
    />
  };
}

export default SetStateExample;