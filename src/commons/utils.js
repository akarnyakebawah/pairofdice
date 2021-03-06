import loadImage from "blueimp-load-image";

function dataURItoBlob(dataURI) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  let byteString;
  if (dataURI.split(",")[0].indexOf("base64") >= 0) {
    byteString = atob(dataURI.split(",")[1]);
  } else {
    byteString = unescape(dataURI.split(",")[1]);
  }

  // separate out the mime component
  const mimeString = dataURI
    .split(",")[0]
    .split(":")[1]
    .split(";")[0];

  // write the bytes of the string to a typed array
  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  const blob = new Blob([ia], { type: mimeString });

  return blob;
}

export function getDataUrlExtension(dataUrl) {
  return dataUrl.substring("data:image/".length, dataUrl.indexOf(";base64"));
}

export function dataUrlToFile(dataUrl, name = "random.png") {
  const blob = dataURItoBlob(dataUrl);
  // const extension = getDataUrlExtension(dataUrl);
  // new File([blob]) is not supported in Safari
  // const file = new File([blob], `${name}.${extension}`, { type: `image/${extension}` });
  // file.type = `image/${extension}`;
  blob.name = name;
  return blob;
}

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function toDataURL(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.onload = () => {
    const reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result);
    };
    reader.readAsDataURL(xhr.response);
  };
  xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
  xhr.withCredentials = true;
  xhr.open("GET", url);
  xhr.responseType = "blob";
  xhr.send();
}

export async function fileToDataUrl(file, callback) {
  const reader = new FileReader();
  reader.onloadend = () => {
    callback(reader.result);
  };
  reader.readAsDataURL(file);
}

const defaultResizeImageOptions = {
  maxWidth: 1024,
  maxHeight: 1024,
  canvas: true,
  orientation: true,
  crossOrigin: "anonymous"
};

export async function resizeImage(file, callback, cropOptions = defaultResizeImageOptions) {
  loadImage(
    file,
    canvas => {
      const imageDataUrl = canvas.toDataURL();
      const imageFile = dataUrlToFile(imageDataUrl, file.name);
      callback({ imageDataUrl, imageFile });
    },
    cropOptions
  );
}
