import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Ionicons from 'react-ionicons'
import plus from '../../../static/assets/icon/plus.svg';
import PhotoEditor from '../../components/PhotoEditor';

class FileUploader extends React.Component {
  static propTypes = {
    // Parent's state
    isImageLoaded: PropTypes.bool.isRequired,
    image: PropTypes.string.isRequired,

    // Methods
    setState: PropTypes.func.isRequired
  };

  state = {
    isDragging: false,
    imageSize: 0,
    editorSize: 300,
  };

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
      this.props.setState({
        image: reader.result,
        isImageLoaded: true
      });

      const image = new Image();
      image.onload = () => {
        this.setState({
          imageSize: Math.min(image.width, image.height),
          editorSize: Math.min(Math.min(image.width, image.height), this.state.editorSize),
        });
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  }

  render() {
    const { isDragging } = this.state;
    const { isImageLoaded, image } = this.props;
    const labelClass = `${(isDragging && 'hover') || null}`;
    if (isImageLoaded) {
      return <div>
          <BorderedPhotoEditor image={image} editorSize={this.state.editorSize} exportSize={this.state.imageSize} innerRef={elem => {
              this.editor = elem;
            }} />
          <Ionicons icon="ion-edit" fontSize="1rem" color="white" />
          <Button secondary onClick={() => this.props.setState({
                isImageLoaded: false
              })}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              console.log('click')
              this.editor
                .getImage()
                .then(image => {
                  this.props.setState({ image });
                  console.log(image);
                });
            }
            }
          >
            Fix
          </Button>
        </div>;
    }
    return (
      <Label
        className={labelClass}
        onDragEnter={e => this.onDragEnter(e)}
        onDragLeave={e => this.onDragLeave(e)}
        onDragOver={e => this.onDragOver(e)}
        onDrop={e => this.onDrop(e)}
      >
        <img src={plus} className={labelClass} alt="upload-icon" />
        <input
          type="file"
          accept="image/*"
          onChange={(e, f) => this.onFileChange(e, f)}
          ref={ref => {
            this.file = ref;
          }}
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

const BorderedPhotoEditor = styled(PhotoEditor)`
  border: 0.5rem ${props => props.theme.color.grayTransparent(0.5)} dashed;
  border-radius: 0.5rem;
`;

const Button = styled.button`

`;