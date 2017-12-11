function dataURItoBlob(dataURI) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  let byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0) {
    byteString = atob(dataURI.split(',')[1]);
  } else {
    byteString = unescape(dataURI.split(',')[1]);
  }

  // separate out the mime component
  const mimeString = dataURI
    .split(',')[0]
    .split(':')[1]
    .split(';')[0];

  // write the bytes of the string to a typed array
  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], { type: mimeString });
}

export function getDataUrlExtension(dataUrl) {
  return dataUrl.substring('data:image/'.length, dataUrl.indexOf(';base64'));
}

export function dataUrlToFile(dataUrl) {
  const blob = dataURItoBlob(dataUrl);
  const extension = getDataUrlExtension(dataUrl);
  const file = new File([blob], `randomName.${extension}`);
  return file;
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
  xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
  xhr.withCredentials = true;
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
}
