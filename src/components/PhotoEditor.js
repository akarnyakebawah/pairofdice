import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

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
    // zoom: PropTypes.number,
    disabled: PropTypes.bool,
    hidden: PropTypes.bool,

    // saved image size
    editorSize: PropTypes.number.isRequired,
    exportSize: PropTypes.number.isRequired
  };

  static defaultProps = {
    className: null,
    overlayImage: "",
    // zoom: 1,
    hidden: false,
    disabled: false,
    image: ""
  };

  constructor(props) {
    super(props);

    this.state = {
      x: 0,
      y: 0,
      showOverlay: true,
      dragging: false,
      zoom: 1
    };
  }

  onTouchStart(e) {
    if (this.props.disabled) return;
    e.preventDefault();
    e.stopPropagation();

    const touch = e.targetTouches[0];
    this.setState({ dragging: true });
    this.dragging = true;
    this.startingX = touch.screenX;
    this.startingY = touch.screenY;

    this.originX = this.state.x;
    this.originY = this.state.y;
  }

  onTouchMove(e) {
    this.captureOnMove(e.targetTouches[0]);
  }

  onTouchEnd() {
    this.captureRelease();
  }

  getImage() {
    return new Promise(resolve => {
      const context = this.canvas.getContext("2d");
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

        const zoom = this.state.zoom / 10 + 1;

        const transX = this.state.x - scaledWidth / 2 * (zoom - 1);
        const transY = this.state.y - scaledHeight / 2 * (zoom - 1);

        const ratio = imageSize / editorSize;
        const imageTransX = transX * ratio / zoom;
        const imageTransY = transY * ratio / zoom;

        context.drawImage(
          img,
          -imageTransX,
          -imageTransY,
          imageSize / zoom,
          imageSize / zoom,
          0,
          0,
          exportSize,
          exportSize
        );

        if (!this.props.overlayImage) {
          resolve(this.canvas.toDataURL());
          return;
        }
        const twibbon = new Image();
        twibbon.src = this.props.overlayImage;
        twibbon.onload = () => {
          context.drawImage(
            twibbon,
            0,
            0,
            twibbon.width,
            twibbon.height,
            0,
            0,
            exportSize,
            exportSize
          );
          resolve(this.canvas.toDataURL());
        };
      };
    });
  }

  captureSelect(e) {
    if (this.props.disabled) return;
    e.preventDefault();
    e.stopPropagation();
    this.setState({ dragging: true });
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
      y: this.originY + (e.screenY - this.startingY)
    });
  }

  captureRelease() {
    this.setState({ dragging: false });

    this.dragging = false;
  }

  changeZoom(dir) {
    this.setState({
      zoom: this.state.zoom + 0.25 * (dir ? 1 : -1)
    });
  }

  render() {
    const { image, overlayImage, editorSize, exportSize } = this.props;

    return (
      <div hidden={this.props.hidden}>
        <Container
          className={this.props.className}
          onMouseDown={e => this.captureSelect(e)}
          onMouseMove={e => this.captureOnMove(e)}
          onMouseUp={() => this.captureRelease()}
          onMouseLeave={() => this.captureRelease()}
          onWheel={e => {
            e.preventDefault();
            this.changeZoom(e.deltaY < 0);
          }}
          onTouchStart={e => this.onTouchStart(e)}
          onTouchMove={e => this.onTouchMove(e)}
          onTouchEnd={e => this.onTouchEnd(e)}
          size={editorSize}
        >
          {overlayImage && (
            <Overlay
              src={overlayImage}
              size={editorSize}
              transparent={this.state.dragging}
            />
          )}
          <PictureBox
            src={image}
            size={editorSize}
            translateX={this.state.x}
            translateY={this.state.y}
            zoom={this.state.zoom}
          />
        </Container>
        <canvas
          ref={elem => {
            // eslint-disable-next-line
            if (!!elem) {
              this.canvas = elem;
            }
          }}
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
  touch-action: none;
`;

const PictureBox = styled.img`
  z-index: 1;
  max-width: ${props => props.size}px;
  max-height: ${props => props.size}px;
  transform: translateX(${props => props.translateX}px)
    translateY(${props => props.translateY}px)
    scale(${props => (props.zoom + 10) / 10});
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
  opacity: ${props => (props.transparent ? "0.7" : "1")};
`;

export default PhotoEditor;
