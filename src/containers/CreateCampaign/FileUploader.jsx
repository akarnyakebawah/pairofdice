import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import plus from '../../../static/assets/icon/plus.svg';

class FileUploader extends React.Component {
  static propTypes = {
    // Parent's state
    isImageLoaded: PropTypes.bool.isRequired,
    image: PropTypes.object.isRequired,
    imageDataUrl: PropTypes.string.isRequired,

    // Methods
    setState: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      isDragging: false,
    };
    this.onDragEnter = this.onDragEnter.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
  }

  // eslint-disable-next-line
  onDragOver(e) {
    e.preventDefault();
  }

  async onDragEnter(e) {
    await this.setState({ isDragging: true });
  }

  onDragLeave(e) {
    this.setState({ isDragging: false });
  }

  onDrop(e) {
    e.preventDefault();
    this.setState({ isDragging: false });
    this.onFileChange(e, e.dataTransfer.files[0]);
  }

  onFileChange(e, f) {
    const file = f || e.target.files[0];
    const pattern = /image-*/;
    const reader = new FileReader();

    if (!file.type.match(pattern)) {
      alert('Invalid files to be uploaded');
      return;
    }


    this.props.setState({ isImageLoaded: false });

    reader.onload = () => {
      console.log(file);
      this.props.setState({
        image: file,
        imageDataUrl: reader.result,
        isImageLoaded: true,
      });
    };
    reader.readAsDataURL(file);
  }

  getFileObject() {
    return this.file.files[0];
  }

  getFileString() {
    return this.props.image;
  }

  render() {
    const { isDragging } = this.state;
    const { isImageLoaded, imageDataUrl } = this.props;
    const labelClass = `${isDragging && 'hover'}`;
    if (isImageLoaded) {
      return <Image src={imageDataUrl} className={labelClass} alt="img" />;
    }
    return (
      <Label
        className={labelClass}
        onDragEnter={this.onDragEnter}
        onDragLeave={this.onDragLeave}
        onDragOver={this.onDragOver}
        onDrop={this.onDrop}
      >
        <Image src={plus} className={labelClass} alt="upload-icon" />
        <input
          type="file"
          accept="image/*"
          onChange={this.onFileChange}
          ref={(ref) => { this.file = ref; }}
        />
      </Label>
    );
  }
}

export default FileUploader;

const Label = styled.label`
  position: relative;
  input {
    display: none;
  }
  img {
    background-color: ${props => props.theme.color.grayTransparent(0.1)};
    border: 0.5rem ${props => props.theme.color.grayTransparent(0.5)} dashed;
    border-radius: 0.5rem;
    cursor: pointer;
    width: 10rem;
    margin: 1rem 0;
    object-fit: scale-down;
    padding: 1rem;
    &.hover {
      border: 0.5rem ${props => props.theme.color.grayTransparent(0.5)} solid;
    }
    .loaded {
      display: none;
    }
    @media screen and (max-width: ${props => props.theme.breakpoint.mobile}) {
      width: auto;
      max-width: 100%;
    }
  }
`;

const Image = styled.img`
  max-width: 100%;
`;
