import React, { useState } from 'react';

const ImageConverter = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [convertedUrl, setConvertedUrl] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setImageUrl(e.target.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const convertToBlackAndWhite = () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const image = new Image();

    image.src = imageUrl;

    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;

      context.drawImage(image, 0, 0);

      const imageData = context.getImageData(0, 0, image.width, image.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg; // red
        data[i + 1] = avg; // green
        data[i + 2] = avg; // blue
      }

      context.putImageData(imageData, 0, 0);
      setConvertedUrl(canvas.toDataURL());
    };
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={convertToBlackAndWhite}>Convert to Black and White</button>
      {imageUrl && <img src={imageUrl} alt="Original Image" />}
      {convertedUrl && <img src={convertedUrl} alt="Converted Image" />}
    </div>
  );
};

export default ImageConverter;
