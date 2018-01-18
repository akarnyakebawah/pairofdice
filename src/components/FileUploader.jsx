import React, { Component } from 'react';
import DropNCrop from '@synapsestudios/react-drop-n-crop';
import Dropzone from 'react-dropzone'
import Ionicons from 'react-ionicons';
import '@synapsestudios/react-drop-n-crop/lib/react-drop-n-crop.min.css';

class SetStateExample extends Component {
  state = {
    files: null,
    result: null,
    filename: null,
    filetype: null,
    src: null,
    error: null,
  };

  onDrop = (value) => {
    this.setState({value});
  };

  onDropRejected = (value) => {
    //TODO
  };

  getCroppedImage () {
    return new Promise((resolve) => {
      resolve(); //TODO resolve(this.state.result);
    });
  };

  render() {
    return (
      <Dropzone
        style={} //TODO: width sm height ={Math.min(300, 0.8 * window.innerWidth)}
        onDrop={ this.onDrop }
        accept="image/png"
        multiple={ false }
        onDropRejected={ this.onDropRejected }
      >
        Drag a file or click to upload.
      </Dropzone>

      // <DropNCrop
      //   onChange={this.onChange}
      //   canvasWidth={Math.min(300, 0.8 * window.innerWidth)}
      //   canvasHeight={Math.min(300, 0.8 * window.innerWidth)}
      //   maxFileSize={8000000}
      //   allowedFileTypes={['image/png']}
      //   value={this.state}
      //   cropperOptions={{
      //     autoCropArea: 1,
      //     cropBoxMovable: false,
      //     cropBoxResizable: false,
      //     dragMode: 'move',
      //     toggleDragModeOnDblclick: false,
      //     viewMode: 3,
      //     // Cropper.js options
      //     restore: false,
      //     aspectRatio: 1,
      //     modal: true,
      //     center: true,
      //     guides: true,
      //   }}
      // />
    );
  }
}

export default SetStateExample;
