import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

/**
 * PhotoCropper GG
 * How to use:
 * <PhotoEditor
 *   editorSize={300}
 *   exportSize={600}
 *   ref={(elem) => {this.editor = elem; }}
 *   image={this.state.photo}
 *   overlayImage={this.state.twibbon}
 *   zoom={1}
 * />
 * <input name="photo" type="file" onChange={e => this.handleFileChange(e, 'photo')}/>
 * <input name="twibbon" type="file" onChange={e => this.handleFileChange(e, 'twibbon')}/>
 * <input
 *  name="twibbon"
 *  type="button"
 *  onClick={() => this.editor.getImage().then(
 *    (value) => this.setState({result: value}))
 *  } />
 * <img src={ this.state.result } />
 */

class PhotoEditor extends Component {
  static propTypes = {
    // Styled Components props
    className: PropTypes.string,

    // both of images are in base64 encoded image
    image: PropTypes.string,
    overlayImage: PropTypes.string,

    zoom: PropTypes.number,

    // saved image size
    editorSize: PropTypes.number.isRequired,
    exportSize: PropTypes.number.isRequired,
  };

  static defaultProps = {
    className: null,
    overlayImage: '',
    zoom: 1,
    image: '',
  }

  constructor(props) {
    super(props);

    this.state = {
      x: 0,
      y: 0,
      showOverlay: true,
    };
  }

  getImage() {
    return new Promise((resolve) => {
      const context = this.canvas.getContext('2d');
      const img = new Image();
      img.src = this.props.image;

      img.onload = () => {
        const editorSize = this.props.editorSize;
        const exportSize = this.props.exportSize;

        const imageWidth = img.width;
        const imageHeight = img.height;

        const imageSize = Math.max(imageWidth, imageHeight);

        let scaledWidth = 0;
        let scaledHeight = 0;

        if (imageWidth > imageHeight) {
          scaledWidth = editorSize;
          scaledHeight = editorSize * imageHeight / imageWidth;
        } else {
          scaledWidth = editorSize * imageWidth / imageHeight;
          scaledHeight = editorSize;
        }

        const zoom = ((this.props.zoom) / 10) + 1;

        const transX = this.state.x - ((scaledWidth / 2) * (zoom - 1));
        const transY = this.state.y - ((scaledHeight / 2) * (zoom - 1));

        const ratio = imageSize / editorSize;
        const imageTransX = (transX * ratio) / zoom;
        const imageTransY = (transY * ratio) / zoom;

        context.drawImage(img,
          -imageTransX, -imageTransY, imageSize / zoom, imageSize / zoom,
          0, 0, exportSize, exportSize,
        );

        if (!this.props.overlayImage) {
          resolve(this.canvas.toDataURL());
          return;
        }
        const twibbon = new Image();
        twibbon.src = this.props.overlayImage;
        twibbon.onload = () => {
          context.drawImage(twibbon,
            0, 0, twibbon.width, twibbon.height,
            0, 0, exportSize, exportSize);
          resolve(this.canvas.toDataURL());
        };
      };
    });
  }

  captureSelect(e) {
    e.preventDefault();
    e.stopPropagation();

    this.dragging = true;
    this.startingX = e.screenX;
    this.startingY = e.screenY;

    this.originX = this.state.x;
    this.originY = this.state.y;
  }

  captureOnMove(e) {
    if (!this.dragging) return;

    this.setState({
      x: this.originX + (e.screenX - this.startingX),
      y: this.originY + (e.screenY - this.startingY),
    });
  }

  captureRelease() {
    this.dragging = false;
  }

  render() {
    const { image, overlayImage, editorSize, exportSize } = this.props;

    return (
      <div>
        <Container
          className={this.props.className}
          onMouseDown={e => this.captureSelect(e)}
          onMouseMove={e => this.captureOnMove(e)}
          onMouseUp={() => this.captureRelease()}
          onMouseLeave={() => this.captureRelease()}
          onScroll={() => this.scroll}
          size={editorSize}
        >
          {overlayImage &&
            <Overlay
              src={overlayImage}
              size={editorSize}
            />}
          <PictureBox
            src={image}
            size={editorSize}
            translateX={this.state.x}
            translateY={this.state.y}
            zoom={this.props.zoom}
          />
        </Container>
        <canvas
          ref={(elem) => { this.canvas = elem; }}
          height={exportSize}
          width={exportSize}
          hidden
        />
      </div>
    );
  }
}

const Container = styled.div`
  position: relative;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  cursor: grabbing;
  overflow: hidden;
  z-index: 3;
  user-select: none;
  canvas {
    display: none;
  }
`;

const PictureBox = styled.img`
  z-index: 1;
  max-width: ${props => props.size}px;
  max-height: ${props => props.size}px;
  transform: translateX(${props => props.translateX}px) translateY(${props => props.translateY}px) scale(${props => (props.zoom + 10) / 10});
`;

const Overlay = styled.img`
  z-index: 2;
  position: absolute;
  margin: auto;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
`;

export default PhotoEditor;
