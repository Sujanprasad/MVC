import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ImageGallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch image data from backend API
    axios.get('http://localhost:8000/api/upload')
      .then(response => {
        setImages(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the images!', error);
      });
  }, []);

  return (
    <div>
      <h2>Image Gallery</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {images.map((image, index) => (
          <div key={index} style={{ margin: '10px' }}>
            <h1>{image.name}</h1>
            <img src={image.image} alt="Uploaded" style={{ width: '200px', height: '200px' }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
